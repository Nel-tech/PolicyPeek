import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import axios from 'axios';
import { prisma } from '@/lib/prisma'; 


const API_URL = process.env.NEXT_PUBLIC_API_URL;


interface TextSummaryRequest {
  text: string;
}



export async function POST(request: NextRequest) {
  console.log('🚀 API Route called');
  
  try {
    // Get session from server-side with better error handling
    const session = await getServerSession(authOptions);
    console.log('Session check:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      userEmail: session?.user?.email,
      userId: (session?.user as any)?.id
    });
    
    if (!session || !session.user) {
      console.log('❌ No valid session found');
      return NextResponse.json(
        { 
          error: "Authentication required",
          details: "Please sign in to use this feature"
        }, 
        { status: 401 }
      );
    }

    // Get userId from session with fallbacks
    const userId = (session.user as any)?.id || session.user?.email;
    
    if (!userId) {
      console.log('❌ No userId in session', { user: session.user });
      return NextResponse.json(
        { 
          error: "User identification failed",
          details: "User ID not found in session" 
        }, 
        { status: 401 }
      );
    }

    console.log('👤 User authenticated:', userId);

    // Parse request body with error handling
    let requestBody;
    try {
      requestBody = await request.json();
    } catch (parseError) {
      console.error('❌ Invalid JSON in request body:', parseError);
      return NextResponse.json(
        { error: "Invalid request format" }, 
        { status: 400 }
      );
    }

    const { text }: TextSummaryRequest = requestBody;
    console.log('📋 Request received:', { 
      textLength: text?.length || 0, 
      userId,
      hasText: !!text 
    });

    // Validate inputs
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Valid text content is required" }, 
        { status: 400 }
      );
    }

    // Check environment variable
    if (!API_URL) {
      console.error('❌ API_URL not configured');
      return NextResponse.json(
        { error: "External API configuration missing" }, 
        { status: 500 }
      );
    }

    console.log('🌐 Calling external API...');
    
    // Add timeout and better error handling for external API call
    const response = await axios.post(`${API_URL}/analyze`, { text }, {
      headers: {
        "Content-Type": "application/json"
      },
    });

    console.log('✅ External API response received:', {
      status: response.status,
      hasData: !!response.data
    });

    const {summary, flags, stats } = response.data;
    
    // Validate external API response
    if (!summary) {
      console.error('❌ Invalid response from external API - missing summary');
      return NextResponse.json(
        { error: "Invalid response from analysis service" }, 
        { status: 502 }
      );
    }
    
    console.log('💾 Saving to database...');
    
    // Save to database with error handling
    const saved = await prisma.summary.create({
      data: {
        userId: String(userId), 
        summary,
        original_text: text,
        flags: flags || [],
      },
    });

    // Calculate stats
    const wordCount = text.trim().split(/\s+/).length;
    const frontendResponse = {
      summary: saved.summary,
      flags: saved.flags,
      stats: {
        word_count: wordCount,
        character_count: text.length,
        
      }
    };

    console.log('🎉 Success! Summary saved with ID:', saved.id);
    return NextResponse.json(frontendResponse);
    
  } catch (error: any) {
    console.error("💥 API Route Error:", error);
    
    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      console.error("External API Error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url
      });
      
      if (error.code === 'ECONNREFUSED') {
        return NextResponse.json(
          { error: "External analysis service is unavailable" },
          { status: 503 }
        );
      }
      
      if (error.response?.status === 400) {
        return NextResponse.json(
          { error: "Invalid text provided for analysis" },
          { status: 400 }
        );
      }
      
    }
    
    // Handle Prisma/Database errors
    if (error.name === 'PrismaClientKnownRequestError') {
      console.error("Database Error:", error.message);
      return NextResponse.json(
        { error: "Failed to save analysis results" },
        { status: 500 }
      );
    }
    
    // Generic error response
    return NextResponse.json(
      { 
        error: "Failed to process text summary",
        details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}
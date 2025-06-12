import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import axios from 'axios';
import { prisma } from '@/lib/prisma'; 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface TextSummaryRequest {
  text: string;
}

// Updated interfaces to match the new API response
interface RiskInfo {
  type: string;
  severity: string;
  context: string;
  matched_text: string;
}

interface RisksData {
  high: RiskInfo[];
  medium: RiskInfo[];
  low: RiskInfo[];
  total_count: number;
}

interface RiskScore {
  score: number;
  percentage: number;
  level: string;
}

interface ExternalAPIResponse {
  summary: string;
  risks: RisksData;
  risk_score: RiskScore;
  flags: string[];
  stats?: {
    word_count: number;
    character_count: number;
    estimated_reading_time: number;
    summary_reduction: number;
  };
  processing_time: number;
  language_detected?: string;
}

export async function POST(request: NextRequest) {
  
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
      timeout: 30000, // 30 second timeout
    });

    console.log('✅ External API response received:', {
      status: response.status,
      hasData: !!response.data,
      riskCount: response.data?.risks?.total_count || 0,
      riskLevel: response.data?.risk_score?.level || 'UNKNOWN'
    });

    const analysisData: ExternalAPIResponse = response.data;
    
    // Validate external API response
    if (!analysisData.summary) {
      console.error('❌ Invalid response from external API - missing summary');
      return NextResponse.json(
        { error: "Invalid response from analysis service" }, 
        { status: 502 }
      );
    }
    
    console.log('💾 Saving to database...');
    
    // Save to database with enhanced data
    const saved = await prisma.summary.create({
      data: {
        userId: String(userId), 
        summary: analysisData.summary,
        original_text: text,
        flags: analysisData.flags || [],
        
      },
    });

    // Build comprehensive frontend response
    const frontendResponse = {
      summary: saved.summary,
      flags: saved.flags,
      risks: analysisData.risks,
      risk_score: analysisData.risk_score,
      stats: {
        word_count: analysisData.stats?.word_count || text.trim().split(/\s+/).length,
        character_count: analysisData.stats?.character_count || text.length,
        estimated_reading_time: analysisData.stats?.estimated_reading_time || Math.ceil(text.trim().split(/\s+/).length / 200),
        summary_reduction: analysisData.stats?.summary_reduction || 0
      },
      processing_time: analysisData.processing_time,
      language_detected: analysisData.language_detected
    };

   
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
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
        return NextResponse.json(
          { error: "External analysis service is unavailable" },
          { status: 503 }
        );
      }
      
      if (error.code === 'ECONNABORTED') {
        return NextResponse.json(
          { error: "Analysis request timed out - text may be too long" },
          { status: 408 }
        );
      }
      
      if (error.response?.status === 400) {
        return NextResponse.json(
          { error: error.response.data?.detail || "Invalid text provided for analysis" },
          { status: 400 }
        );
      }
      
      if (error.response?.status === 422) {
        return NextResponse.json(
          { error: error.response.data?.detail || "Text validation failed" },
          { status: 422 }
        );
      }
      
      if (error.response?.status === 503) {
        return NextResponse.json(
          { error: "Analysis service is temporarily unavailable" },
          { status: 503 }
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


export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    console.log('Session check:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      userEmail: session?.user?.email,
      userId: (session?.user as any)?.id
    })

    if (!session || !session.user) {
      console.log('❌ No valid session found')
      return NextResponse.json(
        {
          error: "Authentication required",
          details: "Please sign in to use this feature"
        },
        { status: 401 }
      )
    }

    const userId = (session.user as any)?.id

    if (!userId) {
      return NextResponse.json(
        { error: "User ID missing in session" },
        { status: 400 }
      )
    }

    const summaries = await prisma.summary.findMany({
      where: { userId }
    })

    return NextResponse.json(summaries)

  } catch (error) {
    console.error('Error fetching summaries:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
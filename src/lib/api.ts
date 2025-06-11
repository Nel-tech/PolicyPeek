// lib/api.ts
import axios from 'axios';


export interface TextSummaryRequest {
  text: string;
}

interface   UserData{
  name:string;
  email:string
}



export interface AnalysisResponse {
  summary: string;
  flags: string[];
  stats: {
    word_count: number;
    character_count: number;
  };
}

export async function getTextSummary({ text }: TextSummaryRequest): Promise<AnalysisResponse> {
  try {
    console.log('📤 Sending request to /api/model');
    
    const response = await axios.post('/api/model', { text }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Response received from /api/model');
    return response.data;
    
  } catch (error) {
    console.error('❌ API call failed:', error);
    
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || error.message);
    }
    throw error;
  }
}


export const updateUser = async (userData: UserData) => {
  try {
    const response = await axios.put('/api/auth/me', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
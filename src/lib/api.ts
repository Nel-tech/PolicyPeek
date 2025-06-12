// lib/api.ts
import axios from 'axios';


export interface TextSummaryRequest {
  text: string;
}

export interface RequestToken {
email:string
}

export interface ResetPasswordRequest{
  resetToken:string; 
  newPassword:string;
}

interface   UserData{
  name:string;
  email:string
}

export interface RiskInfo {
  type: string;
  severity: string;
  context: string;
  matched_text: string;
}

export interface RisksData {
  high: RiskInfo[];
  medium: RiskInfo[];
  low: RiskInfo[];
  total_count: number;
}

export interface RiskScore {
  score: number;
  percentage: number;
  level: string;
}

export interface AnalysisResponse {
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

export const getUserSummary = async () => {
  try {
    const response = await axios.get('/api/model', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting user summary:", error);
    throw error;
  }
}

export const handleRequest = async (data: RequestToken) => {
  try {
    const response = await axios.post('/api/auth/request-password-reset', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending user request:", error);
    throw error;
  }
};

export const handlePasswordReset = async (userData: ResetPasswordRequest) => {
  try {
    const response = await axios.post('/api/auth/reset-password', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting user password:", error);
    throw error;
  }
};
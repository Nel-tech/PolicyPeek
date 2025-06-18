import axios from 'axios';
const NEXT_PUBLIC_AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:2000'
const NEXT_PUBLIC_MODEL_API_URL = process.env.NEXT_PUBLIC_MODEL_API_URL || 'http://127.0.0.1:8000';



const api = axios.create({
  baseURL: NEXT_PUBLIC_AUTH_API_URL,
  withCredentials: true, 
});

interface signup{
    name:string;
    email:string;
    password:string;
}

interface login {
     email:string;
    password:string;
} 
interface UpdatedUser {
  name: string;
  email: string;
}

interface UpdateUserParams {
  userId: string;
  data: UpdatedUser;
}

export interface RequestToken {
email:string
}

export interface ResetPasswordRequest{
  resetToken:string; 
  newPassword:string;
}

export interface TextSummaryRequest {
  text: string;
}

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
  originalText: string
  userId: string;
}

export const signup = async (data:signup) => {
  const response = await api.post('/api/auth/register', data);
  return response.data;
};

export const login = async (data: login) => {
  const response = await api.post(`/api/auth/login`, data);
  return response.data;
};

export const updateUser = async ({ userId, data }: UpdateUserParams) => {
  const response = await api.put(`/api/auth/user/update/${userId}`, data)    
    return response.data;
  };

export const verifyToken = async() => {
const response = await api.get(`/api/auth/verify-token`)
return response.data
}


export async function AnalyzeText(text: TextSummaryRequest): Promise<AnalysisResponse> {
  try {
   
    
    // Send the text string directly, not wrapped in another object
    const response = await axios.post(`${NEXT_PUBLIC_MODEL_API_URL}/analyze`, text, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials:true
    });

    console.log('📝 Payload being received:', response.data);
    return response.data;
    
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
      
      // Log the full error response for debugging
      if (error.response?.data) {
        console.error("🔍 Detailed error response:", error.response.data);
      }
      
      // Re-throw with more context
      throw new Error(`API Error: ${error.response?.status} - ${error.response?.statusText || error.message}`);
    }
    
    // Handle non-Axios errors
    throw new Error(`Unexpected error: ${error.message}`);
  }
}

export async function SaveAnalysis(analysisData: AnalysisResponse) {
try {
    console.log('💾 Saving analysis to database...');
    
    const response = await api.post(`/model/analysis/save`, analysisData, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    console.log('✅ Analysis saved successfully:', response.data);
    return response.data;
    
  } catch (error: any) {
    console.error("💥 Save Analysis Error:", error);
    
    if (axios.isAxiosError(error)) {
      console.error("Database API Error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url
      });
      
      throw new Error(`Save Error: ${error.response?.status} - ${error.response?.statusText || error.message}`);
    }
    
    throw new Error(`Unexpected save error: ${error.message}`);
  }
}
  

export const getUserAnalysis = async () => {
  try {
    const response = await api.get('/model/get-user-analysis', {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error:any) {
    if (error.response?.status === 401) {
      const authError = new Error('UNAUTHORIZED');
      authError.cause = 401;
      throw authError;
    }
    console.error('Get User Analysis Error:', error);
    throw error;
  }
};


export const DeleteUserAnalysis = async(id:string) => {
  try{
  const response = await api.delete(`/model/delete-analysis/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, 
    })
    return response.data
  } catch (error) {
    console.error(" Deleting User Analysis Error:", error);
    throw error;
  }
  }

export const handleRequest = async (data: RequestToken) => {
  try {
    const response = await axios.post(`${NEXT_PUBLIC_AUTH_API_URL}/api/auth/send-reset-token`, data, {
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
    const response = await axios.post(`${NEXT_PUBLIC_AUTH_API_URL}/api/auth/reset-password`, userData, {
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



// hooks/useModel.ts
'use client'
import { useMutation } from "@tanstack/react-query";
import { getTextSummary, type TextSummaryRequest, type AnalysisResponse } from "@/lib/api";
import { toast } from "sonner";
import axios, { AxiosError } from 'axios';

export const useModel = () => useMutation<AnalysisResponse, Error, TextSummaryRequest>({
  mutationFn: getTextSummary,

  onSuccess: (data) => {
    toast.success('Analysis completed!');
    console.log('✅ Mutation completed successfully:', data);
  },

  onError: (error: unknown) => {
    console.error('❌ Mutation failed:', error);
    
    let errorMessage = 'Something went wrong. Please try again.';

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error?: string }>;
      errorMessage = axiosError.response?.data?.error || axiosError.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(errorMessage);
  }
});
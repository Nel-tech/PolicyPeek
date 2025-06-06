'use client'
import { useMutation } from "@tanstack/react-query";
import { getTextSummary } from "@/app/api/model/route";
import { toast } from "sonner";
import axios, { AxiosError } from 'axios'

export const useModel = () => useMutation({
  mutationFn: getTextSummary,

  onSuccess: (data) => {
    toast.success('Analysis completed!');
    console.log('Mutation completed successfully:', data);
  },

  onError: (error: unknown) => {
    let errorMessage = 'Something went wrong. Please try again.';

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      errorMessage = axiosError.response?.data?.message || axiosError.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(errorMessage);
  }
});

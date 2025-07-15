'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {  TabsContent } from "@/components/ui/tabs";
import { AlertTriangle, FileText, Save, CheckCircle } from "lucide-react";
import AnalyzeLoader from '@/components/AnalyzeLoader'
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useModel, useSaveAnalysis } from "@/hooks/use-model";
import { RiskScore, RisksData } from "@/types/types";

function NewAnalysis() {
    const [termsText, setTermsText] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [save, setSaveAnalysis] = useState()
    const [isSaving, setIsSaving] = useState(false)
    const { mutateAsync } = useModel()

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const SaveAnlaysis = useSaveAnalysis()
     const [analysis, setAnalysis] = useState<{
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
    } | null>(null);

    useEffect(() => {
        if (analysis) {
        }
    }, [analysis])

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!termsText.trim()) {
            toast.info("Please paste some terms and conditions to analyze");
            return;
        }
        if (!isAuthenticated) {
            toast.error("You must be logged in to analyze terms");
            return;
        }

        try {
            setIsAnalyzing(true);
            const data = await mutateAsync({ text: termsText });

            const completeAnalysis = {
                ...data,
                originalText: termsText,
            };

            setAnalysis(completeAnalysis);

        } catch (err) {
            console.error("Analysis failed", err);
            toast.error("Analysis failed. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleClear = () => {
        setTermsText("");
        setAnalysis(null);
    };
    const handleSave = () => {
        if (!analysis) {
            toast.error("No analysis data to save");
            return;
        }

        setIsSaving(true);

        SaveAnlaysis.mutate(analysis, {
            onSuccess: (data) => {
                toast.success("Your analysis has been saved successfully");
                setSaveAnalysis(data);
                setIsSaving(false);
            },
            onError: (err) => {
                console.error(" Save Analysis failed", err);
                toast.error("Failed to save analysis");
                setIsSaving(false);
            },
        });
    };
  return (
    <div>
          {/* New Analysis Tab */}
          <TabsContent value="new-analysis" className="space-y-4">
              {/* Input Section */}
              <Card className=" overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
                  <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex font-montserrat items-center gap-2 text-gray-800 dark:text-gray-100">
                          <FileText className="w-5 h-5 text-blue-600" />
                          Policy Text
                      </CardTitle>
                      <CardDescription className=" font-montserrat text-gray-600 dark:text-gray-400">
                          Paste the policy document you want to analyze below
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="relative">
                          <Textarea
                              placeholder="Paste your Terms & Conditions or Privacy Policy here..."
                              value={termsText}
                              onChange={(e) => setTermsText(e.target.value)}
                              disabled={isAnalyzing}
                              className="font-sans min-h-[120px] resize-none border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                          {isAnalyzing && (
                              <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center rounded-md z-10">
                                  <div className="flex flex-col items-center gap-3 p-4">
                                      <AnalyzeLoader />
                                      <div className="text-center">
                                          <span className="text-sm text-gray-600 dark:text-gray-400 font-montserrat font-medium">
                                              Analyzing your document...
                                          </span>
                                          <p className="text-xs text-gray-500 dark:text-gray-500 font-sans mt-1">
                                              This may take a few moments
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          )}
                      </div>
                      <div className="flex gap-2">
                          <Button
                              onClick={handleAnalyze}
                              disabled={isAnalyzing}
                              className="font-sans flex-1 bg-blue-600 hover:bg-blue-700 text-white h-10 cursor-pointer"
                          >
                              Analyze Terms
                          </Button>
                          <Button
                              onClick={handleClear}
                              variant="outline"
                              className="font-sans px-4 h-10 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >

                          </Button>
                      </div>
                  </CardContent>
              </Card>

              {/* Results Section */}
              {analysis && (
                  <div className="space-y-4">
                      {/* Summary */}
                      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
                          <CardHeader className="pb-3">
                              <CardTitle className="text-lg font-montserrat flex items-center gap-2 text-gray-800 dark:text-gray-100">
                                  <CheckCircle className=" w-5 h-5 text-green-600" />
                                  Summary
                              </CardTitle>
                          </CardHeader>
                          <CardContent>
                              <p className="font-sans text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{analysis.summary}</p>
                          </CardContent>
                      </Card>

                      {/* Sensitive Phrases */}
                      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
                          <CardHeader className="pb-3">
                              <CardTitle className="text-lg font-montserrat flex items-center gap-2 text-gray-800 dark:text-gray-100">
                                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                                  Risk Flags
                              </CardTitle>
                              <CardDescription className="text-gray-600 font-sans dark:text-gray-400">
                                  Detected {analysis?.flags?.length || 0} potential concerns
                              </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                              {analysis?.flags?.length > 0 ? (
                                  analysis.flags.map((flag, index) => (
                                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                          <div className="flex items-start gap-3">
                                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                              <div className="flex-1 space-y-2">
                                                  <div className="flex items-center gap-2">
                                                      <span className="text-sm text-gray-800 dark:text-gray-200 font-sans">{flag}</span>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  ))
                              ) : (
                                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4 font-sans">No concerning phrases detected</p>
                              )}
                          </CardContent>
                      </Card>

                      {/* Actions */}
                      <div className="flex gap-2">
                          <Button
                              onClick={handleSave}
                              variant="outline"
                              className="flex-1 border-gray-200 dark:border-gray-700 font-sans hover:bg-gray-50 dark:hover:bg-gray-800 h-10"
                          >
                              <Save className="w-4 h-4 mr-2 font-sans" />
                              {isSaving ? "Saving...." : "Save Analysis"}
                          </Button>
                      </div>
                  </div>
              )}
          </TabsContent> 
    </div>
  )
}

export default NewAnalysis
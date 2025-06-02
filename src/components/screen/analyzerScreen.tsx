'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, FileText, Save, RotateCcw, Shield, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export const AnalyzerScreen = () => {
    const [termsText, setTermsText] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<{
        summary: string;
        riskyPhrases: Array<{ phrase: string; explanation: string; severity: 'high' | 'medium' | 'low' }>;
    } | null>(null);
  

    const handleAnalyze = async () => {
        if (!termsText.trim()) {
            toast.info( "Please paste some terms and conditions to analyze");
            return;
        }

        setIsAnalyzing(true);

        // Simulate analysis
        setTimeout(() => {
            setAnalysis({
                summary: "This terms of service agreement outlines user responsibilities, data collection practices, and service limitations. The company reserves broad rights to modify terms and terminate accounts. Users grant extensive content licensing rights and waive certain legal protections.",
                riskyPhrases: [
                    {
                        phrase: "unlimited license to use your content",
                        explanation: "You're giving the company very broad rights to use anything you post",
                        severity: 'high'
                    },
                    {
                        phrase: "may terminate your account at any time",
                        explanation: "The company can delete your account without warning",
                        severity: 'high'
                    },
                    {
                        phrase: "collect and share personal information",
                        explanation: "Your personal data may be shared with third parties",
                        severity: 'medium'
                    },
                    {
                        phrase: "changes effective immediately",
                        explanation: "Terms can be updated without notice period",
                        severity: 'medium'
                    },
                    {
                        phrase: "as-is without warranties",
                        explanation: "The service comes with no guarantees if something goes wrong",
                        severity: 'low'
                    }
                ]
            });
            setIsAnalyzing(false);
        }, 2000);
    };

    const handleClear = () => {
        setTermsText("");
        setAnalysis(null);
    };

    const handleSave = () => {
        toast.success("Your analysis has been saved successfully")
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-full mb-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-1">Terms & Conditions Analyzer</h1>
                <p className="text-sm text-gray-500">Summarize and analyze terms instantly</p>
            </div>

            {/* Input Section */}
            <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Input Terms
                    </CardTitle>
                    <CardDescription>
                        Paste the terms and conditions you want to analyze below
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        placeholder="Paste your terms and conditions here..."
                        value={termsText}
                        onChange={(e) => setTermsText(e.target.value)}
                        className="min-h-[120px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                        <Button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-10"
                        >
                            {isAnalyzing ? "Analyzing..." : "Analyze Terms"}
                        </Button>
                        <Button
                            onClick={handleClear}
                            variant="outline"
                            className="px-4 h-10 border-gray-200 hover:bg-gray-50"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Results Section */}
            {analysis && (
                <div className="space-y-4">
                    {/* Summary */}
                    <Card className="border border-gray-200">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-700 leading-relaxed">{analysis.summary}</p>
                        </CardContent>
                    </Card>

                    {/* Sensitive Phrases */}
                    <Card className="border border-gray-200">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-600" />
                                Sensitive Phrases
                            </CardTitle>
                            <CardDescription>
                                Detected {analysis.riskyPhrases.length} potentially concerning phrases
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {analysis.riskyPhrases.map((item, index) => (
                                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <code className="text-sm font-mono bg-white px-2 py-1 rounded border text-gray-800">
                                                    "{item.phrase}"
                                                </code>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs ${getSeverityColor(item.severity)}`}
                                                >
                                                    {item.severity}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-gray-600">{item.explanation}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex gap-2">
                        <Button
                            onClick={handleSave}
                            variant="outline"
                            className="flex-1 border-gray-200 hover:bg-gray-50 h-10"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Analysis
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

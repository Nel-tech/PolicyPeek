'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, FileText, Save, RotateCcw, CheckCircle, FolderOpen, Settings, LogOut, User, Mail, Lock } from "lucide-react";
import { useModel, useGetAnalysis, useSaveAnalysis, useDeleteAnalysis } from "@/hooks/use-model";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { useUpdateProfileMutation } from "@/hooks/use-auth";
import { summaryTypes } from "@/types/types";
// import UserSkeleton from "@/components/loader";
// import ErrorMessage from "@/components/error"
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Footer from "../footer";



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



const AnalyzerScreen = () => {
    const [termsText, setTermsText] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [save, setSaveAnalysis] = useState()
    const [isSaving, setIsSaving] = useState(false)
    const { mutateAsync } = useModel()

     const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
     const user = useCurrentUser()
    const updateProfile = useUpdateProfileMutation();
    const SaveAnlaysis = useSaveAnalysis()
    const { data: UserSummary } = useGetAnalysis()
    const DeleteUserAnalysis = useDeleteAnalysis()
    const logout = useAuthStore((state) => state.logout)
    const router = useRouter();

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


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.info('Name is required');
            return;
        }

        if (!Email.trim()) {
            toast.info('Email is required');
            return;
        }

        if (!user) {
            toast.error('You must be logged in to update your profile.');
            return;
        }

        const updateData = {
            userId: user.id,
            data: {
                name: name.trim(),
                email: Email.trim(),
            },

        };

        updateProfile.mutate(updateData);
    };

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

    const handleDelete = (id: string) => {
        DeleteUserAnalysis.mutate(id)
    }
    const handleLogOut = () => {
        logout()
        router.push('/auth/login');
    }
    const getFlagSeverity = (flag: string): 'high' | 'medium' | 'low' => {
        const lowerFlag = flag.toLowerCase();
        if (lowerFlag.includes('biometric') || lowerFlag.includes('sell') || lowerFlag.includes('without notice')) {
            return 'high';
        } else if (lowerFlag.includes('third-party') || lowerFlag.includes('collects')) {
            return 'medium';
        }
        return 'low';
    };





    return (

        <>
        
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <div className="w-full max-w-4xl">
                <div className="space-y-6 max-h-[80vh] overflow-y-auto">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center mb-3">
                            <Logo />
                        </div>
                        <p className="text-sm text-gray-500">Summarize and analyze terms instantly</p>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="new-analysis" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="new-analysis" className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                New Analysis
                            </TabsTrigger>
                            <TabsTrigger value="saved" className="flex items-center gap-2">
                                <FolderOpen className="w-4 h-4" />
                                My Saved
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="flex items-center gap-2">
                                <Settings className="w-4 h-4" />
                                Settings
                            </TabsTrigger>
                        </TabsList>

                        {/* New Analysis Tab */}
                        <TabsContent value="new-analysis" className="space-y-4">
                            {/* Input Section */}
                            <Card className="border border-gray-200 shadow-sm">
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
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-10 cursor-pointer"
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
                                    <Card className="border border-gray-200 shadow-sm">
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
                                    <Card className="border border-gray-200 shadow-sm">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <AlertTriangle className="w-5 h-5 text-amber-600" />
                                                Risk Flags
                                            </CardTitle>
                                            <CardDescription>
                                                Detected {analysis?.flags?.length || 0} potential concerns
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {analysis?.flags?.length > 0 ? (
                                                analysis.flags.map((flag, index) => {
                                                    const severity = getFlagSeverity(flag);
                                                    return (
                                                        <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                            <div className="flex items-start gap-3">
                                                                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                                                <div className="flex-1 space-y-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-sm text-gray-800">{flag}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-sm text-gray-500 text-center py-4">No concerning phrases detected</p>
                                            )}
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
                                            {isSaving ? "Saving...." : "Save Analysis"}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </TabsContent>

                        {/* Saved Analyses Tab */}
                        <TabsContent value="saved">
                            <Card className="border border-gray-200 shadow-sm bg-white">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-gray-800">
                                        <FolderOpen className="w-5 h-5 text-blue-600" />
                                        My Saved Analyses
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        View and manage your previously saved analyses
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {UserSummary?.length === 0 ? (
                                        <div className="text-center py-8">
                                            <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <p className="text-gray-500">No saved analyses yet</p>
                                            <p className="text-sm text-gray-400">Your saved analyses will appear here</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <section>
                                                {UserSummary?.data?.map((summary: summaryTypes) => {
                                                    return (
                                                        <div key={summary.id} className="space-y-4 mb-6 relative p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                                                            <p className="text-sm text-gray-700 text-justify">{summary?.summary}</p>

                                                            {summary?.flags.length > 0 ? (
                                                                summary?.flags.map((flag, index) => {
                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className="p-3 bg-gray-50 rounded-lg border border-gray-100"
                                                                        >
                                                                            <div className="flex items-start gap-3">
                                                                                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                                                                <div className="flex-1 space-y-2">
                                                                                    <div className="flex items-center gap-2">
                                                                                        <span className="text-sm text-gray-800">{flag}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })
                                                            ) : (
                                                                <p className="text-sm text-gray-500 text-center py-4">
                                                                    No concerning phrases detected
                                                                </p>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </section>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Settings Tab */}
                        <TabsContent value="settings">
                            <div className="space-y-6">
                                {/* Account Information */}
                                <form onSubmit={handleUpdateProfile}>
                                    <Card className="border border-gray-200 shadow-sm bg-white">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-gray-800">
                                                <User className="w-5 h-5 text-blue-600" />
                                                Account Information
                                            </CardTitle>
                                            <CardDescription className="text-gray-600">
                                                Update your personal information
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="account-name" className="text-sm font-medium text-gray-700">Full Name</Label>
                                                <Input
                                                    id="account-name"
                                                    type="text"
                                                    defaultValue={user?.name}
                                                    onChange={handleNameChange}
                                                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="account-email" className="text-sm font-medium text-gray-700">Email Address</Label>
                                                <Input
                                                    id="account-email"
                                                    type="email"
                                                    defaultValue={user?.email}
                                                    onChange={handleEmailChange}
                                                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>

                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                                                Update Account
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </form>

                                {/* Logout */}
                                <Card className="border border-gray-200 shadow-sm bg-white">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-gray-800">
                                            <LogOut className="w-5 h-5 text-red-600" />
                                            Account Actions
                                        </CardTitle>
                                        <CardDescription className="text-gray-600">
                                            Sign out of your account
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button
                                            onClick={handleLogOut}
                                            variant="outline"
                                            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>

        <footer>
            <Footer/>
        </footer>
        </>
    );
};

export default AnalyzerScreen
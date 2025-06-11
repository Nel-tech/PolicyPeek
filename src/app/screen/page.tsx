'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, FileText, Save, RotateCcw, CheckCircle, FolderOpen, Settings, LogOut, User, Mail, Lock } from "lucide-react";
import { useModel } from "@/hooks/use-model";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { useMe, useUpdateProfileMutation } from "@/hooks/use-me";

const AnalyzerScreen = () => {
    const [termsText, setTermsText] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<{
        summary: string;
        flags: string[];
        stats?: {
            word_count: number;
            character_count: number;
        };
    } | null>(null);

    // Account settings state
    const [name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { mutateAsync } = useModel()
    const updateProfile = useUpdateProfileMutation();
    const { data: userData, isLoading, error } = useMe();
    
    useEffect(() => {
        if (userData) {
            setName(userData.name || "");
            setEmail(userData.email || "");
        }
    }, [userData]);


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleUpdateProfile = async (e:React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.info('Name is required');
            return;
        }

        if (!Email.trim()) {
            toast.info('Email is required');
            return;
        }
      
        const updateData = {
            name: name.trim(),
            email: Email.trim(),
        };
        updateProfile.mutate(updateData); 
    };

    if (isLoading) {
        return <div>Loading user data...</div>;
    }

    // Error state
    if (error) {
        return <div>Error loading user data: {error.message}</div>;
    }

   

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!termsText.trim()) {
            toast.info("Please paste some terms and conditions to analyze");
            return;
        }
        try {
            setIsAnalyzing(true)
            const data = await mutateAsync({ text: termsText });
            setAnalysis(data);
            console.log('Analysis receobed', data)
        } catch (err) {
            console.error("Analysis failed", err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleClear = () => {
        setTermsText("");
        setAnalysis(null);
    };

    const handleSave = () => {
        toast.success("Your analysis has been saved successfully")
    };
    const handleLogOut = () => {

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


    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const handleUpdateAccount = () => {
        toast.success("Your account information has been updated successfully.")
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirmation do not match.");
            return;
        }

        toast.success("Your password has been updated successfully.");

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    


    return (
        <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center  mb-3">
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
                                                                <Badge
                                                                    variant="outline"
                                                                    className={`text-xs ${getSeverityColor(severity)}`}
                                                                >
                                                                    {severity}
                                                                </Badge>
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
                                    Save Analysis
                                </Button>
                            </div>
                        </div>

                    )}
                </TabsContent>

                {/* Saved Analyses Tab */}
                <TabsContent value="saved">
                    <Card className="border border-slate-200 bg-white/70 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-slate-800">
                                <FolderOpen className="w-5 h-5 text-blue-600" />
                                My Saved Analyses
                            </CardTitle>
                            <CardDescription className="text-slate-600">
                                View and manage your previously saved analyses
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8">
                                <FolderOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                <p className="text-slate-500">No saved analyses yet</p>
                                <p className="text-sm text-slate-400">Your saved analyses will appear here</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings">
                    <div className="space-y-6">
                        {/* Account Information */}
                        <form onSubmit={handleUpdateProfile}>
                        <Card className="border border-slate-200 bg-white/70 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-slate-800">
                                    <User className="w-5 h-5 text-blue-600" />
                                    Account Information
                                </CardTitle>
                                <CardDescription className="text-slate-600">
                                    Update your personal information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="account-name" className="text-sm font-medium text-slate-700">Full Name</Label>
                                    <Input
                                        id="account-name"
                                        type="text"
                                        defaultValue={name}
                                        onChange={handleNameChange}
                                        className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="account-email" className="text-sm font-medium text-slate-700">Email Address</Label>
                                    <Input
                                        id="account-email"
                                        type="email"
                                        defaultValue={Email}
                                        onChange={handleEmailChange}
                                        className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <Button
                                    onClick={handleUpdateAccount}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Update Account
                                </Button>
                            </CardContent>
                        </Card>
                        </form>

                       
                        {/* Logout */}
                        <Card className="border border-slate-200 bg-white/70 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-slate-800">
                                    <LogOut className="w-5 h-5 text-red-600" />
                                    Account Actions
                                </CardTitle>
                                <CardDescription className="text-slate-600">
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
    );
};

export default AnalyzerScreen
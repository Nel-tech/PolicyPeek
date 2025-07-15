'use client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {  FileText, FolderOpen, Settings } from "lucide-react";
import Footer from "../footer";
import Nav from "../Nav";
import NewAnalysis from "./NewAnalysis";
import Saved from "./Saved";
import SettingsPage from "./Settings";




const AnalyzerScreen = () => {
    return (

        <>
            <header>
                <Nav logo="/images/Logo.png" authText="" signupText="" loginText="" />
            </header>

            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950 transition-colors">
                <div className="w-full max-w-4xl">
                    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
                        {/* Header */}
                        <div className="text-center">
                           
                            <p className="text-lg font-sans text-gray-500  dark:text-gray-400">Summarize and analyze terms instantly</p>
                        </div>

                        <Tabs defaultValue="new-analysis" className="space-y-4">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="new-analysis" className="font-montserrat flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    New Analysis
                                </TabsTrigger>
                                <TabsTrigger value="saved" className="font-montserrat flex items-center gap-2">
                                    <FolderOpen className="w-4 h-4" />
                                    My Saved
                                </TabsTrigger>
                                <TabsTrigger value="settings" className="flex items-center gap-2 font-sans">
                                    <Settings className="w-4 h-4" />
                                    Settings
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="new-analysis">
                                <NewAnalysis />
                            </TabsContent>
                            <TabsContent value="saved">
                                <Saved />
                            </TabsContent>
                            <TabsContent value="settings">
                                <SettingsPage />
                            </TabsContent>
                        </Tabs>

                    </div>
                </div>
            </div>

            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default AnalyzerScreen
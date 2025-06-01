'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mail, Lock, User } from "lucide-react";

interface AuthScreenProps {
    currentScreen: 'login' | 'signup';
    onLogin: () => void;
    onSwitchToSignup: () => void;
    onSwitchToLogin: () => void;
}

export const AuthScreen = ({ currentScreen, onLogin, onSwitchToSignup, onSwitchToLogin }: AuthScreenProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate authentication
        onLogin();
    };

    return (
        <div className="p-6 min-h-[600px] flex flex-col justify-center">
            {/* Transparent Logo */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
                <h2 className="text-xl font-semibold text-blue-600 mb-1">Analyzer</h2>
                <p className="text-sm text-gray-500">Summarize and analyze terms instantly</p>
            </div>

            <Card className="border-0 shadow-none">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">
                        {currentScreen === 'login' ? 'Welcome Back' : 'Create Account'}
                    </CardTitle>
                    <CardDescription>
                        {currentScreen === 'login'
                            ? 'Sign in to your account to continue'
                            : 'Sign up to start analyzing terms and conditions'
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {currentScreen === 'signup' && (
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            {currentScreen === 'login' ? 'Sign In' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {currentScreen === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={currentScreen === 'login' ? onSwitchToSignup : onSwitchToLogin}
                                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                {currentScreen === 'login' ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

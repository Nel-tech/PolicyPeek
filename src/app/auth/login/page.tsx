'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { useLogin } from "@/hooks/use-auth";
import { validateEmailClient } from "@/components/validateEmailClient ";
import GoogleLoginButton from "@/components/GoogleButton";


function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };


    const loginMutation = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (formData.email.trim()) {
                const validation = validateEmailClient(formData.email);
                if (!validation.isValid) {
                    toast.error(validation.message)
                }
            }
            await loginMutation.mutateAsync({
                email: formData.email,
                password: formData.password,
            });
        } catch (err: any) {
            setError(err?.response?.data?.error || 'An error occurred during sign in');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center mb-4">
                        <Logo size="lg" />
                    </div>
                </div>

                <Card className="border-0 shadow-lg">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-xl">Welcome Back</CardTitle>
                        <CardDescription>Sign in to your account to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="pl-10 h-11 border-gray-200"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="pl-10 h-11 border-gray-200"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="text-right">
                                    <Link
                                        href="/request-reset"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing In...' : 'Login'}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm text-gray-500 bg-white px-2">
                                or continue with
                            </div>
                        </div>

                        {/* Google Login Button */}
                        <GoogleLoginButton text="Sign in with Google" />
                    </CardContent>
                {/* Sign up link */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Don&#39;t have an account?{' '}
                    <Link href="/auth/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                        Create one
                    </Link>
                </p>
                </Card>

            </div>
        </div>
    )

}

export default LoginPage
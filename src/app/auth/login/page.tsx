'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import Link from "next/link";


function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password');
                toast.error('incorrect email or password')
            } else if (result?.ok) {
                await getSession();
                toast.success("Successfully LoggedIn! Welcome Back!");
                router.push('/screen');
            }
        } catch (error) {
            setError('An error occurred during sign in');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 min-h-[600px] flex flex-col justify-center">
            {/* Transparent Logo */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center  mb-4">
                    <Logo size="lg" />
                </div>

            </div>

            <Card className="border-0 shadow-none">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">
                        <h1>Welcome Back</h1>
                    </CardTitle>
                    <CardDescription>
                        <p>Sign in to your account to continue</p>

                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
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
                                    className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your Password"
                                    className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
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

                        <Button
                            type="submit"
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing In...' : 'Login'}
                        </Button>
                    </form>


                </CardContent>
            </Card>
            <p className="mt-5 text-center text-sm/6 text-gray-500">
                Don&#39;t have an account?{' '}
                <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                    Create one
                </Link>
            </p>
        </div>
    )
}

export default LoginPage
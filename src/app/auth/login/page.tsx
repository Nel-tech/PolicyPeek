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
import Footer from "@/components/footer";
import Nav from "@/components/Nav";

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

        <>
            {/* Semantic Header */}
            <header role="banner">
                <Nav logo="/images/Logo.png" authText="" signupText="" loginText="" />
            </header>

            {/* Main Content */}
            <main
                role="main"
                className="min-h-screen mt-[4rem] flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950 transition-colors"
            >
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center mb-4">
                            <Link href="/" aria-label="Go to homepage">
                                <Logo size="lg" />
                            </Link>
                        </div>
                    </div>

                    {/* Auth Card */}
                    <Card
                        className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg dark:shadow-md transition-colors"
                        aria-label="Login form"
                    >
                        <CardHeader className="text-center pb-4">
                            <CardTitle className="font-montserrat text-xl text-gray-900 dark:text-white">
                                Welcome Back
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                Sign in to your account to continue
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            {/* Login Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail
                                            className="absolute left-3 top-3 w-4 h-4 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            className="pl-10 h-11 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                            disabled={isLoading}
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock
                                            className="absolute left-3 top-3 w-4 h-4 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            className="pl-10 h-11 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                            disabled={isLoading}
                                            autoComplete="current-password"
                                        />
                                    </div>
                                    <div className="text-right">
                                        <Link
                                            href="/request-reset"
                                            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="font-sans cursor-pointer w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                    disabled={isLoading}
                                    aria-label="Submit login form"
                                >
                                    {isLoading ? 'Signing In...' : 'Login'}
                                </Button>
                            </form>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                                </div>
                                <div className="relative flex justify-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-2">
                                    or continue with
                                </div>
                            </div>

                            {/* Google Auth */}
                            <GoogleLoginButton text="Sign in with Google" />
                        </CardContent>

                        {/* Signup Link */}
                        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                            Don&#39;t have an account?{' '}
                            <Link
                                href="/auth/signup"
                                className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Create one
                            </Link>
                        </p>
                    </Card>
                </div>
            </main>

            {/* Semantic Footer */}
            <footer role="contentinfo">
                <Footer />
            </footer>
        </>

    )

}

export default LoginPage
'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/api";
import { validateEmailClient } from "@/components/validateEmailClient ";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import GoogleLoginButton from "@/components/GoogleButton";
import Footer from "@/components/footer";
import Nav from "@/components/Nav";


const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const login = useAuthStore((state) => state.login)

    const router = useRouter()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validate email first
            if (email.trim()) {
                const validation = validateEmailClient(email);
                if (!validation.isValid) {
                    toast.error(validation.message);
                    return; 
                }
            }

            const signupData = await signup({
                name,
                email,
                password,
            });

            const userData = {
                id: signupData?.user?.id || signupData?.id,
                name: signupData?.user?.name || signupData?.name || name,
                email: signupData?.user?.email || signupData?.email || email
            };

            if (!userData.id) {
                throw new Error("User ID not found in signup response");
            }

            login(userData);

            toast.success("Account created successfully! Welcome aboard!");
            router.push('/analyze');

        } catch (err: any) {
            console.error("Signup error:", err);


            let message = "Something went wrong";

            if (err.response?.status === 409 || err.response?.status === 400) {

                const errorMessage = err.response?.data?.message || "";

                if (errorMessage.toLowerCase().includes('email') &&
                    (errorMessage.toLowerCase().includes('exist') ||
                        errorMessage.toLowerCase().includes('taken') ||
                        errorMessage.toLowerCase().includes('registered'))) {
                    message = "An account with this email already exists. Please use a different email or try signing in.";
                } else {
                    message = errorMessage || "Invalid registration details";
                }
            } else if (err.response?.data?.message) {
                message = err.response.data.message;
            } else if (err.message) {
                message = err.message;
            }

            toast.error(message);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <header>
                <Nav logo="/images/Logo.png" authText="" signupText="" loginText="" />
            </header>
            <div className="min-h-screen mt-[4rem] flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950 transition-colors">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center mb-4">
                            <Link href='/'>
                                <Logo size="lg" />
                            </Link>
                        </div>
                    </div>

                    <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg dark:shadow-md transition-colors">
                        <CardHeader className="text-center pb-4">
                            <CardTitle className="text-xl text-gray-900 dark:text-white">
                                Create Account
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                Sign up to start analyzing terms and conditions
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSignup} className="space-y-4">
                                {/* Name Input */}
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
                                            className="pl-10 h-11 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
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
                                            className="pl-10 h-11 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
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
                                            className="pl-10 h-11 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
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

                            {/* Google Login Button */}
                            <GoogleLoginButton text="Sign up with Google" />
                        </CardContent>

                        {/* Login Link */}
                        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link href="/auth/login" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                Sign in
                            </Link>
                        </p>
                    </Card>
                </div>
            </div>


            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default SignupPage
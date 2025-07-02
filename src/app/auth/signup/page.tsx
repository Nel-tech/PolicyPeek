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
                    return; // ✅ Exit early if validation fails
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
            router.push('/screen');

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
                        <CardTitle className="text-xl">
                            Create Account
                        </CardTitle>
                        <CardDescription>
                            Sign up to start analyzing terms and conditions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignup} className="space-y-4">
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
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

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
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm text-gray-500 bg-white px-2">
                                or continue with
                            </div>
                        </div>

                        {/* Google Login Button */}
                        <GoogleLoginButton text="Sign up with Google" />
                    </CardContent>
                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="font-semibold text-blue-600 hover:text-blue-700">
                        Sign in
                    </Link>
                </p>
                </Card>

            </div>
        </div>
    );
};

export default SignupPage
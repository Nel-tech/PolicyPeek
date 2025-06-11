'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, User } from "lucide-react";
import axios from 'axios'
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { useRouter } from "next/navigation";


const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post(
                '/api/auth/signup',
                { email, password, name },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("data", res.data);
            toast.success("Account created successfully! Welcome aboard!");
            router.push('/screen')

        } catch (err: any) {
            const message = err.response?.data?.message || "Something went wrong";
            toast.error(message);
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
                        <h1>Create Account</h1>

                    </CardTitle>
                    <CardDescription>
                        <p>Sign up to start analyzing terms and conditions</p>

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


                        <div className="mt-6 text-center">
                            <Button
                                type="submit"
                                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </div>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
};

export default SignupPage
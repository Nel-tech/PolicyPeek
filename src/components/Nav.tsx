'use client'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Moon, SunDim } from "lucide-react";
import { NavTypes } from '@/types/types';

import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';

function Nav({ logo, loginText, signupText, authText }: NavTypes) {
    const { theme, setTheme } = useTheme()
    const [hasMounted, setHasMounted] = useState(false);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);


    useEffect(() => {
        setHasMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    if (!hasMounted) return null;

    return (
        <div>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/60 dark:bg-[#09090b]/70 border-b border-gray-200 dark:border-gray-800 px-6 lg:px-[7rem] py-2 flex items-center justify-between">


                <Link href="/">
                    <Image src={logo} alt="logo" width={35} height={35} />
                </Link>

                {/* Mobile Menu Button */}
                <div className="flex gap-[7rem] items-center  md:hidden">
               
                </div>

                {/* Desktop Nav Links */}
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                    {hasMounted && (
                        <button onClick={toggleTheme} className="cursor-pointer">
                            {theme === 'dark' ? (
                                <SunDim className="text-yellow-400" />
                            ) : (
                                <Moon className="text-gray-800 dark:text-white" />
                            )}
                        </button>
                    )}

                    {!isAuthenticated ? (
                        <>
                            {loginText && (
                                <Link href="/auth/login">
                                    <Button
                                        variant="outline"
                                        className="font-sans cursor-pointer hidden md:block bg-[#F4F4F5] text-gray-900 hover:bg-[#e4e4e7] dark:bg-[#27272a] dark:text-white dark:hover:bg-[#3f3f46]"
                                    >
                                        {loginText}
                                    </Button>
                                </Link>
                            )}
                            {signupText && (
                                <Link href="/auth/signup">
                                    <Button
                                        variant="default"
                                        className="font-sans cursor-pointer bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        {signupText}
                                    </Button>
                                </Link>
                            )}
                        </>
                    ) : (
                        authText && (
                            <Link href="/analyze">
                                <Button
                                    variant="default"
                                    className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    {authText}
                                </Button>
                            </Link>
                        )
                    )}


                </div>

            </nav>

           
          
        </div>
    );
}

export default Nav;

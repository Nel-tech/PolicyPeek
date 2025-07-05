'use client'

import { useState, useEffect } from 'react';
import Logo from '../../public/images/Logo.png';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import { Button } from "@/components/ui/button";
import { Menu, X, Moon } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';

function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);


    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
        <div>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/60 border-b border-gray-200 px-6 lg:px-[7rem] py-2 flex items-center justify-between">
                <Link href="/">
                    <Image src={Logo} alt="logo" width={35} height={35} />
                </Link>

                {/* Mobile Menu Button */}
                <div className="flex gap-[7rem] items-center  md:hidden">
                    {/* <button
                        type="button"
                        className="order-2 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button> */}
                    {/* <div> <Moon className="cursor-pointer" width={27} height={27} /></div> */}
                </div>

                {/* Desktop Nav Links */}
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                    <Moon className="cursor-pointer" />

                    {!isAuthenticated ? (
                        <>
                            <Link href="/login">
                                <Button
                                    variant="outline"
                                    className="hidden md:block bg-[#F4F4F5] hover:bg-[#e4e4e7]"
                                >
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button
                                    variant="default"
                                    className="bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Link href="/analyze">
                            <Button
                                variant="default"
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                Analyze
                            </Button>
                        </Link>
                    )}
                </div>

            </nav>

            {/* Mobile Menu Sheet */}
          
        </div>
    );
}

export default Nav;

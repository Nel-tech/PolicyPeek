'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(
    () => import('framer-motion').then((mod) => mod.motion.div),
    { ssr: false }
);

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-[#0f0f0f] dark:via-[#111] dark:to-[#1a1a1a] overflow-hidden">

            {/* Grid background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0H0V40" fill="none" stroke="#3B82F6" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 mt-[4rem] text-center">
                
                    <h1 className="text-3xl font-montserrat font-extrabold tracking-tight leading-tight mb-4 text-gray-900 dark:text-white md:text-5xl">
                        Understand Terms & Conditions in Seconds
                    </h1>

                    

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8 md:mx-auto">
                        Let AI summarize privacy policies and hidden clauses so you never have to read long legal documents again.
                    </p>

                    <div className="font-sans sm:text-center md:text-center">
                        <Link href='/auth/signup'>
                            <Button className="bg-blue-600  font-sans cursor-pointer hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-base font-semibold transition dark:bg-blue-500 dark:hover:bg-blue-600">
                                Try It For Free
                            </Button>
                        </Link>
                    </div>
               
            </div>
        </section>
    );
}

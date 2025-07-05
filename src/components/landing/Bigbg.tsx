'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

// Dynamically load only motion.div
const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);

function Bigbg() {
  return (
    <section className="relative py-32 px-4 bg-white">
      {/* Centered Dark Card with visible pattern */}
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-5xl mx-auto bg-neutral-900 border border-gray-800 shadow-xl rounded-3xl px-8 py-32 text-center overflow-hidden"
      >
        {/* Pattern inside the dark card */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="brightDots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1.5" fill="#60A5FA" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#brightDots)" />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Try PolicyPeek
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Instantly simplify Terms and Conditions with AI-powered summaries and risk analysis — no legalese, just clarity.
          </p>

          
          <Link href='/auth/signup'>
          
          <Button className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer px-8 py-6 rounded-sm text-base font-semibold transition">
            Get Started Now
          </Button>
          </Link>
        </div>
      </MotionDiv>
    </section>
  );
}

export default Bigbg;

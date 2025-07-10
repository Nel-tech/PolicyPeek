'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';



function Bigbg() {
  return (
    <section className="relative py-32 px-4 bg-white dark:bg-[#0f0f0f]">
     
      <div
        className="relative z-10 max-w-5xl mx-auto bg-neutral-900 dark:bg-neutral-900 border border-gray-800 dark:border-zinc-700 shadow-xl rounded-3xl px-8 py-32 text-center overflow-hidden"
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
          <h2 className=" font-montserrat text-3xl md:text-5xl font-bold mb-6 text-white">
            Try PolicyPeek
          </h2>
          <p className=" font-sans text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Instantly simplify Terms and Conditions with AI-powered summaries and risk analysis — no legalese, just clarity.
          </p>

          <Link href="/auth/signup">
            <Button className=" cursor-pointer bg-blue-500 hover:bg-blue-600 font-sans text-white  dark:bg-blue-600 dark:hover:bg-blue-700 px-8 py-6 rounded-sm text-base font-semibold transition">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Bigbg;

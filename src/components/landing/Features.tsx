'use client';

import React from "react";
import {
    ShieldCheckIcon,
    FileSearchIcon,
    AlertTriangleIcon,
} from "lucide-react";
import AnimatedCard from "../AnimatedCard";

export default function Features() {
    return (
        <section
            id="features"
            role="region"
            aria-label="PolicyPeek Features"
            className="bg-gray-50 dark:bg-[#0f0f0f] py-20 px-6 text-center"
        >
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-montserrat md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
                    What PolicyPeek Offers
                </h2>

                <div className="grid md:grid-cols-3 gap-10 text-left">
                    <AnimatedCard
                        icon={
                            <FileSearchIcon
                                className="h-10 w-10 text-blue-500 dark:text-blue-400 mb-4"
                                aria-hidden="true"
                            />
                        }
                        title="Smart Summaries"
                        description="Automatically breaks down long legal documents into concise, easy-to-read summaries."
                        delay={0}
                    />

                    <AnimatedCard
                        icon={
                            <AlertTriangleIcon
                                className="h-10 w-10 text-blue-500 dark:text-blue-400 mb-4"
                                aria-hidden="true"
                            />
                        }
                        title="Risk Flags"
                        description="Identifies potential risks, hidden clauses, and data-sharing terms you should know about."
                        delay={0.1}
                    />

                    <AnimatedCard
                        icon={
                            <ShieldCheckIcon
                                className="h-10 w-10 text-blue-500 dark:text-blue-400 mb-4"
                                aria-hidden="true"
                            />
                        }
                        title="Privacy Grades"
                        description="Provides an overall score and guidance based on the document's privacy practices."
                        delay={0.2}
                    />
                </div>
            </div>
        </section>
    );
}

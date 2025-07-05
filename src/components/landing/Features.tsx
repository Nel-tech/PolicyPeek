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
        <section className="bg-gray-50 py-20 px-6 text-center">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">What PolicyPeek Offers</h2>
                <div className="grid md:grid-cols-3 gap-10 text-left">
                    <AnimatedCard
                        icon={<FileSearchIcon className="h-10 w-10 text-blue-500 mb-4" />}
                        title="Smart Summaries"
                        description="Automatically breaks down long legal documents into concise, easy-to-read summaries."
                        delay={0}
                    />
                    <AnimatedCard
                        icon={<AlertTriangleIcon className="h-10 w-10 text-blue-500 mb-4" />}
                        title="Risk Flags"
                        description="Identifies potential risks, hidden clauses, and data-sharing terms you should know about."
                        delay={0.1}
                    />
                    <AnimatedCard
                        icon={<ShieldCheckIcon className="h-10 w-10 text-blue-500 mb-4" />}
                        title="Privacy Grades"
                        description="Provides an overall score and guidance based on the document's privacy practices."
                        delay={0.2}
                    />
                </div>
            </div>
        </section>
    );
}

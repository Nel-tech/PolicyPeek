'use client';

import React from 'react';
import {
    UploadCloudIcon,
    FileScanIcon,
    FileCheckIcon,
} from 'lucide-react';
import AnimatedCard from '../AnimatedCard';

export default function Works() {
    return (
        <section
            id="how-it-works"
            role="region"
            aria-label="How PolicyPeek Works"
            className="bg-gray-50 dark:bg-[#0f0f0f] py-20 px-6 text-center"
        >
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-montserrat md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
                    How It Works
                </h2>

                <div className="grid md:grid-cols-3 gap-10 text-left">
                    <AnimatedCard
                        icon={
                            <UploadCloudIcon
                                className="h-10 w-10 text-blue-500 dark:text-blue-400 mb-4"
                                aria-hidden="true"
                            />
                        }
                        title="Upload Document"
                        description="Submit any Terms & Conditions or Privacy Policy for analysis."
                        delay={0}
                    />

                    <AnimatedCard
                        icon={
                            <FileScanIcon
                                className="h-10 w-10 text-blue-500 dark:text-blue-400 mb-4"
                                aria-hidden="true"
                            />
                        }
                        title="AI Scans the Text"
                        description="Our AI scans the document to detect risks, patterns, and hidden clauses."
                        delay={0.1}
                    />

                    <AnimatedCard
                        icon={
                            <FileCheckIcon
                                className="h-10 w-10 text-blue-500 dark:text-blue-400 mb-4"
                                aria-hidden="true"
                            />
                        }
                        title="Receive Summary"
                        description="Get a simplified summary and overall privacy score based on key findings."
                        delay={0.2}
                    />
                </div>
            </div>
        </section>
    );
}

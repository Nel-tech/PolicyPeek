'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import {
    UploadCloudIcon,
    FileScanIcon,
    FileCheckIcon,
} from 'lucide-react';

// ✅ Only dynamically import `motion.div`
const MotionDiv = dynamic(
    () => import('framer-motion').then((mod) => mod.motion.div),
    { ssr: false }
);

function Works() {
    return (
        <section className="bg-gray-50 dark:bg-[#0f0f0f] py-20 px-6 text-center">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-sans md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
                    How It Works
                </h2>
                <div className="grid md:grid-cols-3 gap-10 text-left">
                    <WorkCard
                        icon={<UploadCloudIcon className="h-10 w-10 text-blue-500 dark:text-blue-400 mb-4" />}
                        title="Upload Document"
                        description="Submit any Terms & Conditions or Privacy Policy for analysis."
                        delay={0}
                    />
                    <WorkCard
                        icon={<FileScanIcon className="h-10 w-10 text-blue-500 dark:text-blue-400 mb-4" />}
                        title="AI Scans the Text"
                        description="Our AI scans the document to detect risks, patterns, and hidden clauses."
                        delay={0.1}
                    />
                    <WorkCard
                        icon={<FileCheckIcon className="h-10 w-10 text-blue-500 dark:text-blue-400 mb-4" />}
                        title="Receive Summary"
                        description="Get a simplified summary and overall privacy score based on key findings."
                        delay={0.2}
                    />
                </div>
            </div>
        </section>
    );
}

type WorkCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
};

function WorkCard({ icon, title, description, delay }: WorkCardProps) {
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 hover:shadow-md transition-all"
        >
            {icon}
            <h3 className="text-xl font-sans font-semibold mb-2 text-gray-900 dark:text-white">
                {title}
            </h3>
            <p className="text-gray-600 font-sans dark:text-gray-300 text-sm">
                {description}
            </p>
        </MotionDiv>
    );
}

export default Works;

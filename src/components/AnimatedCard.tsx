'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const MotionDiv = dynamic(
    () => import('framer-motion').then((mod) => mod.motion.div),
    { ssr: false }
);

export default function AnimatedCard({
    icon,
    title,
    description,
    delay = 0,
}: {
    icon: ReactNode;
    title: string;
    description: string;
    delay?: number;
}) {
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ scale: 1.05 }}
            className="bg-white  dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 hover:shadow-md transition-all"
        >
            {icon}
            <h3 className="text-xl font-montserrat font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 font-sans text-sm">{description}</p>
        </MotionDiv>
    );
}

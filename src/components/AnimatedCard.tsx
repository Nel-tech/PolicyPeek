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
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all"
        >
            {icon}
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </MotionDiv>
    );
}

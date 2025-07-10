
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
            <div>
                <strong className="block font-medium mb-1 font-sans">Error loading data </strong>
                <p className="text-sm font-sans">{message}</p>
            </div>
        </div>
    );
}

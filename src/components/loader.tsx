import React from 'react';

export default function UserSkeleton() {
    return (
        <div className="animate-pulse bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
         
            <div className="h-4 bg-gray-200 rounded w-32" />

            <div className="space-y-3">
                <div className="h-3 bg-gray-100 rounded w-48" />
                <div className="h-24 bg-gray-100 rounded-md w-full" />
            </div>

            <div className="flex justify-between items-center">
                <div className="h-10 bg-blue-200 rounded-md w-[85%]" />
                <div className="h-10 bg-gray-200 rounded-md w-10" />
            </div>
        </div>
    );
}

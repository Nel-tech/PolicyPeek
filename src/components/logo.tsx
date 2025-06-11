import { Eye, Search } from "lucide-react";

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
    variant?: 'default' | 'icon-only' | 'text-only';
}

export const Logo = ({ size = 'md', showText = true, variant = 'default' }: LogoProps) => {
    const sizeClasses = {
        sm: {
            container: 'w-8 h-8',
            icon: 'w-4 h-4',
            text: 'text-lg',
            spacing: 'gap-2'
        },
        md: {
            container: 'w-12 h-12',
            icon: 'w-6 h-6',
            text: 'text-xl',
            spacing: 'gap-3'
        },
        lg: {
            container: 'w-16 h-16',
            icon: 'w-8 h-8',
            text: 'text-2xl',
            spacing: 'gap-4'
        }
    };

    const currentSize = sizeClasses[size];

    if (variant === 'text-only') {
        return (
            <div className="flex items-center">
                <span className={`font-bold text-slate-800 ${currentSize.text}`}>
                    Policy<span className="text-blue-600">Peek</span>
                </span>
            </div>
        );
    }

    if (variant === 'icon-only') {
        return (
            <div className={`relative ${currentSize.container} bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg flex items-center justify-center`}>
                {/* Background tech pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1 left-1 w-1 h-1 bg-cyan-300 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-teal-300 rounded-full"></div>
                    <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-cyan-300 rounded-full"></div>
                </div>

                {/* Main icon - combination of eye and magnifying glass */}
                <div className="relative">
                    <Eye className={`${currentSize.icon} text-white absolute`} />
                    <Search className={`${currentSize.icon} text-cyan-200 ml-1 mt-1 opacity-70`} />
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-center ${currentSize.spacing}`}>
            {/* Icon */}
            <div className={`relative ${currentSize.container} bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg flex items-center justify-center`}>
                {/* Background tech pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1 left-1 w-1 h-1 bg-cyan-300 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-teal-300 rounded-full"></div>
                    <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-cyan-300 rounded-full"></div>
                </div>

                {/* Main icon - combination of eye and magnifying glass */}
                <div className="relative">
                    <Eye className={`${currentSize.icon} text-white absolute`} />
                    <Search className={`${currentSize.icon} text-cyan-200 ml-1 mt-1 opacity-70`} />
                </div>
            </div>

            {/* Text */}
            {showText && (
                <div className="flex flex-col">
                    <span className={`font-bold text-slate-800 leading-tight ${currentSize.text}`}>
                        Policy<span className="text-blue-600">Peek</span>
                    </span>
                </div>
            )}
        </div>
    );
};

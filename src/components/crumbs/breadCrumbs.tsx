import { ChevronRight, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadcrumbsProps {
    currentScreen: string;
    onLogout: () => void;
}

export const Breadcrumbs = ({ currentScreen, onLogout }: BreadcrumbsProps) => {
    return (
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-700">T&C Analyzer</span>
                </div>
                {currentScreen === 'analyzer' && (
                    <>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Dashboard</span>
                    </>
                )}
            </div>

            <Button
                onClick={onLogout}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors p-1"
            >
                <LogOut className="w-4 h-4" />
            </Button>
        </div>
    );
};

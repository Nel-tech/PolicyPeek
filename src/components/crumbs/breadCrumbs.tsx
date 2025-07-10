import { ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

interface BreadcrumbsProps {
  currentScreen: string;
  onLogout: () => void;
}

export const Breadcrumbs = ({ currentScreen, onLogout }: BreadcrumbsProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2 text-sm">
        <Logo size="sm" variant="icon-only" />
        <span className="font-medium text-slate-700 font-sans">PolicyPeek</span>
        {currentScreen === 'analyzer' && (
          <>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500 font-sans">Dashboard</span>
          </>
        )}
      </div>
      
      <Button
        onClick={onLogout}
        variant="ghost"
        size="sm"
        className=" font-sans text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors p-1"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
};

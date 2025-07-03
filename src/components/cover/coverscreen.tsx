import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";
import Footer from "../footer";


export const CoverPage = () => {
    return (

        <>
        <div className="p-8 min-h-[600px] flex flex-col justify-center items-center text-center bg-gradient-to-br from-slate-50 to-blue-50/30">
            {/* Logo */}
            <div className="mb-8">
                <Logo size="lg" />
            </div>

            {/* Tagline */}
            <p className="text-lg text-slate-600 mb-12 max-w-sm leading-relaxed font-medium">
                Know Before You Agree.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="space-y-4 w-full max-w-xs">

                <div>
                <Link href="/auth/login" passHref>
                    <Button
                        asChild
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        <span>Login</span>
                    </Button>
                </Link>

                </div>

                <div className="pt-[.1rem]">

                <Link href="/auth/signup" passHref >
                    <Button
                        asChild
                        variant="outline"
                        className="w-full h-12 border-slate-200 text-slate-700 hover:bg-slate-50 font-medium rounded-lg transition-all duration-200 hover:border-blue-300"
                    >
                        <span>Sign Up</span>
                    </Button>
                </Link>
                </div >

            </div>
        </div>
        
        <footer>
            <Footer/>
        </footer>
        </>
    );
};

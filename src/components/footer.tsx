"use client";

import Link from "next/link";

const Footer = () => {
    return (
        <footer className="font-sans border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-12">
            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                <div className="text-center md:text-left">
                    <p className="font-sans">&copy; {new Date().getFullYear()} PolicyPeek. All rights reserved.</p>
                </div>

                <div className="flex gap-4">
                    <Link
                        href="/privacy-policy"
                        className="font-sans hover:underline hover:text-gray-900 dark:hover:text-white footer-sans"
                        
                    >
                        Privacy Policy
                    </Link>

                    <Link
                        href="/terms-of-service"
                        className="font-sans hover:underline hover:text-gray-900 dark:hover:text-white footer-sans"
                       
                    >
                        Terms of Service
                    </Link>

                </div>
            </div>
        </footer>
    );
};

export default Footer;

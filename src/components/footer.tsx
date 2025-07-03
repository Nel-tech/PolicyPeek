"use client";

import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-12">
            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

                <div className="text-center md:text-left">
                    <p>&copy; {new Date().getFullYear()} PolicyPeek. All rights reserved.</p>
                </div>

                <div className="flex gap-4">
                    <Link href="/privacy-policy" className="hover:underline">
                        Privacy Policy
                    </Link>
                    <Link href="/terms-of-service" className="hover:underline">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

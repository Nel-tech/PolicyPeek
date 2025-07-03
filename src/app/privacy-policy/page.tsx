"use client";

export default function PrivacyPolicy() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Privacy Policy</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                <p>
                    PolicyPeek is a web application that allows users to paste and analyze
                    Terms & Conditions and Privacy Policies before agreeing to them. We
                    respect your privacy and are committed to protecting your personal
                    data.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        <strong>Text Input:</strong> We <span className="underline">do not</span> store or save the text users paste for analysis.
                    </li>
                    <li>
                        <strong>Analytics:</strong> We may collect basic metadata like browser type or usage patterns for analytics purposes.
                    </li>
                    <li>
                        <strong>Authentication:</strong> If you sign up or log in (e.g., using Google), we store your name and email address securely.
                    </li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. How We Use Information</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>To track login sessions</li>
                    <li>To analyze and improve usage patterns</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Data Sharing</h2>
                <p>
                    We do not sell or share your personal information with third parties,
                    except for essential services required to run PolicyPeek (e.g.,
                    authentication via Google).
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Security</h2>
                <p>
                    We use HTTPS encryption and industry-standard security practices to
                    protect any information you share with us.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Cookies</h2>
                <p>
                    We use cookies only for authentication and session tracking. These are
                    stored securely on the server side and are never used for third-party
                    tracking or advertising.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. User Rights</h2>
                <p>
                    Users have the right to delete their account and associated information
                    at any time. Please contact support or use the in-app account deletion
                    option (if available).
                </p>
            </section>
        </div>
    );
}

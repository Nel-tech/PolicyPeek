"use client";
import Footer from "@/components/footer"
import Nav from "@/components/Nav"

export default function TermsOfService() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                Terms of Service
            </h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    Welcome to <strong>PolicyPeek</strong>. By accessing or using our web
                    application, you agree to be bound by these Terms of Service. If you do
                    not agree with any part of the terms, please do not use the application.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Service Description</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    PolicyPeek is a tool that allows users to paste and analyze Terms &amp;
                    Conditions and Privacy Policies. It provides summaries and flags
                    potentially sensitive words or phrases to help users make more informed
                    decisions before accepting any policy or agreement.
                </p>
                <p className="mt-2 italic text-sm text-gray-600 dark:text-gray-400">
                    <strong>Note:</strong> PolicyPeek is an informational tool and not a
                    substitute for legal advice.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Acceptable Use</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>You agree not to use PolicyPeek for any unlawful or abusive purpose.</li>
                    <li>Do not attempt to reverse-engineer, hack, or disrupt the platform.</li>
                    <li>You are responsible for the text and content you submit.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. No Legal Advice</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    The information provided by PolicyPeek is for informational purposes only.
                    It does not constitute legal advice or create an attorney-client
                    relationship. Always consult a qualified legal professional for advice on
                    specific legal matters.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    We reserve the right to suspend or terminate access to PolicyPeek at our
                    discretion, especially in cases of abuse, misuse, or breach of these
                    Terms.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    We may update these Terms of Service from time to time. Users will be
                    notified of major changes, and continued use of the service indicates your
                    acceptance of the new terms.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Governing Law</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    These Terms shall be governed by and interpreted in accordance with the
                    laws of Nigeria (or your preferred jurisdiction), without regard to
                    conflict of law principles.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">8. Contact</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    If you have any questions about these Terms, please contact us at:{" "}
                    <a
                        href="mailto:support@policypeek.com"
                        className="text-blue-600 dark:text-blue-400 underline"
                    >
                        support@policypeek.com
                    </a>
                </p>
            </section>
        </div>

    );
}

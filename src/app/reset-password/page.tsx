'use client'
import React, { useState } from "react"
import { useHandleResetPassword } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer"
import Nav from "@/components/Nav"

function ResetPasswordForm() {
    const [newPassword, setNewPassword] = useState('')
    const [resetToken, setResetToken] = useState('')
    const mutation = useHandleResetPassword()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        mutation.mutate(
            { newPassword, resetToken },
            {
                onSuccess: () => {
                    router.push('/auth/login')
                }
            }
        )
    }

    return (
        <>
            <header>
                <Nav logo="/images/Logo.png" authText="" signupText="" loginText="" />
            </header>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
                <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-lg font-montserrat font-semibold text-gray-800 dark:text-white">Reset Your Password</h2>

                    <input
                        type="text"
                        placeholder="Enter your reset token"
                        value={resetToken}
                        onChange={e => setResetToken(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="font-sans w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                    >
                        Reset Password
                    </button>
                </form>
            </div>

            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default ResetPasswordForm

'use client'

import { useHandleRequestToken } from "@/hooks/use-auth"
import React, { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Copy, Loader2, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import Footer from "@/components/footer"
import Nav from "@/components/Nav"

function RequestResetForm() {
  const [email, setEmail] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const mutation = useHandleRequestToken()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("Please enter an email address")
      return
    }

    mutation.mutate({ email }, {
      onSuccess: (data) => {
       
        if (data?.token) {
          setIsDialogOpen(true)
        }
      }
    })
  }

  const handleCopy = () => {
    const token = mutation.data?.token
    if (token) {
      navigator.clipboard.writeText(token)
      toast.success("Token copied to clipboard!")
    }
  }

  const tokenValue = mutation.data?.token || mutation.data?.Token?.token

  return (

    <>
      <header>
        <Nav logo="/images/Logo.png" authText="" signupText="" loginText="" />
      </header>
    
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Request Reset Token</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Enter your email address to generate a password reset token.
            </p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={mutation.isPending}
              required
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending || !email.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {mutation.isPending ? 'Generating Token...' : 'Generate Reset Token'}
          </button>

          {/* Success State */}
          {mutation.isSuccess && tokenValue && (
            <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-600 rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-green-800 dark:text-green-100 font-medium">Token Generated Successfully!</span>
              </div>
              <p className="text-green-700 dark:text-green-200 text-sm mb-3">
                Your reset token has been generated. Click the button below to view and copy it.
              </p>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">View Reset Token</Button>
                </DialogTrigger>

                <DialogContent className="max-w-md dark:bg-gray-900 dark:text-white">
                  <DialogHeader>
                    <DialogTitle>Your Reset Token</DialogTitle>
                    <DialogDescription>
                      Copy this token to reset your password. This token expires in 15 minutes.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Reset Token:
                      </label>
                      <div className="relative">
                        <code className="block break-all bg-gray-50 dark:bg-gray-800 p-3 rounded-md border dark:border-gray-700 text-sm pr-12 font-mono text-gray-900 dark:text-gray-100">
                          {tokenValue}
                        </code>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleCopy}
                          className="absolute top-2 right-2 h-8 w-8"
                          title="Copy token"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 rounded-md p-3">
                      <p className="text-amber-800 dark:text-amber-100 text-xs">
                        <strong>Important:</strong> This token will expire in 15 minutes.
                        Copy it now and use it to reset your password.
                      </p>
                    </div>
                  </div>

                  <DialogFooter className="flex-col gap-2">
                    <Link
                      href="/reset-password"
                      className="w-full"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      <Button className="w-full">Go to Reset Password</Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={() => setIsDialogOpen(false)}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Error State */}
          {mutation.isError && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-600 rounded-md p-4">
              <p className="text-red-800 dark:text-red-200 text-sm">
                {mutation.error?.message || 'Failed to generate reset token'}
              </p>
            </div>
          )}
        </form>
      </div>


    <footer>
      <Footer/>
    </footer>
    </>
  )
}

export default RequestResetForm
'use client'

import { useHandleRequestToken } from "@/hooks/use-me"
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
import { Copy } from "lucide-react"
import { toast } from "sonner" // Optional: toast feedback when copied

function RequestResetForm() {
  const [email, setEmail] = useState('')
  const mutation = useHandleRequestToken()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ email })
  }

  const handleCopy = () => {
    if (mutation.data?.resetToken) {
      navigator.clipboard.writeText(mutation.data.resetToken)
      toast.success("Token copied to clipboard!")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <h2 className="text-lg font-medium">Request Reset Token</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Request Token
        </button>

        {mutation.data?.resetToken && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4">
                View Reset Token
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Token</DialogTitle>
                <DialogDescription>
                  Use this token to reset your password.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2 mt-2">
                <p className="font-medium text-gray-700">Your reset token:</p>
                <div className="relative">
                  <code className="block break-all bg-gray-100 p-3 rounded border text-sm pr-10">
                    {mutation.data.resetToken}
                  </code>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="absolute top-1 right-1"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                    <span className="sr-only">Copy token</span>
                  </Button>
                </div>

                <p className="text-gray-500 text-xs mt-2">
                  Copy this token and paste it in the <strong>Reset Password</strong> screen.
                </p>

                <div className="mt-4">
                  <Link href="/reset-password" className="text-blue-600 underline text-sm">
                    Go to Reset Password
                  </Link>
                </div>
              </div>

              <DialogFooter>
                <Button variant="secondary">Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </form>
    </div>
  )
}

export default RequestResetForm

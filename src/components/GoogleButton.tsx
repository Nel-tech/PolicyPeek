'use client'


interface GoogleProps {
    text:string
}

export default function GoogleLoginButton({text}: GoogleProps) {
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_GOOGLE_AUTH}/api/auth/google`
    }

    return (
        <div className="flex justify-center">
            <button
                onClick={handleGoogleLogin}
                className="w-64 flex items-center cursor-pointer justify-center gap-3 bg-white border border-gray-300 px-6 py-3 rounded shadow hover:shadow-md"
            >
                <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google logo"
                    className="w-5 h-5"
                />
                <span className="text-sm font-medium text-gray-700">
                  {text}
                </span>
            </button>
        </div>
    )
}

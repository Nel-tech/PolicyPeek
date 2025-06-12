// app/analyzer/page.tsx (Server Component)
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AnalyzerScreen from "@/components/analyzer-screen/screen"; 

export default async function AnalyzerPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/login");
    }

    return <AnalyzerScreen />;
}

import { Suspense } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "말씀 길잡이 Q&A",
    description: "AI 기반 질문과 답변 서비스",
}

export default function AIQnALayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    </section>
}
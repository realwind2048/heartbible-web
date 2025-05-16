import { Suspense } from "react"

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
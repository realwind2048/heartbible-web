import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Q&A 상세 | 말씀 길잡이",
    description: "질문과 답변의 상세 내용을 확인할 수 있습니다.",
}

export default function QnADetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
} 
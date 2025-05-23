import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Q&A 내역 | 말씀 길잡이",
    description: "이전에 나눈 Q&A 대화 내역을 확인할 수 있습니다.",
}

export default function QnAHistoryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
} 
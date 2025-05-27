import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "AI 기도문 상세 | 말씀 길잡이",
    description: "AI 기도문의 상세 내용을 확인할 수 있습니다.",
}

export default function PrayerDetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
} 
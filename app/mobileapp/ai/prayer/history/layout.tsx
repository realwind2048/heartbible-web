import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "AI 기도문 작성 내역 | 말씀 길잡이",
    description: "AI와 함께 작성한 기도문 내역을 확인할 수 있습니다.",
}

export default function PrayerHistoryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}


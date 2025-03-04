export interface HeartBibleVerse {
    id: number;
    verseKo: string;
    bookKo: string;
    indexKo: string;
    book: string;
    index: string;
    verse: string;
}

export interface VerseCardForPropProps {
    verseString: string;
    indexString: string;
    imageSrc: string;
    particlesId: string;
    shareUrl: string;
}
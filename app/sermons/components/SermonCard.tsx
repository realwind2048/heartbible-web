import { SermonVideo } from '@/app/types/youtube';
import Link from 'next/link';

interface SermonCardProps {
  sermon: SermonVideo;
}

export function SermonCard({ sermon }: SermonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img
          src={sermon.thumbnailUrl}
          alt={sermon.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-blue-600">{sermon.churchName}</span>
          <span className="text-sm text-gray-500">{sermon.date}</span>
        </div>
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{sermon.title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{sermon.summary}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{sermon.pastor}</span>
          <Link
            href={sermon.videoUrl}
            target="_blank"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            유튜브로 보기
          </Link>
        </div>
        {sermon.bibleVerses && (
          <div className="mt-3 flex flex-wrap gap-2">
            {sermon.bibleVerses.map((verse, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                {verse}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
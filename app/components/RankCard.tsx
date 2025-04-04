import { PlayerRank } from '@/app/types/player';

export type RankType = 'totalPlayTime' | 'totalPlayVerseCount' | 'maxPlayTimeAtOnce' | 'maxPlayVerseCountAtOnce' | 'totalPlayCount';

export const RANK_TYPES = {
  totalPlayTime: 'totalPlayTime',
  totalPlayVerseCount: 'totalPlayVerseCount',
  maxPlayTimeAtOnce: 'maxPlayTimeAtOnce',
  maxPlayVerseCountAtOnce: 'maxPlayVerseCountAtOnce',
  totalPlayCount: 'totalPlayCount',
} as const;

export const rankTitles: Record<RankType, string> = {
  totalPlayTime: '총 재생 시간',
  totalPlayVerseCount: '총 말씀 재생',
  maxPlayTimeAtOnce: '단일 재생 시간',
  maxPlayVerseCountAtOnce: '단일 말씀 재생',
  totalPlayCount: '총 재생 횟수'
};

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
  } else {
    return `${hours}시간 ${minutes}분 ${seconds}초`;
  }
};

const getRankValue = (item: PlayerRank, type: RankType): string => {
  switch (type) {
    case RANK_TYPES.totalPlayTime:
      return formatTime(item.totalPlayTime);
    case RANK_TYPES.totalPlayVerseCount:
      return `${item.totalPlayVerseCount.toLocaleString()}절`;
    case RANK_TYPES.maxPlayTimeAtOnce:
      return formatTime(item.maxPlayTimeAtOnce);
    case RANK_TYPES.maxPlayVerseCountAtOnce:
      return `${item.maxPlayVerseCountAtOnce.toLocaleString()}절`;
    case RANK_TYPES.totalPlayCount:
      return `${item.totalPlayCount.toLocaleString()}회`;
    default:
      return '';
  }
};

interface RankCardProps {
  type: RankType;
  items: PlayerRank[];
}

export const RankCard = ({ type, items }: RankCardProps) => (
  <div className="bg-white rounded-lg shadow-md p-4">
    <h2 className="text-lg font-bold mb-3 text-gray-800">{rankTitles[type]}</h2>
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
            item.isMyRank ? 'bg-blue-50 hover:bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-semibold
              ${index === 0 ? 'bg-yellow-400' : 
                index === 1 ? 'bg-gray-400' : 
                index === 2 ? 'bg-amber-600' : 
                'bg-gray-300'}`}>
              {index + 1}
            </span>
            <span className="font-medium text-gray-700 text-sm">{item.name}</span>
            {item.isMyRank && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                내 순위
              </span>
            )}
          </div>
          <span className="text-gray-600 text-sm">
            {getRankValue(item, type)}
          </span>
        </div>
      ))}
    </div>
  </div>
); 
import { XpRank } from '@/app/types/xp';

export const xpRankTitle = '마음 채움 순위';

const getRankValue = (item: XpRank): string => {
  return `${item.totalXp.toLocaleString()} XP`;
};

interface XpRankCardProps {
  items: XpRank[];
  title?: string;
  hideTitle?: boolean;
}

export const XpRankCard = ({ items, title = xpRankTitle, hideTitle = false }: XpRankCardProps) => (
  <div className="bg-white rounded-lg shadow-md p-4">
    {!hideTitle && <h2 className="text-lg font-bold mb-3 text-gray-800">{title}</h2>}
    <div className="space-y-2">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-gray-600 mb-2">아직 기록이 없어요</p>
          <p className="text-sm text-gray-500">첫 기록을 남겨보세요</p>
        </div>
      ) : (
        items.map((item) => (
          <div
            key={item.userId}
            className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
              item.isMe ? 'bg-blue-50 hover:bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold
                ${item.rank === 1 ? 'bg-yellow-400' : 
                  item.rank === 2 ? 'bg-gray-400' : 
                  item.rank === 3 ? 'bg-amber-600' : 
                  'bg-gray-300'}`}>
                {item.rank}
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-700 text-sm">{item.name}</span>
                  {item.isMe && (
                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] rounded-full">
                      나
                    </span>
                  )}
                </div>
                {item.levelIcon && item.levelTitle && (
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <span>{item.levelIcon}</span>
                        <span>Lv.{item.level} {item.levelTitle}</span>
                    </span>
                )}
              </div>
            </div>
            <span className="text-gray-600 text-sm font-medium">
              {getRankValue(item)}
            </span>
          </div>
        ))
      )}
    </div>
  </div>
);
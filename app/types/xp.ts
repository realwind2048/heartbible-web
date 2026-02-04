export interface XpRank {
    rank: number;
    userId: string;
    name: string;
    totalXp: number;
    level: number;
    levelTitle: string;
    levelIcon: string;
    isMe: boolean;
  }

  export interface XpRankResponse {
    rankings: XpRank[];
    myRank: XpRank | null;
  }

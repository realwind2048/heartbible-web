export interface PointRank {
  id: string;
  name: string;
  totalPoint: number;
  isMyRank: boolean;
}

export interface PointRanks {
  rankByTotalPoint: PointRank[];
} 
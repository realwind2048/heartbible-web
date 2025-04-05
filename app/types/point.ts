export interface PointRank {
  id: string;
  name: string;
  totalEarnPoint: number;
  isMyRank: boolean;
}

export interface PointRanks {
  rankByTotalPoint: PointRank[];
} 
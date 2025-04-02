interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface PlayerRank {
  id: string;
  name: string;
  totalPlayTime: number;
  totalPlayVerseCount: number;
  maxPlayTimeAtOnce: number;
  maxPlayVerseCountAtOnce: number;
  totalPlayCount: number;
  totalCompleteCount: number;
  totalStartCount: number;
  currentPlayerMissionId: string;
  createdAt: Timestamp;
  modifiedAt: Timestamp;
  isMyRank: boolean;
}

export interface PlayerRanks {
  rankByTotalPlayTime: PlayerRank[];
  rankByTotalPlayVerseCount: PlayerRank[];
  rankByMaxPlayTimeAtOnce: PlayerRank[];
  rankByMaxPlayVerseCountAtOnce: PlayerRank[];
  rankByTotalPlayCount: PlayerRank[];
} 
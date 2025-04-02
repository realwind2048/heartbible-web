export interface RankItem {
  rank: number;
  name: string;
  value: number;
  unit: string;
}

export interface PlayerRanks {
  totalPlayTime: RankItem[];
  totalVersePlay: RankItem[];
  singlePlayTime: RankItem[];
  singleVersePlay: RankItem[];
  totalPlayCount: RankItem[];
} 
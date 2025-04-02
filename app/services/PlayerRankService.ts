import { PlayerRanks } from '@/app/types/player';

export class PlayerRankService {
  private static readonly API_URL = 'https://heartbible.klutche.com/api/player/get-ranks';

  static async getRanks(bearerToken: string): Promise<PlayerRanks> {
    try {
      const response = await fetch(this.API_URL, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('순위 데이터 조회 중 오류 발생:', error);
      throw error;
    }
  }
} 
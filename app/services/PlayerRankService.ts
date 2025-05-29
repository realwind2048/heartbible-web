import { PlayerRanks } from '@/app/types/player';

interface RankParams {
  period?: 'month' | 'all';
  month?: string;
}

export class PlayerRankService {
  static async getRanks(token: string | null, params?: RankParams): Promise<PlayerRanks> {
    try {
      let url = '/api/player/ranks';
      if (params?.period === 'month' && params?.month) {
        url += `?period=${params.period}&month=${params.month}`;
      } else if (params?.period === 'all') {
        url += `?period=${params.period}`;
      }

      let response;
      if (token) {
        response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });        
      } else {
        response = await fetch(url);
      }

      if (!response.ok) {
        throw new Error('Failed to fetch ranks');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getRanks:', error);
      throw error;
    }
  }
} 
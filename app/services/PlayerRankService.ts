import { PlayerRanks } from '@/app/types/player';

interface RankParams {
  period?: 'month' | 'all';
  yearMonthId?: string;
}

export class PlayerRankService {
  static async getRanks(token: string | null): Promise<PlayerRanks> {
    try {
      let url = '/api/player/ranks';
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

  static async getPlayerMissionRanks(token: string | null, params?: RankParams): Promise<PlayerRanks> {
    try {
      let url = '/api/player/playermissoinranks';
      if (params?.period === 'month' && params?.yearMonthId) {
        url += `?period=${params.period}&yearMonthId=${params.yearMonthId}`;
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
        throw new Error('Failed to fetch player mission ranks');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getPlayerMissionRanks:', error);
      throw error;
    }
  }
} 
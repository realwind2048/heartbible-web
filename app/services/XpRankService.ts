import { XpRankResponse } from '@/app/types/xp';

export class XpRankService {
  static async getXpRanks(token: string | null): Promise<XpRankResponse> {
    try {
      const url = '/api/xp/ranks';
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
        throw new Error('Failed to fetch XP ranks');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getXpRanks:', error);
      throw error;
    }
  }
}

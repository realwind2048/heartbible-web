import { PlayerRanks } from '@/app/types/player';

export class PlayerRankService {
  static async getRanks(token: string | null): Promise<PlayerRanks> {
    try {
      let response;
      if (token) {
        response = await fetch('/api/player/ranks', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });        
      } else {
        response = await fetch('/api/player/ranks');
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
import { PlayerRanks } from '@/app/types/player';

export class PlayerRankService {
  static async getRanks(token: string): Promise<PlayerRanks> {
    try {
      const response = await fetch('/api/player/ranks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

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
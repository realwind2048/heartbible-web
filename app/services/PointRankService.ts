import { PointRanks } from '@/app/types/point';

export class PointRankService {
  static async getRanks(token?: string | null): Promise<PointRanks> {
    try {
      const response = await fetch('/api/point/ranks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      if (!response.ok) {
        throw new Error('포인트 순위를 불러오는데 실패했습니다.');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching point ranks:', error);
      throw error;
    }
  }
} 
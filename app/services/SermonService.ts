import { SermonVideo } from '@/app/types/youtube';

export class SermonService {
  static async getAllSermons(size: number = 10): Promise<SermonVideo[]> {
    try {
      const response = await fetch(`/api/sermon/all-sermon-summary?size=${size}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sermons');
      }
      const data = await response.json();
      return data.content || [];
    } catch (error) {
      console.error('Sermon fetch error:', error);
      throw error;
    }
  }

  static async getSermonById(id: string): Promise<SermonVideo> {
    try {
      const response = await fetch(`/api/sermon/get-sermon-summary-by-id?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sermon');
      }
      return response.json();
    } catch (error) {
      console.error('Sermon fetch error:', error);
      throw error;
    }
  }
} 
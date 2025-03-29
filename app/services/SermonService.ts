import { SermonVideo } from '@/app/types/youtube';

export class SermonService {
  static async getAllSermons(size: number = 10): Promise<SermonVideo[]> {
    try {
      console.log('Fetching sermons with size:', size);
      const response = await fetch(`/api/sermon/all-sermon-summary?size=${size}`);
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch sermons: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response:', data);
      console.log('Response type:', Array.isArray(data) ? 'Array' : typeof data);
      
      // API가 배열을 직접 반환하거나 content 프로퍼티 내에 배열을 반환할 수 있음
      const sermons = Array.isArray(data) ? data : (data.content || []);
      console.log('Processed sermons:', sermons);
      return sermons;
    } catch (error) {
      console.error('Sermon fetch error:', error);
      throw error;
    }
  }

  static async getSermonById(id: string): Promise<SermonVideo> {
    try {
      const response = await fetch(`/api/sermon/sermon-summary/${id}`);
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch sermon: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Sermon fetch error:', error);
      throw error;
    }
  }
} 
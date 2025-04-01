import { SermonVideo } from '@/app/types/youtube';
import { KLUTCHE_BASE_URL } from '@/app/lib/constants';

export class SermonService {
  static async getAllSermons(size: number = 10): Promise<SermonVideo[]> {
    try {
      console.log('Fetching sermons with size:', size);
      const response = await fetch(`${KLUTCHE_BASE_URL}api/sermon/all-sermon-summary?size=${size}`);
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to fetch sermons');
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
      const apiUrl = `${KLUTCHE_BASE_URL}api/sermon/sermon-summary/${id}`;
      console.log('Fetching sermon with URL:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to fetch sermon');
      }
      
      const data = await response.json();
      console.log('Sermon data received:', data);
      return data;
    } catch (error) {
      console.error('Sermon fetch error:', error);
      throw new Error('설교 정보를 가져오는데 실패했습니다');
    }
  }
} 
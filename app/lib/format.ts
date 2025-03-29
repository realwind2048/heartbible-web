import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDate(date: string | Date, formatString: string = 'yyyy년 MM월 dd일'): string {
  try {
    return format(new Date(date), formatString, { locale: ko });
  } catch (error) {
    console.error('formatDate error', error);
    return '';
  }
} 
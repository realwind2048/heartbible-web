import { FirebaseTimestamp } from '../types/firebase';

export class DateUtil {
  /**
   * Firebase Timestamp를 한국어 날짜 문자열로 변환
   * @param timestamp Firebase Timestamp
   * @returns 한국어 날짜 문자열 (예: "2024년 3월 21일 15:30")
   */
  static formatFirebaseTimestamp(timestamp: FirebaseTimestamp): string {
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * 현재 시간을 Firebase Timestamp 형식으로 반환
   * @returns Firebase Timestamp 형식의 현재 시간
   */
  static getCurrentFirebaseTimestamp(): FirebaseTimestamp {
    const now = new Date();
    return {
      _seconds: Math.floor(now.getTime() / 1000),
      _nanoseconds: now.getMilliseconds() * 1000000
    };
  }

  /**
   * 두 Firebase Timestamp 간의 시간 차이를 계산
   * @param timestamp1 첫 번째 Firebase Timestamp
   * @param timestamp2 두 번째 Firebase Timestamp
   * @returns 두 시간의 차이 (밀리초)
   */
  static getTimeDifference(timestamp1: FirebaseTimestamp, timestamp2: FirebaseTimestamp): number {
    const date1 = new Date(timestamp1._seconds * 1000);
    const date2 = new Date(timestamp2._seconds * 1000);
    return date1.getTime() - date2.getTime();
  }

  /**
   * 상대적 시간 표시 (예: "3분 전", "1시간 전")
   * @param timestamp Firebase Timestamp
   * @returns 상대적 시간 문자열
   */
  static getRelativeTimeString(timestamp: FirebaseTimestamp): string {
    const now = new Date();
    const date = new Date(timestamp._seconds * 1000);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return '방금 전';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays}일 전`;
    }

    return this.formatFirebaseTimestamp(timestamp);
  }
} 
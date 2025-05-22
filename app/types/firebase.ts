export interface FirebaseTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface QnAHistory {
  id: string;
  message: string;
  aiMessage: string;
  createdAt: FirebaseTimestamp;
  userId: string;
} 
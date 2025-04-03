interface Window {
  AndroidInterface?: {
    getToken(): string;
  };
  webkit?: {
    messageHandlers: {
      getToken: {
        postMessage(message: { callback: (token: string) => void }): void;
      };
    };
  };
} 
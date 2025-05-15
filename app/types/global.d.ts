interface Window {
  JSBridge?: {
    getToken: () => string;
    closeActivity?: () => void;
  };
  webkit?: {
    messageHandlers: {
      getToken: {
        postMessage: (message: { callback: (token: string) => void }) => void;
      };
    };
  };
} 
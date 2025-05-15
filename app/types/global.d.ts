interface Window {
  JSBridge?: {
    getToken: () => string;
    getUserInfo: () => string;
    closeActivity?: () => void;
  };
  webkit?: {
    messageHandlers: {
      getToken: {
        postMessage: (message: { callback: (token: string) => void }) => void;
      };
      getUserInfo: {
        postMessage: (message: { callback: (userInfo: string) => void }) => void;
      };
    };
  };
} 
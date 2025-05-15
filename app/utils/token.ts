export const getTokenFromApp = (): Promise<string | null> => {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  // Android
  if (window.JSBridge && typeof window.JSBridge.getToken === 'function') {
    return Promise.resolve(window.JSBridge.getToken());
  }

  // iOS
  if (window.webkit?.messageHandlers?.getToken) {
    return new Promise((resolve) => {
      window.webkit!.messageHandlers.getToken.postMessage({
        callback: (token: string) => resolve(token)
      });
    });
  }

  return Promise.resolve(null);
}; 
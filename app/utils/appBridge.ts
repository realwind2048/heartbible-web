export const getTokenFromApp = (): Promise<string | null> => {
  // Android
  if (window.JSBridge) {
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

export const getUserInfoFromApp = (): Promise<string | null> => {
  // Android
  if (window.JSBridge) {
    return Promise.resolve(window.JSBridge.getUserInfo());
  }
  // iOS
  if (window.webkit?.messageHandlers?.getUserInfo) {
    return new Promise((resolve) => {
      window.webkit!.messageHandlers.getUserInfo.postMessage({
        callback: (userInfo: string) => resolve(userInfo)
      });
    });
  }
  return Promise.resolve(null);
}; 
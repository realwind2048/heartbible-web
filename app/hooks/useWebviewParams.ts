import { useState, useEffect } from 'react';

interface WebviewParams {
  token: string | null;
  adid: string | null;
  lang: string | null;
  chattype: string | null;
  versioncode: string | null;
}

export const useWebviewParams = () => {
  const [params, setParams] = useState<WebviewParams>({
    token: null,
    adid: null,
    lang: null,
    chattype: null,
    versioncode: null,
  });

  useEffect(() => {
    const getWebviewParams = () => {
      const webviewParams = (window as any);
      setParams({
        token: webviewParams.token || null,
        adid: webviewParams.adid || null,
        lang: webviewParams.lang || null,
        chattype: webviewParams.chattype || null,
        versioncode: webviewParams.versioncode || null,
      });
    };

    getWebviewParams();
  }, []);

  return params;
}; 
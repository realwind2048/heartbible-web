import { useState, useEffect } from 'react';

interface WebviewParams {
  token: string | null;
  adid: string | null;
  lang: string | null;
  chattype: string | null;
  versioncode: string | null;
  selectedbibleverses: string | null;
  hasToken: boolean | null;
  isLoading: boolean;
}

export function useWebviewParams(): WebviewParams {
  const [token, setToken] = useState<string | null>(null);
  const [adid, setAdid] = useState<string | null>(null);
  const [lang, setLang] = useState<string | null>(null);
  const [chattype, setChattype] = useState<string | null>(null);
  const [versioncode, setVersioncode] = useState<string | null>(null);
  const [selectedbibleverses, setSelectedbibleverses] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.clientReady = () => {
        console.log('Client is ready, checking params');
        const webviewToken = window.token;
        const webviewAdid = window.adid;
        const webviewLang = window.lang;
        const webviewChattype = window.chattype;
        const webviewVersioncode = window.versioncode;
        const webviewSelectedbibleverses = window.selectedbibleverses;
        
        setToken(webviewToken);
        setAdid(webviewAdid);
        setLang(webviewLang);
        setChattype(webviewChattype);
        setVersioncode(webviewVersioncode);
        setSelectedbibleverses(webviewSelectedbibleverses);
        setHasToken(!!webviewToken);
        setIsLoading(false);
      };
    }

    const requestParams = () => {
      if (typeof window !== 'undefined' && window.JSBridge && typeof window.JSBridge.requestParams === 'function') {
        console.log('Requesting params through JSBridge');
        window.JSBridge.requestParams();
      } else {
        console.log('JSBridge.requestParams is not available');
        setHasToken(false);
        setIsLoading(false);
      }
    };

    requestParams();

    return () => {
      if (typeof window !== 'undefined') {
        delete window.clientReady;
      }
    };
  }, []);

  return {
    token,
    adid,
    lang,
    chattype,
    versioncode,
    selectedbibleverses,
    hasToken,
    isLoading
  };
} 
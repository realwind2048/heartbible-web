export const useHandleNavbarBack = () => {
  const handleNavbarBackEvent = () => {
    console.log('MobileDefaultNavbar의 뒤로 가기 버튼이 감지되었습니다.');
    
    if (typeof window !== 'undefined') {
      if (window.JSBridge && typeof window.JSBridge.closeActivity === 'function') {
        console.log('Attempting to close activity');
        window.JSBridge.closeActivity();
      } else {
        console.log('Not closing activity. Standard router.back() will proceed.');
      }
    }
  };

  return handleNavbarBackEvent;
}; 
'use client';

import { useState, useEffect } from 'react';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';
import { MobileDefaultNavbar } from '../../component/navbar/MobileDefaultNavbar';
import { Card, CardContent } from '../../../../components/ui/card';
import { FirebaseTimestamp } from '@/app/types/firebase';
import { DateUtil } from '@/app/utils/date';
import { useHandleNavbarBack } from '@/app/hooks/useHandleNavbarBack';

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 12;

interface UserProfile {
  userId: string;
  name: string;
  email: string;
  bio: string;
  createdAt: FirebaseTimestamp;
  modifiedAt: FirebaseTimestamp;
  lastUserNameChangedTime?: FirebaseTimestamp;
}

export default function ProfilePage() {
  const { token: webviewToken } = useWebviewParams();
  const [token, setToken] = useState<string | null>(webviewToken);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [isNameValid, setIsNameValid] = useState(false);
  const handleNavbarBackEvent = useHandleNavbarBack();

  useEffect(() => {
    if (webviewToken) {
      setToken(webviewToken);
    }
  }, [webviewToken]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const response = await fetch(`/api/user/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('프로필을 불러오는데 실패했습니다');
        }

        const data = await response.json();
        console.log('Profile data:', data.data);
        setProfile(data.data);
        setFetchError(null);
      } catch (error) {
        console.error('프로필 로딩 실패:', error);
        setFetchError(error instanceof Error ? error.message : '프로필을 불러오는데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const validateName = (name: string) => {
    if (name.length < NAME_MIN_LENGTH) {
      setNameError(`이름은 최소 ${NAME_MIN_LENGTH}자 이상이어야 합니다`);
      setIsNameValid(false);
      return false;
    }
    if (name.length > NAME_MAX_LENGTH) {
      setNameError(`이름은 최대 ${NAME_MAX_LENGTH}자까지 입력 가능합니다`);
      setIsNameValid(false);
      return false;
    }
    setNameError(null);
    setIsNameValid(true);
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewName(value);
    setUpdateError(null);
    validateName(value);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setUpdateError(null);
    setNameError(null);
    setIsNameValid(false);
    setNewName('');
  };

  const handleNameUpdate = async () => {
    if (!token || !newName.trim()) return;
    
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    try {
      // 3초 딜레이 추가
      await new Promise(resolve => setTimeout(resolve, 3000));

      const response = await fetch(`/api/user/profile/name`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ newName: newName.trim() }),
      });

      if (!response.ok) {
        throw new Error('이름 변경에 실패했습니다');
      }

      const data = await response.json();
      if (!data.result) {
        throw new Error(data.message);
      }
      
      const updatedProfile: UserProfile = {
        ...profile!,
        name: newName.trim(),
        lastUserNameChangedTime: data.lastUserNameChangedTime
      };
      setProfile(updatedProfile);
      
      // Android 웹뷰에 이벤트 전송
      if (typeof window !== 'undefined' && window.JSBridge && typeof window.JSBridge.eventUserNameUpdated === 'function') {
        window.JSBridge.eventUserNameUpdated(updatedProfile.name);
      }
      
      setUpdateSuccess(true);
      setTimeout(() => {
        setIsEditModalOpen(false);
        setNewName('');
        setUpdateSuccess(false);
      }, 1500);

    } catch (error) {
      console.error('이름 변경 실패:', error);
      setUpdateError(error instanceof Error ? error.message : '이름 변경에 실패했습니다');
    } finally {
      setIsUpdating(false);
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MobileDefaultNavbar onBackClick={handleNavbarBackEvent} />
      <div className="flex-1 p-4">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : fetchError ? (
          <div className="flex-1 flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <div className="text-red-500 text-center">
                  <p>{fetchError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    다시 시도
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : !profile ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-gray-500">프로필 정보가 없습니다.</div>
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-full bg-gray-50 p-4 rounded-lg">
                  {!profile?.lastUserNameChangedTime && (
                    <div className="mb-4 bg-blue-50 border border-blue-200 rounded-md p-2 flex items-center">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-blue-700">이름은 한 번만 변경 가능합니다</span>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">이름</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold text-gray-900">{profile?.name || '이름 없음'}</p>
                    {!profile?.lastUserNameChangedTime && (
                      <button
                        onClick={() => {
                          setNewName('');
                          setIsEditModalOpen(true);
                          setUpdateError(null);
                        }}
                        className="p-1.5 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                        title="이름 수정"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">이메일</h2>
                    <p className="text-lg text-gray-700">{profile?.email || '이메일 없음'}</p>
                  </div>
                </div>

                <div className="w-full space-y-6">
                  {profile.bio && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">자기소개</h2>
                      <p className="text-base text-gray-700 leading-relaxed">{profile.bio}</p>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">가입일</h2>
                    <p className="text-base text-gray-700">{DateUtil.formatFirebaseTimestamp(profile.createdAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">이름 수정</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">현재 이름</label>
              <p className="text-gray-900">{profile?.name}</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">새 이름</label>
              <input
                type="text"
                value={newName}
                onChange={handleNameChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-900 font-medium"
                placeholder={`새 이름을 입력하세요 (${NAME_MIN_LENGTH}~${NAME_MAX_LENGTH}자)`}
                maxLength={NAME_MAX_LENGTH}
                minLength={NAME_MIN_LENGTH}
              />
              {nameError && (
                <p className="mt-2 text-sm text-red-600">{nameError}</p>
              )}
              {updateError && (
                <p className="mt-2 text-sm text-red-600">{updateError}</p>
              )}
              {updateSuccess && (
                <p className="mt-2 text-sm text-green-600">이름이 성공적으로 변경되었습니다!</p>
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleNameUpdate}
                disabled={isUpdating || !newName.trim() || updateSuccess || !isNameValid}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? '저장 중...' : (updateSuccess ? '저장 완료' : '저장')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
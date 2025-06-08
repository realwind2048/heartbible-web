'use client';

import { useState, useEffect } from 'react';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';
import { MobileDefaultNavbar } from '../../component/navbar/MobileDefaultNavbar';
import { Card, CardContent } from '../../../../components/ui/card';
import { FirebaseTimestamp } from '@/app/types/firebase';
import { DateUtil } from '@/app/utils/date';
import { useHandleNavbarBack } from '@/app/hooks/useHandleNavbarBack';

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
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
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
        setError(null);
      } catch (error) {
        console.error('프로필 로딩 실패:', error);
        setError(error instanceof Error ? error.message : '프로필을 불러오는데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleNameUpdate = async () => {
    if (!token || !newName.trim()) return;
    
    setIsUpdating(true);
    try {
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
      setProfile(prev => prev ? { ...prev, name: newName.trim(), lastUserNameChangedTime: data.lastUserNameChangedTime } : null);
      setIsEditModalOpen(false);
      setNewName('');
    } catch (error) {
      console.error('이름 변경 실패:', error);
      setError(error instanceof Error ? error.message : '이름 변경에 실패했습니다');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <MobileDefaultNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <MobileDefaultNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <MobileDefaultNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">프로필 정보가 없습니다.</div>
        </div>
      </div>
    );
  }

  const getInitials = (name: string | undefined) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MobileDefaultNavbar onBackClick={handleNavbarBackEvent} />
      <div className="flex-1 p-4">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-full bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">이름</h2>
                  {!profile?.lastUserNameChangedTime && (
                    <button
                      onClick={() => {
                        setNewName(profile?.name || '');
                        setIsEditModalOpen(true);
                      }}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      수정
                    </button>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900">{profile?.name || '이름 없음'}</p>
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
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">이름 수정</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">현재 이름</label>
              <p className="text-gray-900">{profile?.name}</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">새 이름</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="새 이름을 입력하세요"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleNameUpdate}
                disabled={isUpdating || !newName.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
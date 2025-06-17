'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '../../../../../components/ui/card';
import { DateUtil } from '@/app/utils/date';
import { FirebaseTimestamp } from '@/app/types/firebase';
import { MobileDefaultNavbar } from '../../../component/navbar/MobileDefaultNavbar';
import { useHandleNavbarBack } from '@/app/hooks/useHandleNavbarBack';

interface UserProfile {
  userId: string;
  name: string;
  email: string;
  bio: string;
  createdAt: FirebaseTimestamp | string;
  profileImage?: string;
}

export default function ProfileViewPage() {
  const params = useParams();
  const id = params.id as string;
  const handleNavbarBackEvent = useHandleNavbarBack();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProfile = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await fetch(`/api/user/profile/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          if (response.status === 404) {
            setFetchError('존재하지 않는 사용자입니다.');
            setProfile(null);
            return;
          }
          throw new Error('프로필을 불러오는데 실패했습니다');
        }
        const data = await response.json();
        setProfile(data.data || data); // data.data 또는 data
      } catch (error) {
        setFetchError(error instanceof Error ? error.message : '프로필을 불러오는데 실패했습니다');
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MobileDefaultNavbar onBackClick={handleNavbarBackEvent} title={profile?.name || '프로필'} />
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
              <div className="flex flex-col space-y-6">
                <div className="w-full bg-gray-50 p-4 rounded-lg flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-900">이름</h2>
                  <p className="text-2xl font-bold text-gray-900">{profile.name || '이름 없음'}</p>
                </div>
                <div className="w-full space-y-6">
                  {profile.bio && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">자기소개</h2>
                      <p className="text-base text-gray-700 leading-relaxed">{profile.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';
import { MobileDefaultNavbar } from '../../component/navbar/MobileDefaultNavbar';
import { Card, CardContent } from '../../../../components/ui/card';

interface UserProfile {
  userId: string;
  name: string;
  email: string;
  bio: string;
  createdAt: string;
  modifiedAt: string;
}

export default function ProfilePage() {
  const { token: webviewToken } = useWebviewParams();
  const [token, setToken] = useState<string | null>(webviewToken);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <MobileDefaultNavbar />
      <div className="flex-1 p-4">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              {/* <Avatar className="w-32 h-32">
                {profile.profileImage && (
                  <AvatarImage 
                    src={profile.profileImage} 
                    alt={profile.name || '프로필 이미지'}
                    width={128}
                    height={128}
                  />
                )}
                <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
              </Avatar> */}
              
              <div className="text-center">
                <h1 className="text-2xl font-bold">{profile.name || '이름 없음'}</h1>
                <p className="text-gray-600">{profile.email || '이메일 없음'}</p>
              </div>

              <div className="w-full space-y-4">
                {profile.bio && (
                  <div>
                    <h2 className="text-lg font-semibold">자기소개</h2>
                    <p className="text-gray-600">{profile.bio}</p>
                  </div>
                )}
                
                <div>
                  <h2 className="text-lg font-semibold">사용자 ID</h2>
                  <p className="text-gray-600">{profile.userId || 'ID 없음'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
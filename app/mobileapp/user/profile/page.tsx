'use client';

import { useState, useEffect } from 'react';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';
import { MobileDefaultNavbar } from '../../component/navbar/MobileDefaultNavbar';
import { Card, CardContent } from '../../../../components/ui/card';
import { FirebaseTimestamp } from '@/app/types/firebase';
import { DateUtil } from '@/app/utils/date';
import { Button } from '@/components/ui/button'; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';

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
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newName, setNewName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

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
        setNewName(data.data.name);
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

  const handleEditClick = () => {
    setShowEditDialog(true);
  };

  const handleUpdateName = async () => {
    if (!token || !profile || !newName.trim()) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/user/profile/name`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName.trim() }),
      });

      if (!response.ok) {
        throw new Error('이름 변경에 실패했습니다');
      }

      const data = await response.json();
      setProfile(data.data);
      setShowEditDialog(false);
    } catch (error) {
      console.error('이름 변경 실패:', error);
      alert(error instanceof Error ? error.message : '이름 변경에 실패했습니다');
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
      <MobileDefaultNavbar />
      <div className="flex-1 p-4">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-full bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">이름</h2>
                  {!profile.lastUserNameChangedTime && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEditClick}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      수정
                    </Button>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900">{profile.name || '이름 없음'}</p>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">이메일</h2>
                  <p className="text-lg text-gray-700">{profile.email || '이메일 없음'}</p>
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

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>이름 수정</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-4">무료로 1번만 이름을 변경할 수 있습니다.</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">현재 이름</label>
                <p className="mt-1 text-gray-900">{profile.name}</p>
              </div>
              <div>
                <label htmlFor="newName" className="text-sm font-medium text-gray-700">
                  새로운 이름
                </label>
                <Input
                  id="newName"
                  value={newName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
                  className="mt-1"
                  placeholder="새로운 이름을 입력하세요"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              disabled={isUpdating}
            >
              취소
            </Button>
            <Button
              onClick={handleUpdateName}
              disabled={isUpdating || !newName.trim()}
            >
              {isUpdating ? '변경 중...' : '변경하기'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
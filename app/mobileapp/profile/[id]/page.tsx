import Image from 'next/image';
import { Card, CardContent } from '../../../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { notFound } from 'next/navigation';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  profileImage: string;
  bio: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

async function getUserProfile(userId: string): Promise<UserProfile> {
  try {
    const response = await fetch(`/api/user/profile/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // NEXT.js에서 기본적으로 캐시를 사용하므로, 실시간 데이터가 필요한 경우 cache: 'no-store' 설정
      cache: 'no-store'
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error('Failed to fetch user profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export default async function ProfilePage({ params }: PageProps) {
  let userProfile: UserProfile;
  
  try {
    userProfile = await getUserProfile(params.id);
  } catch (error) {
    // 에러 페이지로 리다이렉트하거나 에러 컴포넌트를 표시할 수 있습니다
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">오류가 발생했습니다</h1>
        <p className="text-gray-600">사용자 정보를 불러오는 중 문제가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage 
                src={userProfile.profileImage} 
                alt={userProfile.name}
                width={128}
                height={128}
              />
              <AvatarFallback>{userProfile.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold">{userProfile.name}</h1>
              <p className="text-gray-600">{userProfile.email}</p>
            </div>

            <div className="w-full border-t border-gray-200 my-4" />
            
            <div className="w-full space-y-2">
              <div>
                <h2 className="text-lg font-semibold">자기소개</h2>
                <p className="text-gray-600">{userProfile.bio}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold">가입일</h2>
                <p className="text-gray-600">{userProfile.joinDate}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold">사용자 ID</h2>
                <p className="text-gray-600">{userProfile.id}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
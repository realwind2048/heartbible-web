import Image from 'next/image';
import { Card, CardContent } from '../../../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

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
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  try {
    const response = await fetch(`${protocol}://${host}/api/user/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
  const userId = await Promise.resolve(params.id);
  let userProfile: UserProfile;
  
  try {
    userProfile = await getUserProfile(userId);
  } catch (error) {
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
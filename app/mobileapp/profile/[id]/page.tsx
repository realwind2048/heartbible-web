import Image from 'next/image';
import { Card, CardContent } from '../../../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';

interface PageProps {
  params: {
    id: string;
  };
}

async function getUserProfile(userId: string) {
  // TODO: API를 통해 실제 사용자 데이터를 가져오는 로직 구현
  // 현재는 더미 데이터 반환
  return {
    id: userId,
    name: '홍길동',
    email: 'hong@example.com',
    joinDate: '2024-01-01',
    profileImage: '/placeholder-avatar.jpg',
    bio: '마음말씀 열심히 사용중입니다.',
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const userProfile = await getUserProfile(params.id);

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
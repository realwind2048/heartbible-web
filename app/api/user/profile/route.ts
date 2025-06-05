import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('X-User-Id');

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // TODO: 실제 데이터베이스에서 사용자 정보를 가져오는 로직으로 대체
    const userProfile = {
      id: userId,
      name: '홍길동',
      email: 'hong@example.com',
      joinDate: '2024-01-01',
      profileImage: '/placeholder-avatar.jpg',
      bio: '마음말씀 열심히 사용중입니다.',
    };

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Error in profile API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'https://heartbible.klutche.com';
const USE_PRODUCTION_API = false; // 실제 API 호출이 필요할 때 true로 변경
const LOCAL_API_HOST = 'http://localhost:3000';

function getApiHost() {
  if (process.env.NODE_ENV === 'production' || USE_PRODUCTION_API) {
    return API_HOST;
  }
  return LOCAL_API_HOST;
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const userId = request.headers.get('X-User-Id');

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const apiUrl = `${getApiHost()}/api/user/profile/${userId}`;
    console.log(`Calling API: ${apiUrl}`); // API 호출 URL 로깅
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const response = await fetch(apiUrl, {
      headers,
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: '사용자를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('프로필 데이터 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '프로필 데이터를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 
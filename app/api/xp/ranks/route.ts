import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    // XP 랭킹을 가져오는 서버 API URL
    const apiUrl = 'https://heartbible.klutche.com/api/xp/rank/global';
    // const apiUrl = 'http://localhost:8080/api/xp/rank/global';

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
      // 만약 실제 API가 아직 없다면 임시 데이터를 반환하도록 할 수 있습니다.
      // 현재는 에러를 던지거나 빈 데이터를 반환하게 설정합니다.
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('XP 순위 데이터 조회 중 오류 발생:', error);
    // 실제 API가 없는 경우를 대비한 Mock 데이터 (필요시 사용)
    /*
    const mockData = Array.from({ length: 50 }, (_, i) => ({
      id: `user-${i}`,
      name: `사용자 ${i + 1}`,
      totalXp: 5000 - (i * 100),
      isMyRank: i === 10
    }));
    return NextResponse.json(mockData);
    */
    return NextResponse.json(
      { error: '순위 데이터를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

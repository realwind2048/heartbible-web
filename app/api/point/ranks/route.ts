import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Authorization 헤더에서 토큰 가져오기
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    // 외부 API 호출
    // const url = 'https://heartbible.klutche.com/api/point-rank';
    const url = 'http://localhost:8080/api/point-rank';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    });

    if (!response.ok) {
      throw new Error('포인트 순위를 불러오는데 실패했습니다.');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching point ranks:', error);
    return NextResponse.json(
      { error: '포인트 순위를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 
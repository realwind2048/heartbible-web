import { NextResponse } from 'next/server';

// deprecated old api
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const url = new URL(request.url);
    const period = url.searchParams.get('period');
    const yearMonthId = url.searchParams.get('yearMonthId');
    
    // let apiUrl = 'https://heartbible.klutche.com/api/player/get-player-mission-rank';
    let apiUrl = 'http://localhost:8080/api/player/get-player-mission-rank';
    if (period === 'month' && yearMonthId) {
      apiUrl += `?period=${period}&yearMonthId=${yearMonthId}`;
    } else if (period === 'all') {
      apiUrl += `?period=${period}`;
    }

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
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('순위 데이터 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '순위 데이터를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 
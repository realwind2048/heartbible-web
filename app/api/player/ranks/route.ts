import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const response = await fetch('https://heartbible.klutche.com/api/player/get-ranks', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
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
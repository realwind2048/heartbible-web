import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // const response = await fetch('https://heartbible.klutche.com/api/openai/completions', {
      const response = await fetch('http://localhost:8080/api/openai/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('QnA API Error:', error);
    return NextResponse.json(
      { error: '답변을 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

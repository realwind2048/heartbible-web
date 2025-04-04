import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: `당신은 성경 말씀을 잘 아는 말씀 길잡이입니다. 
      사용자의 질문에 대해 성경 구절을 인용하며 답변해주세요.
      답변은 항상 친절하고 이해하기 쉽게 해주세요.
      성경 구절을 인용할 때는 반드시 출처(책, 장, 절)를 명시해주세요.
      교리적인 해석이나 논쟁이 될 수 있는 내용은 피하고, 
      성경 말씀 그대로의 의미를 전달하는데 집중해주세요.`,
    messages,
  });

  return result.toDataStreamResponse();
} 
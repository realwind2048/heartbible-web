import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  const { script } = await req.json();

  const { text } = await generateText({
    model: openai('gpt-4-turbo'),
    prompt: `다음은 성경 말씀을 전하는 유튜브 영상의 자막입니다.  
이 내용을 바탕으로 핵심 메시지를 요약해 주세요.  
요약은 아래 조건을 따르세요:

1. 성경의 핵심 가르침과 의미를 유지하세요.  
2. 영상에서 강조된 주제(예: 사랑, 믿음, 소망 등)를 포함하세요.  
3. 너무 일반적인 요약이 아니라, 영상에서 사용된 핵심 성경 구절을 반영하세요.  
4. 문장은 자연스럽고 쉽게 이해할 수 있도록 작성하세요.  
5. 3~5문장 정도로 간결하게 요약하세요.  

### 예제 입력:  
"오늘 본문은 요한복음 3장 16절입니다. 하나님께서 우리를 얼마나 사랑하시는지 보여주는 말씀입니다. 예수님을 믿으면 영생을 얻는다는 약속이 있습니다. 이 사랑은 조건 없는 사랑이며, 우리는 이 사랑을 세상에 전해야 합니다."  

### 예제 출력:  
"하나님은 우리를 사랑하시어 예수님을 보내셨고, 그를 믿는 자에게 영생을 약속하셨습니다. 이 사랑은 조건 없는 사랑이며, 우리는 그 사랑을 실천해야 합니다."  

이제 아래 자막을 요약하세요:  
${script}
`,
  });
  return new Response(JSON.stringify({ text }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
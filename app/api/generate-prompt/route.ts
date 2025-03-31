import { generateLFilter } from '@/lib/openai.';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = await generateLFilter(prompt);
    return NextResponse.json(result);
  } catch (error) {
    console.error('OpenAI Error:', error);
    return NextResponse.json(
      { error: 'OpenAI request failed' },
      { status: 500 }
    );
  }
}

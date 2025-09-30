import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

interface StrategyInput {
  clientName: string;
  industry: string;
  keywords: string[];
  targetLocation: string;
  competitors: Array<{ domain: string; title: string }>;
}

export async function generateSEOStrategy(input: StrategyInput) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Kamu adalah SEO Expert Indonesia. Buatkan strategi SEO lengkap untuk:

CLIENT: ${input.clientName}
INDUSTRI: ${input.industry}
KEYWORDS: ${input.keywords.join(', ')}
LOKASI: ${input.targetLocation}

TOP 5 KOMPETITOR:
${input.competitors.map((c, i) => `${i+1}. ${c.title} (${c.domain})`).join('\n')}

Buatkan strategi dalam format JSON:
{
  "onpage": { "title": "On-Page SEO", "tasks": [{"task": "...", "description": "...", "priority": "high", "timeline": "Week 1"}] },
  "content": { "title": "Content Strategy", "tasks": [...] },
  "technical": { "title": "Technical SEO", "tasks": [...] },
  "backlink": { "title": "Backlink Building", "tasks": [...] }
}

Berikan minimal 5 tasks per kategori!`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid AI response');

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('AI error:', error);
    throw new Error('Failed to generate strategy');
  }
}


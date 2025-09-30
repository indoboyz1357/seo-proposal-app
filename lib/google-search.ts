import axios from 'axios';

interface SearchResult {
  rank: number;
  url: string;
  domain: string;
  title: string;
  description: string;
}

// Tipe data item dari Google Custom Search API
interface GoogleSearchItem {
  link: string;
  title: string;
  snippet?: string;
}

interface GoogleSearchResponse {
  items?: GoogleSearchItem[];
}

export async function searchGoogle(
  keyword: string,
  numResults: number = 10
): Promise<SearchResult[]> {
  const apiKey = process.env.GOOGLE_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  if (!apiKey || !searchEngineId) {
    throw new Error('Google API credentials not configured');
  }

  try {
    const response = await axios.get<GoogleSearchResponse>(
      'https://www.googleapis.com/customsearch/v1',
      {
        params: {
          key: apiKey,
          cx: searchEngineId,
          q: keyword,
          gl: 'id',
          num: numResults,
        }
      }
    );

    if (!response.data.items) return [];

    return response.data.items.map((item, index) => {
      const url = new URL(item.link);
      return {
        rank: index + 1,
        url: item.link,
        domain: url.hostname.replace('www.', ''),
        title: item.title,
        description: item.snippet || '',
      };
    });
  } catch (error) {
    console.error('Google Search API error:', error);
    throw new Error('Failed to fetch search results');
  }
}

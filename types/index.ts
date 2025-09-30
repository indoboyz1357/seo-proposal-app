export interface Project {
  id: string;
  user_id: string;
  client_name: string;
  website_url?: string;
  industry?: string;
  status: 'draft' | 'analyzing' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface Keyword {
  id: string;
  project_id: string;
  keyword: string;
  target_location?: string;
  created_at: string;
}

export interface Competitor {
  id: string;
  project_id: string;
  rank: number;
  domain: string;
  url: string;
  title: string;
  description: string;
  created_at: string;
}

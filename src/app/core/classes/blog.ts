export interface BlogPost {
  id?: number;
  title: string;
  description: string;
  category: string;
  image?: string;
  tags: string[];
  created_at?: string;
  published_at?: string;
}

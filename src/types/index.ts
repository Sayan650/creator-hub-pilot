
export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  contentTypes: ('youtube' | 'instagram' | 'twitter')[];
  niche: string;
  audienceSize: number;
  baseRates: {
    youtube?: number;
    instagram?: number;
    twitter?: number;
  };
  isOnboarded: boolean;
}

export interface BrandInvite {
  id: string;
  brandName: string;
  offer: number;
  deadline: string;
  description: string;
  requirements: string[];
  status: 'pending' | 'accepted' | 'declined' | 'ongoing' | 'completed';
  platform: 'youtube' | 'instagram' | 'twitter';
}

export interface ContentDraft {
  id: string;
  type: 'caption' | 'tweet' | 'youtube-script' | 'blog-snippet';
  title: string;
  content: string;
  createdAt: string;
}

export interface FinanceEntry {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  source: string;
  date: string;
  tag: string;
  description?: string;
}

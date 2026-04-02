export interface Departure {
  id: string;
  name: string;
  role: string;
  company: 'OpenAI' | 'Anthropic' | 'Google DeepMind' | 'Other';
  departure_date: string;
  departure_date_sortable: string;
  quote?: string | null;
  destination?: string | null;
  source_url: string;
  verified: boolean;
}

export type SortOrder = 'newest' | 'oldest';
export type CompanyFilter = 'All' | 'OpenAI' | 'Anthropic' | 'Google DeepMind' | 'Other';

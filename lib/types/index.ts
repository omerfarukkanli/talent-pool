export interface Candidate {
  id: string;
  name: string;
  email: string;
  stage: string;
  rating: number;
  appliedJob: string;
  avatar: string | null;
  resume: boolean;
  aiFitScore: number;
  source: string;
  dateAdded: string;
  [key: string]: any;
}

export interface ColumnVisibility {
  name: boolean;
  email: boolean;
  stage: boolean;
  rating: boolean;
  appliedJob: boolean;
  resume: boolean;
  aiFitScore: boolean;
  source: boolean;
  dateAdded: boolean;
}

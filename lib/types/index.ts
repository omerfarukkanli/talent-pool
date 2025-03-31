export interface ColumnVisibility {
  name: boolean;
  stage: boolean;
  aiFitScore: boolean;
  source: boolean;
  rating: boolean;
  dateAdded: boolean;
  appliedJob: boolean;
  resume: boolean;
}

export interface ApplicantsResponse {
  getCompanyApplicantList: {
    pages: number;
    total: number;
    applicants: Applicant[];
  };
}

export type SortOrder = 'asc' | 'desc';

export interface LoggedInUser {
  loggedInUser: {
    email: string;
    firstName: string;
    lastName: string;
    profilePictureUrl: string;
  };
}

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  rating: number;
  sourceType: string;
  sourceUpdatedAt: string;
  profilePhotoUrl: string;
  createdAt: string;
  activeApplication: {
    jobListing: {
      name: string;
      color: string;
    };
    aiFit: number | null;
    stage: {
      name: string;
      createdAt: string;
    };
    resume: {
      url: string;
    } | null;
  };
}

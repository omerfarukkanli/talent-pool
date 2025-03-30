export interface ColumnVisibility {
  name: boolean;
  stage: boolean;
  rating: boolean;
  appliedJob: boolean;
  resume: boolean;
  aiFitScore: boolean;
  source: boolean;
  dateAdded: boolean;
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

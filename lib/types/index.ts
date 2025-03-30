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

export interface ApplicantsResponse {
  getCompanyApplicantList: {
    pages: number;
    total: number;
    applicants: Applicant[];
  };
}

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  rating: number;
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

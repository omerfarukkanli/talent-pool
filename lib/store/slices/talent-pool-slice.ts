import { Applicant, SortOrder } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TalentPoolState {
  page: number;
  pageSize: number;
  applicants: Applicant[];
  total: number;
  loading: boolean;
  error: string | null;
  searchQuery?: string;
  sort?: {
    stage?: SortOrder | null;
    createdAt?: SortOrder | null;
  };
}

const initialState: TalentPoolState = {
  page: 1,
  pageSize: 24,
  applicants: [],
  total: 0,
  loading: false,
  error: null,
  sort: {
    createdAt: 'desc',
  },
};

const talentPoolSlice = createSlice({
  name: 'talentPool',
  initialState,
  reducers: {
    setApplicants(
      state,
      action: PayloadAction<{
        applicants: Applicant[];
        total: number;
      }>
    ) {
      state.applicants = action.payload.applicants;
      state.total = action.payload.total;
    },
    addApplicants(state, action: PayloadAction<Applicant[]>) {
      state.applicants.push(...action.payload);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.page = 1;
      state.applicants = [];
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setApplicants,
  addApplicants,
  setPage,
  setLoading,
  setError,
  setSearchQuery,
} = talentPoolSlice.actions;
export default talentPoolSlice.reducer;

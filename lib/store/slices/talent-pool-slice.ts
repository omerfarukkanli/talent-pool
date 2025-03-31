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
  sort: SortType | null;
}

export interface SortType {
  stage?: SortOrder;
  createdAt?: SortOrder;
  sourceType?: SortOrder;
  avgRating?: SortOrder;
  aiFit?: SortOrder;
}

const initialState: TalentPoolState = {
  page: 1,
  pageSize: 24,
  applicants: [],
  total: 0,
  loading: false,
  error: null,
  sort: null,
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
    setSortQuery(
      state,
      action: PayloadAction<{
        field: keyof SortType;
        order: SortOrder | null;
      }>
    ) {
      const { field, order } = action.payload;
      state.page = 1;
      state.applicants = [];
      if (order === null) {
        if (!state.sort) return; // Zaten sıralama yoksa çık

        const updatedSort = { ...state.sort };
        delete updatedSort[field];
        state.sort = Object.keys(updatedSort).length > 0 ? updatedSort : null;
        return;
      }

      state.sort = {
        ...state.sort,
        [field]: order,
      };
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
  setSortQuery,
} = talentPoolSlice.actions;
export default talentPoolSlice.reducer;

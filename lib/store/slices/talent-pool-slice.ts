import { Applicant, SortOrder } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TalentPoolState {
  page: number;
  pageSize: number;
  applicants: Applicant[];
  total: number;
  loading: boolean;
  error: string | null;
  sort: SortType | null;
  filter?: FilterType;
}

export interface FilterType {
  query?: string | null;
  isFavoriteApplicant?: boolean;
  filterParameters:
    | {
        operator?: string | null;
        filterVariable?: string | null;
        logicalOperator?: string | null;
        name?: string | null;
      }[]
    | null;
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
    setFilter(state, action: PayloadAction<FilterType>) {
      if (!state.filter) {
        state.filter = {
          query: action.payload.query,
          filterParameters: action.payload.filterParameters ?? [],
        };
      } else {
        state.filter.query = action.payload.query;
        state.filter.filterParameters = [
          ...(state.filter.filterParameters ?? []),
          ...(action.payload.filterParameters ?? []),
        ];
      }
      state.page = 1;
      state.applicants = [];
    },
    removeFilter(state) {
      state.filter = undefined; // Tüm filtreleri temizle
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
        if (!state.sort) return;
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
  setSortQuery,
  setFilter,
  removeFilter,
} = talentPoolSlice.actions;
export default talentPoolSlice.reducer;

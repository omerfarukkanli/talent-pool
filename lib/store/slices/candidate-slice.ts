import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Candidate } from '@/lib/types';
import { fetchCandidates as fetchCandidatesApi } from '@/lib/api';

interface CandidatesState {
  items: Candidate[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  hasMore: boolean;
  searchQuery: string;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
}

const initialState: CandidatesState = {
  items: [],
  status: 'idle',
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: '',
  sortColumn: null,
  sortDirection: 'asc',
};

export const fetchCandidates = createAsyncThunk(
  'candidates/fetchCandidates',
  async (
    { page, searchQuery }: { page: number; searchQuery: string },
    { rejectWithValue }
  ) => {
    try {
      const candidates = await fetchCandidatesApi(page, searchQuery);
      return { candidates, page };
    } catch {
      return rejectWithValue('Failed to fetch candidates');
    }
  }
);

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1;
      state.hasMore = true;
      state.items = [];
    },
    setSortColumn: (state, action: PayloadAction<string>) => {
      if (state.sortColumn === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortColumn = action.payload;
        state.sortDirection = 'asc';
      }
    },
    resetPagination: (state) => {
      state.page = 1;
      state.hasMore = true;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        const { candidates, page } = action.payload;
        state.status = 'succeeded';

        if (candidates.length === 0) {
          state.hasMore = false;
        } else {
          // If it's the first page, replace the items, otherwise append
          if (page === 1) {
            state.items = candidates;
          } else {
            state.items = [...state.items, ...candidates];
          }
        }
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setSortColumn, resetPagination, incrementPage } =
  candidatesSlice.actions;

export default candidatesSlice.reducer;

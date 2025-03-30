import { ColumnVisibility } from '@/lib/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  columnVisibility: ColumnVisibility;
  commandBarOpen: boolean;
}

const initialState: UIState = {
  columnVisibility: {
    name: true,
    stage: true,
    rating: true,
    appliedJob: true,
    resume: true,
    aiFitScore: false,
    source: false,
    dateAdded: false,
  },
  commandBarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleColumnVisibility: (
      state,
      action: PayloadAction<keyof ColumnVisibility>
    ) => {
      if (action.payload === 'name') {
        state.columnVisibility.name = true;
        return;
      }
      state.columnVisibility[action.payload] =
        !state.columnVisibility[action.payload];
    },
    setCommandBarOpen: (state, action: PayloadAction<boolean>) => {
      state.commandBarOpen = action.payload;
    },
  },
});

export const { toggleColumnVisibility, setCommandBarOpen } = uiSlice.actions;

export default uiSlice.reducer;

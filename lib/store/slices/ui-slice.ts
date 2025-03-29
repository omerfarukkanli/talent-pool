import { ColumnVisibility } from '@/lib/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  columnVisibility: ColumnVisibility;
  commandBarOpen: boolean;
  sidebarOpen: boolean;
}

const initialState: UIState = {
  columnVisibility: {
    name: true,
    email: true,
    stage: true,
    rating: true,
    appliedJob: true,
    resume: true,
    aiFitScore: false,
    source: false,
    dateAdded: false,
  },
  commandBarOpen: false,
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleColumnVisibility: (
      state,
      action: PayloadAction<keyof ColumnVisibility>
    ) => {
      state.columnVisibility[action.payload] =
        !state.columnVisibility[action.payload];
    },
    setCommandBarOpen: (state, action: PayloadAction<boolean>) => {
      state.commandBarOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const {
  toggleColumnVisibility,
  setCommandBarOpen,
  toggleSidebar,
  setSidebarOpen,
} = uiSlice.actions;

export default uiSlice.reducer;

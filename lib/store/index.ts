import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/ui-slice';
import talentPoolReducer from './slices/talent-pool-slice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    talentPool: talentPoolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

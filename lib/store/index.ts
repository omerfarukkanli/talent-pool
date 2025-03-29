import { configureStore } from '@reduxjs/toolkit';
import candidatesReducer from './slices/candidate-slice';
import uiReducer from './slices/ui-slice';

export const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

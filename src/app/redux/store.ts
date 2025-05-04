import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './slices/usersSlice';
import projectsReducer from './slices/projectsSlice/projectsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

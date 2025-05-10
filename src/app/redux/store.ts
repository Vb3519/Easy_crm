import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './slices/usersSlice';
import projectsReducer from './slices/projectsSlice/projectsSlice';
import tasksReducer from './slices/TasksSlice';
import formsReducer from './slices/dataFormsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    forms: formsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

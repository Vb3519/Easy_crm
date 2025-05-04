import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Project_Type } from '../../../../entities/Project_Type';

interface ProjectsState_Type {
  isLoadingViaAPI: boolean;
  projects: Project_Type[];
}

interface ProjectsSlice_Type {
  projects: {
    isLoadingViaAPI: boolean;
    projects: Project_Type[];
  };
}

const initialState: ProjectsState_Type = {
  projects: [],
  isLoadingViaAPI: false,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialState,
  reducers: {},
});

// Часть состояния:
export const selectProjectsSlice = (state: ProjectsSlice_Type) =>
  state.projects;
export const selectProjects = (state: ProjectsSlice_Type) =>
  state.projects.projects;

export default projectsSlice.reducer;

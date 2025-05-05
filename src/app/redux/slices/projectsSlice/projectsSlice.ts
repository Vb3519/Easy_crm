import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Project_Type } from '../../../../entities/Project_Type';

// ------------------------------
// Общие функции (добавить в папку utils):
// ------------------------------
const serverDelayImitation = async (delayTimer: number): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('done');
    }, delayTimer);
  });
};

const fetchData = async (url: string) => {
  try {
    const response: Response = await fetch(url);
    if (response.ok) {
      const data: unknown = await response.json();
      return data;
    } else {
      console.log(`HTTP Error: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
  } catch (error: unknown) {
    console.log(`Error: ${(error as Error).message}`);
    throw new Error(`Error: ${(error as Error).message}`);
  }
};

// -------------------------------
// Загрузка данных по проектам:
// -------------------------------
export const loadProjectsData = createAsyncThunk<Project_Type[], string>(
  'projects/fetchProjects',
  async (url: string, thunkAPI) => {
    await serverDelayImitation(2000);

    try {
      const projectsData = (await fetchData(url)) as Project_Type[];
      return projectsData;
    } catch (error: unknown) {
      console.log(`Projects data download error: ${(error as Error).message}`);
      return thunkAPI.rejectWithValue(
        `Projects data download error: ${(error as Error).message}`
      );
    }
  }
);

// -------------------------------
// Добавление нового проекта:
// -------------------------------
export const addNewProject = createAsyncThunk<Project_Type | undefined, string>(
  'projects/addnewProject',
  async (url: string, thunkAPI) => {
    // -------------------------------------------------------------------- тут добавить функцию, которая создает проект
    const newProjectData: Project_Type = {
      id: '4',
      name: 'Название проекта №4',
      tasks: [],
    };

    await serverDelayImitation(2000);

    try {
      const currentProjects: Project_Type[] = (await fetchData(
        url
      )) as Project_Type[];

      const isAlrdyAdded: boolean = currentProjects.some(
        (projectInfo: Project_Type) => {
          return projectInfo.name === newProjectData.name;
        }
      );

      if (isAlrdyAdded) {
        alert('Проект с данным названием уже добавлен!');
        return;
      }

      const addNewProjectResponse: Response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newProjectData),
      });

      if (addNewProjectResponse.ok) {
        const addedProject: Project_Type = await addNewProjectResponse.json();
        console.log('Добавлен новый проект:', addedProject);

        return addedProject;
      } else {
        console.log(
          `HTTP Error: ${addNewProjectResponse.status} ${addNewProjectResponse.statusText}`
        );
      }
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(`Error: ${(error as Error).message}`);
    }
  }
);

// -------------------------------
// Удаление проекта:
// -------------------------------
export const deleteSelectedProject = createAsyncThunk<Project_Type, string>(
  'projects/deleteProject',
  async (id: string, thunkAPI) => {
    const projectsURLwithId: string = `http://localhost:3001/projects/${id}`;

    await serverDelayImitation(1000);

    try {
      const deleteProjectResponse: Response = await fetch(projectsURLwithId, {
        method: 'DELETE',
      });

      if (deleteProjectResponse.ok) {
        const deletedProject: Project_Type = await deleteProjectResponse.json();
        console.log('Удален проект:', deletedProject);

        return deletedProject;
      } else {
        console.log(
          `HTTP Error: ${deleteProjectResponse.status} ${deleteProjectResponse.statusText}`
        );
        return thunkAPI.rejectWithValue(
          `HTTP Error: ${deleteProjectResponse.status} ${deleteProjectResponse.statusText}`
        );
      }
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(`Error: ${(error as Error).message}`);
    }
  }
);

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
  extraReducers: (builder) => {
    // Загрузка данных по проектам:
    // -------------------------------
    builder.addCase(loadProjectsData.pending, (state) => {
      return { ...state, isLoadingViaAPI: true };
    });

    builder.addCase(loadProjectsData.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.projects = action.payload;
        state.isLoadingViaAPI = false;
      }
    });

    builder.addCase(loadProjectsData.rejected, (state) => {
      return { ...state, isLoadingViaAPI: false };
    });

    // Добавление нового проекта:
    // -------------------------------
    builder.addCase(addNewProject.pending, (state) => {
      return { ...state, isLoadingViaAPI: true };
    });

    builder.addCase(addNewProject.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;

      if (action.payload?.name && action.payload?.id) {
        state.projects.push(action.payload);
      }
    });

    builder.addCase(addNewProject.rejected, (state) => {
      return { ...state, isLoadingViaAPI: false };
    });

    // Удаление выбранного проекта:
    // -------------------------------
    builder.addCase(deleteSelectedProject.pending, (state) => {
      return { ...state, isLoadingViaAPI: true };
    });

    builder.addCase(deleteSelectedProject.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;

      state.projects = state.projects.filter((projectInfo) => {
        return projectInfo.id !== action.payload.id;
      });
    });

    builder.addCase(deleteSelectedProject.rejected, (state) => {
      return { ...state, isLoadingViaAPI: false };
    });
  },
});

// Часть состояния:
export const selectProjectsSlice = (state: ProjectsSlice_Type) =>
  state.projects;
export const selectIsLoadingViaAPI = (state: ProjectsSlice_Type) =>
  state.projects.isLoadingViaAPI;
export const selectProjects = (state: ProjectsSlice_Type) =>
  state.projects.projects;

export default projectsSlice.reducer;

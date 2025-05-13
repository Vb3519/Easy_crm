import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Types:
import { Project_Type } from '../../../../entities/Project_Type';
import { Task_Type } from '../../../../entities/Task_Type';

// Utils:
import createNewProject from '../../../../shared/utils/createNewProject';
import {
  fetchData,
  serverDelayImitation,
} from '../../../../shared/utils/fetchData';

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
      console.log(`Загрузка проектов: ${(error as Error).message}`);
      return thunkAPI.rejectWithValue(
        `Загрузка проектов: ${(error as Error).message}`
      );
    }
  }
);

// -------------------------------
// Добавление нового проекта:
// -------------------------------
export const addNewProject = createAsyncThunk(
  'projects/addnewProject',
  async (payload: { title: string; url: string }, thunkAPI) => {
    await serverDelayImitation(2000);

    const { title, url } = payload;

    // Создание нового проекта:
    const newProjectData = createNewProject(title);

    try {
      const currentProjects: Project_Type[] = (await fetchData(
        url
      )) as Project_Type[];

      const isAlrdyAdded: boolean = currentProjects.some(
        (projectInfo: Project_Type) => {
          return projectInfo.title === newProjectData.title;
        }
      );

      if (isAlrdyAdded) {
        alert('Проект с данным названием уже добавлен!');
        return;
      }

      const addNewProjectResponse: Response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      return thunkAPI.rejectWithValue(
        `Добавление проекта: ${(error as Error).message}`
      );
    }
  }
);

// -------------------------------
// Удаление проекта:
// -------------------------------
export const deleteSelectedProject = createAsyncThunk<Project_Type, string>(
  'projects/deleteProject',
  async (id: string, thunkAPI) => {
    // const projectsURLwithId: string = `http://localhost:3001/projects/${id}`;
    const projectsURLwithId: string = `https://easy-crm-3ii3.onrender.com/projects/${id}`;

    await serverDelayImitation(2000);

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
          `Удаление проекта: ${deleteProjectResponse.status} ${deleteProjectResponse.statusText}`
        );
      }
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(
        `Удаление проекта: ${(error as Error).message}`
      );
    }
  }
);

// -----------------------------------------
// Удаление проекта (со всеми задачами):
// -----------------------------------------
export const deleteProjectWithTasks = createAsyncThunk(
  'projects/deleteProjectWithTasks',
  async (payload: { projectId: string; url: string }, thunkAPI) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 2000);
    });

    // http://localhost:3001/tasks
    // https://easy-crm-3ii3.onrender.com/tasks
    const { projectId, url } = payload;

    try {
      const projectTasksResponse: Response = await fetch(
        `${url}?projectId=${projectId}`
      );

      if (projectTasksResponse.ok) {
        const projectTasks: Task_Type[] = await projectTasksResponse.json();

        await Promise.all(
          projectTasks.map((taskInfo) => {
            fetch(`${url}/${taskInfo.id}`, { method: 'DELETE' });
          })
        );

        return projectId;
      } else {
        console.log(
          `HTTP Error: ${projectTasksResponse.status} ${projectTasksResponse.statusText}`
        );
        return thunkAPI.rejectWithValue(
          `Удаление проекта и задач: ${projectTasksResponse.status} ${projectTasksResponse.statusText}`
        );
      }
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(
        `Удаление проекта и задач: ${(error as Error).message}`
      );
    }
  }
);

interface ProjectsState_Type {
  isLoadingViaAPI: boolean;
  projects: Project_Type[];
  selectedProjectId: string | null;
  error: string;
}

interface ProjectsSlice_Type {
  projects: {
    isLoadingViaAPI: boolean;
    projects: Project_Type[];
    selectedProjectId: string | null;
    error: string;
  };
}

const initialState: ProjectsState_Type = {
  projects: [],
  isLoadingViaAPI: false,
  selectedProjectId: null,
  error: '',
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialState,
  reducers: {
    setActiveProjectId: (state, action) => {
      state.selectedProjectId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Загрузка данных по проектам:
    // -------------------------------
    builder.addCase(loadProjectsData.pending, (state) => {
      return { ...state, isLoadingViaAPI: true, error: '' };
    });

    builder.addCase(loadProjectsData.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.projects = action.payload;
        state.isLoadingViaAPI = false;
      }
    });

    builder.addCase(loadProjectsData.rejected, (state, action) => {
      return {
        ...state,
        isLoadingViaAPI: false,
        error: action.payload as string,
      };
    });

    // Добавление нового проекта:
    // -------------------------------
    builder.addCase(addNewProject.pending, (state) => {
      return { ...state, isLoadingViaAPI: true, error: '' };
    });

    builder.addCase(addNewProject.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;

      if (action.payload?.title && action.payload?.id) {
        state.projects.push(action.payload);
      }
    });

    builder.addCase(addNewProject.rejected, (state, action) => {
      return {
        ...state,
        isLoadingViaAPI: false,
        error: action.payload as string,
      };
    });

    // Удаление выбранного проекта:
    // -------------------------------
    builder.addCase(deleteSelectedProject.pending, (state) => {
      return { ...state, isLoadingViaAPI: true, error: '' };
    });

    builder.addCase(deleteSelectedProject.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;

      state.projects = state.projects.filter((projectInfo) => {
        return projectInfo.id !== action.payload.id;
      });
    });

    builder.addCase(deleteSelectedProject.rejected, (state, action) => {
      return {
        ...state,
        isLoadingViaAPI: false,
        error: action.payload as string,
      };
    });

    // Удаление выбранного проекта (и его задач):
    // ---------------------------------------------
    builder.addCase(deleteProjectWithTasks.pending, (state) => {
      state.isLoadingViaAPI = true;
      state.error = '';
    });

    builder.addCase(deleteProjectWithTasks.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;

      state.projects = state.projects.filter((projectInfo) => {
        return projectInfo.id !== action.payload;
      });

      state.selectedProjectId = null;
    });

    builder.addCase(deleteProjectWithTasks.rejected, (state, action) => {
      state.isLoadingViaAPI = false;
      state.error = action.payload as string;
    });
  },
});

// Действия:
export const { setActiveProjectId } = projectsSlice.actions;

// Часть состояния:
export const selectProjectsSlice = (state: ProjectsSlice_Type) =>
  state.projects;
export const selectIsLoadingViaAPI = (state: ProjectsSlice_Type) =>
  state.projects.isLoadingViaAPI;
export const selectProjects = (state: ProjectsSlice_Type) =>
  state.projects.projects;

export default projectsSlice.reducer;

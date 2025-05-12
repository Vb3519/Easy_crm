import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Task_Type } from '../../../entities/Task_Type';

import createNewTask from '../../../shared/utils/createNewTask';

interface TasksState_Type {
  isLoadingViaAPI: boolean;
  isChangingTaskStatusViaAPI: boolean;
  isAddingNewTaskViaApi: boolean;
  selectedTaskId: string;
  tasks: Task_Type[];
}

interface TasksSlice_Type {
  tasks: {
    isLoadingViaAPI: boolean;
    isChangingTaskStatusViaAPI: boolean;
    isAddingNewTaskViaApi: boolean;
    selectedTaskId: string;
    tasks: Task_Type[];
  };
}

// -------------------------------------
// Загрузка задач выбранного проекта:
// -------------------------------------
export const loadActiveProjectTasks = createAsyncThunk(
  'tasks/loadProjectTasks',
  async (projectIdValue: string, thunkAPI) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 2000);
    });

    try {
      const response: Response = await fetch(
        `http://localhost:3001/tasks?projectId=${projectIdValue}`,
        {
          method: 'GET',
        }
      );

      if (response.ok) {
        const activeprojectTasks: Task_Type[] = await response.json();
        console.log('Все задачи выбранного проекта:', activeprojectTasks);
        return activeprojectTasks;
      } else {
        console.log(`HTTP Error: ${response.status} ${response.statusText}`);
        return thunkAPI.rejectWithValue(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }
    } catch (error: unknown) {
      console.log(`HTTP Error: ${(error as Error).message}`);
      return thunkAPI.rejectWithValue(
        `HTTP Error: ${(error as Error).message}`
      );
    }
  }
);

// -------------------------------
// Добавление новой задачи:
// -------------------------------
export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (
    payload: {
      url: string;
      projectId: string;
      title: string;
      description: string;
      type: string;
    },
    thunkAPI
  ) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 2000);
    });

    const { url, projectId, title, description, type } = payload;

    const newTask = createNewTask(projectId, title, description, type);

    try {
      const addNewTaskResponse: Response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      if (addNewTaskResponse.ok) {
        const addedTask: Task_Type = await addNewTaskResponse.json();
        console.log('Добавлена новая задача:', addedTask);
        return addedTask;
      } else {
        console.log(
          `HTTP Error: ${addNewTaskResponse.status} ${addNewTaskResponse.statusText}`
        );
        thunkAPI.rejectWithValue(
          `HTTP Error: ${addNewTaskResponse.status} ${addNewTaskResponse.statusText}`
        );
      }
    } catch (error: unknown) {
      console.log(`Error: ${(error as Error).message}`);
      thunkAPI.rejectWithValue(`Error: ${(error as Error).message}`);
    }
  }
);

// -------------------------------------
// Изменение статуса задачи:
// -------------------------------------
export const changeTaskStatus = createAsyncThunk(
  'tasks/changeStatus',
  async (payload: { taskId: string; taskStatus: string }, thunkAPI) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 2000);
    });

    const { taskId, taskStatus } = payload;

    try {
      const changeTaskStatusResponse: Response = await fetch(
        `http://localhost:3001/tasks/${taskId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: taskStatus }),
        }
      );

      if (changeTaskStatusResponse.ok) {
        const editedTask: Task_Type = await changeTaskStatusResponse.json();
        console.log('Изменен статус задачи:', editedTask);

        return editedTask;
      } else {
        console.log(
          `HTTP Error: ${changeTaskStatusResponse.status} ${changeTaskStatusResponse.statusText}`
        );

        return thunkAPI.rejectWithValue(
          `HTTP Error: ${changeTaskStatusResponse.status} ${changeTaskStatusResponse.statusText}`
        );
      }
    } catch (error: unknown) {
      console.log(`Error: ${(error as Error).message}`);
      return thunkAPI.rejectWithValue(`Error: ${(error as Error).message}`);
    }
  }
);

// -------------------------------------
// Удаление задачи:
// -------------------------------------
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string, thunkAPI) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 2000);
    });

    try {
      const deleteTaskResponse: Response = await fetch(
        `http://localhost:3001/tasks/${taskId}`,
        {
          method: 'DELETE',
        }
      );

      if (deleteTaskResponse.ok) {
        const deletedTask: Task_Type = await deleteTaskResponse.json();
        console.log('Удалена задача:', deletedTask);
        return deletedTask;
      } else {
        console.log(
          `Delete Task HTTP Error: ${deleteTaskResponse.status} ${deleteTaskResponse.statusText}`
        );
        return thunkAPI.rejectWithValue(
          `Delete Task HTTP Error: ${deleteTaskResponse.status} ${deleteTaskResponse.statusText}`
        );
      }
    } catch (error: unknown) {
      console.log(`Delete Task Error: ${(error as Error).message}`);
      return thunkAPI.rejectWithValue(
        `Delete Task Error: ${(error as Error).message}`
      );
    }
  }
);

const initialState: TasksState_Type = {
  isLoadingViaAPI: false,
  isChangingTaskStatusViaAPI: false,
  isAddingNewTaskViaApi: false,
  selectedTaskId: '',
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    // Удаление задачи (из состояния), когда удален проект:
    // -------------------------------------
    deleteAllProjectTasks: (state, action) => {
      state.tasks = state.tasks.filter((taskInfo) => {
        return taskInfo.projectId !== action.payload;
      });
    },

    // Сохранение id выбранной задачи:
    // -------------------------------------
    setSelectedTaskId: (state, action) => {
      return { ...state, selectedTaskId: action.payload };
    },
  },
  extraReducers: (builder) => {
    // Добавление новой задачи:
    // -------------------------------
    builder.addCase(addNewTask.pending, (state) => {
      state.isAddingNewTaskViaApi = true;
    });

    builder.addCase(addNewTask.fulfilled, (state, action) => {
      if (action.payload?.projectId) {
        state.tasks.push(action.payload);
      }
      state.isAddingNewTaskViaApi = false;
    });

    builder.addCase(addNewTask.rejected, (state) => {
      state.isAddingNewTaskViaApi = false;
    });

    // Загрузка задач выбранного проекта:
    // -------------------------------------
    builder.addCase(loadActiveProjectTasks.pending, (state) => {
      state.isLoadingViaAPI = true;
    });

    builder.addCase(loadActiveProjectTasks.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;
      state.tasks = action.payload;
    });

    builder.addCase(loadActiveProjectTasks.rejected, (state) => {
      state.isLoadingViaAPI = false;
    });

    // Изменение статуса задачи:
    // -------------------------------------
    builder.addCase(changeTaskStatus.pending, (state) => {
      state.isChangingTaskStatusViaAPI = true;
    });

    builder.addCase(changeTaskStatus.fulfilled, (state, action) => {
      const { id, status } = action.payload;

      state.isChangingTaskStatusViaAPI = false;

      const taskToEdit = state.tasks.find((taskInfo) => {
        return taskInfo.id === id;
      });

      if (taskToEdit && status) {
        taskToEdit.status = status; // мутации нет, т.к. immer
      }
    });

    builder.addCase(changeTaskStatus.rejected, (state) => {
      state.isChangingTaskStatusViaAPI = false;
    });

    // Удаление задачи:
    // -------------------------------------
    builder.addCase(deleteTask.pending, (state) => {
      return { ...state, isChangingTaskStatusViaAPI: true };
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      return {
        ...state,
        isChangingTaskStatusViaAPI: false,
        tasks: state.tasks.filter((taskInfo) => {
          return taskInfo.id !== action.payload.id;
        }),
      };
    });

    builder.addCase(deleteTask.rejected, (state) => {
      return { ...state, isChangingTaskStatusViaAPI: false };
    });
  },
});

// Действия:
export const { deleteAllProjectTasks, setSelectedTaskId } = tasksSlice.actions;

// Часть состояния:
export const selectTasksSlice = (state: TasksSlice_Type) => state.tasks;

export default tasksSlice.reducer;

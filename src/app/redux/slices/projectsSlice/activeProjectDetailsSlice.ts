import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Task_Type {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
}

interface ActiveProjectDetailsState_Type {
  id: string | null;
  title: string | null;
  tasks: {
    to_do: Task_Type[];
    in_process: Task_Type[];
    completed: Task_Type[];
  };
}

const initialState: ActiveProjectDetailsState_Type = {
  id: null,
  title: null,
  tasks: {
    to_do: [],
    in_process: [],
    completed: [],
  },
};

const activeProjectDetailsSlice = createSlice({
  name: 'activeProjectDetails',
  initialState: initialState,
  reducers: {
    setActiveProject: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
    },
  },
});

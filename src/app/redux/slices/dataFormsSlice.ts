import { createSlice } from '@reduxjs/toolkit';

interface DataFormsSlice_Type {
  forms: {
    isFormsLayoutVisible: boolean;
    isAddUserFormOpened: boolean;
    isAddTaskFormOpened: boolean;
    isAddProjectFormOpened: boolean;
  };
}

interface DataFormsState_Type {
  isFormsLayoutVisible: boolean;
  isAddUserFormOpened: boolean;
  isAddTaskFormOpened: boolean;
  isAddProjectFormOpened: boolean;
}

const initialState: DataFormsState_Type = {
  isFormsLayoutVisible: false,
  isAddUserFormOpened: false,
  isAddTaskFormOpened: false,
  isAddProjectFormOpened: false,
};

const dataFormsSlice = createSlice({
  name: 'forms',
  initialState: initialState,
  reducers: {
    toggleUserFormVisibility: (state) => {
      return {
        ...state,
        isFormsLayoutVisible: !state.isFormsLayoutVisible,
        isAddUserFormOpened: !state.isAddUserFormOpened,
      };
    },

    toggleTaskFormVisibility: (state) => {
      return {
        ...state,
        isFormsLayoutVisible: !state.isFormsLayoutVisible,
        isAddTaskFormOpened: !state.isAddTaskFormOpened,
      };
    },

    toggleProjectFormVisibility: (state) => {
      return {
        ...state,
        isFormsLayoutVisible: !state.isFormsLayoutVisible,
        isAddProjectFormOpened: !state.isAddProjectFormOpened,
      };
    },
  },
});

// Действия:
export const {
  toggleUserFormVisibility,
  toggleTaskFormVisibility,
  toggleProjectFormVisibility,
} = dataFormsSlice.actions;

// Часть состояния:
export const selectDataFormsSlice = (state: DataFormsSlice_Type) => state.forms;

export default dataFormsSlice.reducer;

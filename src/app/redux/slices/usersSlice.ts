import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { User_Type } from '../../../entities/User_Type.ts';

interface UsersState_Type {
  users: User_Type[];
  userToAdd: User_Type | null;
  isLoadingViaAPI: boolean;
}

interface UsersSlice_Type {
  users: UsersState_Type;
}

const initialState: UsersState_Type = {
  users: [],
  userToAdd: null,
  isLoadingViaAPI: false,
};

// ---------------------------------------
// Загрузка данных пользователей:
// ---------------------------------------
export const fetchUsersData = createAsyncThunk<User_Type[], string>(
  'users/fetchUsers',
  async (url: string, thunkAPI) => {
    // имитация ответа сервера:
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 2000);
    });

    console.log('thunkAPI:', thunkAPI);

    try {
      const response: Response = await fetch(url);

      if (response.ok) {
        const usersData: User_Type[] = await response.json();
        return usersData;
      } else {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as Error).message);
      // throw new Error(`Error: ${(error as Error).message}`);
    }
  }
);

// ---------------------------------------
// Добавление нового пользователя:
// ---------------------------------------
export const addNewUserData = createAsyncThunk(
  'users/addNewUser',
  async (url: string, thunkAPI) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 2000);
    });

    const newUser: User_Type = {
      // ------------------- сюда нужно добавить функцию, которая будет формировать объект с данными нового пользователя
      id: 'Admin',
      name: 'Viktor',
      added_at: '23:45',
    };

    try {
      const response: Response = await fetch(url);

      // Первоначальный запрос к серверу:
      if (!response.ok) {
        return thunkAPI.rejectWithValue(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }
      // Проверка, добавлен ли уже пользователь:
      const usersData: User_Type[] = await response.json();
      const isAlrdyAdded: boolean = usersData.some((userInfo) => {
        return userInfo.id === newUser.id;
      });

      if (isAlrdyAdded) {
        alert(`Пользовтаель с именем ${newUser.name} уже добавлен!`);
        return;
      }

      // Добавление нового пользователя:
      const addNewUserResponse: Response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (addNewUserResponse.ok) {
        const newUserInfo: User_Type = await addNewUserResponse.json();
        console.log('Добавлен новый пользователь:', newUserInfo);

        return newUserInfo;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

// ---------------------------------------
// Слайс состояния:
// ---------------------------------------
const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Загрузка данных пользователей:
    builder.addCase(fetchUsersData.pending, (state) => {
      return { ...state, isLoadingViaAPI: true };
    });

    builder.addCase(fetchUsersData.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.isLoadingViaAPI = false;
        state.users = action.payload;
      }
    });

    builder.addCase(fetchUsersData.rejected, (state) => {
      return { ...state, isLoadingViaAPI: false };
    });

    // Добавление нового пользователя:
    builder.addCase(addNewUserData.pending, (state) => {
      return { ...state, isLoadingViaAPI: true };
    });

    builder.addCase(addNewUserData.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;

      if (action.payload?.name && action.payload?.added_at) {
        state.users.push(action.payload);
      }
    });

    builder.addCase(addNewUserData.rejected, (state) => {
      return { ...state, isLoadingViaAPI: false };
    });
  },
});

// Слайс состояния:
export const selectUsersSlice = (state: UsersSlice_Type) => state.users;
export const selectUsers = (state: UsersSlice_Type) => state.users.users;

export default usersSlice.reducer;

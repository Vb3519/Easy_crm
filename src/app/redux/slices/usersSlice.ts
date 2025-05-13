import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Types:
import { User_Type } from '../../../entities/User_Type.ts';

// Utils:
import createNewUser from '../../../shared/utils/createNewUser.ts';
import {
  fetchData,
  serverDelayImitation,
} from '../../../shared/utils/fetchData.ts';

interface UsersState_Type {
  users: User_Type[];
  isLoadingViaAPI: boolean;
  error: string;
}

interface UsersSlice_Type {
  users: UsersState_Type;
}

const initialState: UsersState_Type = {
  users: [],
  isLoadingViaAPI: false,
  error: '',
};

// ---------------------------------------
// Загрузка данных пользователей:
// ---------------------------------------
export const fetchUsersData = createAsyncThunk<User_Type[], string>(
  'users/fetchUsers',
  async (url: string, thunkAPI) => {
    // имитация ответа сервера:
    await serverDelayImitation(3000);

    try {
      const usersData = (await fetchData(url)) as User_Type[];
      return usersData;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(
        `Пользователи, загрузка: ${(error as Error).message}`
      );
      // throw new Error(`Error: ${(error as Error).message}`);
    }
  }
);

// ---------------------------------------
// Добавление нового пользователя:
// ---------------------------------------
export const addNewUserData = createAsyncThunk(
  'users/addNewUser',
  async (payload: { userName: string; url: string }, thunkAPI) => {
    await serverDelayImitation(2000);

    const { userName, url } = payload;

    // Создание нового пользователя:
    const newUser: User_Type = createNewUser(userName);

    try {
      // Запрос к серверу и проверка, добавлен ли уже пользователь:
      const usersData = (await fetchData(url)) as User_Type[];

      const isAlrdyAdded: boolean = usersData.some((userInfo) => {
        return userInfo.name === newUser.name;
      });

      if (isAlrdyAdded) {
        alert(`Пользователь с именем ${newUser.name} уже добавлен!`);
        return;
      }

      // Добавление нового пользователя:
      const addNewUserResponse: Response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (addNewUserResponse.ok) {
        const newUserInfo: User_Type = await addNewUserResponse.json();
        console.log('Добавлен новый пользователь:', newUserInfo);

        return newUserInfo;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        `Добавление пользователя: ${(error as Error).message}`
      );
    }
  }
);

// ---------------------------------------
// Удалить пользователя:
// ---------------------------------------
export const deleteUserData = createAsyncThunk(
  'users/delete',
  async (userId: string, thunkAPI) => {
    await serverDelayImitation(1000);

    const urlWithId: string = `http://localhost:3001/users/${userId}`;
    // const urlWithId: string = `https://easy-crm-3ii3.onrender.com/users/${userId}`;

    try {
      const response: Response = await fetch(urlWithId, {
        method: 'DELETE',
      });

      if (response.ok) {
        const deletedUserData: User_Type = await response.json();
        return deletedUserData;
      } else {
        console.log(`HTTP Error: ${response.status} ${response.statusText}`);
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }
    } catch (error: unknown) {
      console.log(`Error: ${(error as Error).message}`);
      return thunkAPI.rejectWithValue(
        `Удаление пользователя: ${(error as Error).message}`
      );
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
      return { ...state, isLoadingViaAPI: true, error: '' };
    });

    builder.addCase(fetchUsersData.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.isLoadingViaAPI = false;
        state.users = action.payload;
      }
    });

    builder.addCase(fetchUsersData.rejected, (state, action) => {
      return {
        ...state,
        isLoadingViaAPI: false,
        error: action.payload as string,
      };
    });

    // Добавление нового пользователя:
    builder.addCase(addNewUserData.pending, (state) => {
      return { ...state, isLoadingViaAPI: true, error: '' };
    });

    builder.addCase(addNewUserData.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;

      if (action.payload?.name && action.payload?.added_at) {
        state.users.push(action.payload);
      }
    });

    builder.addCase(addNewUserData.rejected, (state, action) => {
      return {
        ...state,
        isLoadingViaAPI: false,
        error: action.payload as string,
      };
    });

    // Удаление пользователя:
    builder.addCase(deleteUserData.pending, (state) => {
      state.isLoadingViaAPI = true;
      state.error = '';
    });

    builder.addCase(deleteUserData.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;

      state.users = state.users.filter((userInfo: User_Type) => {
        return userInfo.id !== action.payload.id;
      });
    });

    builder.addCase(deleteUserData.rejected, (state, action) => {
      state.isLoadingViaAPI = false;
      state.error = action.payload as string;
    });
  },
});

// Слайс состояния:
export const selectUsersSlice = (state: UsersSlice_Type) => state.users;
export const selectUsers = (state: UsersSlice_Type) => state.users.users;

export default usersSlice.reducer;

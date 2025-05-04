import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// UI:
import Button from '../../../shared/ui/Button';
// Types:
import { User_Type } from '../../../entities/User_Type.ts';

import UsersList from './UsersList';
import {
  selectUsersSlice,
  selectUsers,
  fetchUsersData,
  addNewUserData,
} from '../../redux/slices/usersSlice.ts';

import { AppDispatch } from '../../redux/store.ts';

const UsersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const usersSliceState = useSelector(selectUsersSlice);
  const users: User_Type[] = useSelector(selectUsers);
  console.log('Текущий список пользователей:', users);

  const users_URL: string = 'http://localhost:3001/users';
  // const users_URL: string = 'https://easy-crm-3ii3.onrender.com/users';

  // Загрузка данных пользователей:
  const handleFetchUsersData = () => {
    dispatch(fetchUsersData(users_URL));
  };

  // Добавление нового пользователя:
  const handleAddNewUser = () => {
    dispatch(addNewUserData(users_URL));
  };

  return (
    <div className="p-2 flex flex-col gap-3 bg-[white] xs:p-4 xs:rounded-xl xl:flex-grow container-shadow">
      <h2 className="font-semibold text-2xl">Пользователи:</h2>

      <UsersList users={users} />
      <Button
        disabled={usersSliceState.isLoadingViaAPI}
        className="p-3 text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
        children="Загрузить пользователей"
        onClick={() => {
          console.log('Загружаем данные пользователей');
          handleFetchUsersData();
        }}
      />
      <Button
        disabled={usersSliceState.isLoadingViaAPI}
        className="p-3 text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
        children="Добавить Пользователя"
        onClick={() => {
          handleAddNewUser();
        }}
      />
    </div>
  );
};

export default UsersPage;

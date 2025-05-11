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
} from '../../redux/slices/usersSlice.ts';

import { toggleUserFormVisibility } from '../../redux/slices/dataFormsSlice.ts';

import { AppDispatch } from '../../redux/store.ts';

const UsersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const usersSliceState = useSelector(selectUsersSlice);
  const users: User_Type[] = useSelector(selectUsers);

  const users_URL: string = 'http://localhost:3001/users';
  // const users_URL: string = 'https://easy-crm-3ii3.onrender.com/users';

  // Загрузка данных пользователей:
  const handleFetchUsersData = () => {
    dispatch(fetchUsersData(users_URL));
  };

  // Открыть форму для добавления нового пользователя:
  const handleAddNewUserFormVisibility = () => {
    dispatch(toggleUserFormVisibility());
  };

  useEffect(() => {
    if (users.length === 0) {
      handleFetchUsersData();
    }
  }, []);

  return (
    <div className="p-2 flex flex-col gap-3 bg-[white] xs:p-4 xs:rounded-xl xl:flex-grow container-shadow">
      <h2 className="font-semibold md:text-lg">Пользователи:</h2>

      <UsersList users={users} />

      <Button
        disabled={usersSliceState.isLoadingViaAPI}
        className="p-3 text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
        children="Добавить Пользователя"
        onClick={() => {
          handleAddNewUserFormVisibility();
          console.log('Форма для добавления нового пользователя открыта');
        }}
      />
    </div>
  );
};

export default UsersPage;

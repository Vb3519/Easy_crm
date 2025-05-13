import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// UI:
import Button from '../../../shared/ui/Button';

// Types:
import { User_Type } from '../../../entities/User_Type.ts';
import { AppDispatch } from '../../redux/store.ts';

// State:
import {
  selectUsersSlice,
  selectUsers,
  fetchUsersData,
} from '../../redux/slices/usersSlice.ts';
import { toggleUserFormVisibility } from '../../redux/slices/dataFormsSlice.ts';

import UsersList from './UsersList';

const UsersPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const usersSliceState = useSelector(selectUsersSlice);
  const users: User_Type[] = useSelector(selectUsers);

  // const users_URL: string = 'http://localhost:3001/users';
  const users_URL: string = 'https://easy-crm-3ii3.onrender.com/users';

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
      <div className="flex items-center gap-2">
        <h2 className="font-semibold md:text-lg">Пользователи:</h2>
        {usersSliceState.isLoadingViaAPI && users.length > 0 ? (
          <div className="w-5 h-5 border-4 border-t-transparent border-blue-300 rounded-full animate-spin"></div>
        ) : null}
      </div>

      <UsersList users={users} />

      <Button
        disabled={usersSliceState.isLoadingViaAPI}
        className={`p-3 text-sm font-semibold rounded-lg cursor-pointe text-[whitesmoke] ${
          usersSliceState.isLoadingViaAPI
            ? 'bg-[#c3c3c3]'
            : 'bg-blue-500 transition duration-200 ease-in hover:shadow-[0px_0px_10px_rgba(0,0,0,0.4)]'
        }`}
        children="Добавить Пользователя"
        onClick={() => {
          handleAddNewUserFormVisibility();
        }}
      />
    </div>
  );
};

export default UsersPage;

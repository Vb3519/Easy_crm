import { useState } from 'react';
import { useSelector } from 'react-redux';

// React-icons:
import { IoPersonCircleOutline } from 'react-icons/io5';

// Types:
import { User_Type } from '../../../entities/User_Type.ts';

// State:
import { selectUsersSlice } from '../../redux/slices/usersSlice.ts';

import Loader from '../../../shared/components/Loader.tsx';
import User from './User';

interface UsersList_Props {
  users: User_Type[];
}

const UsersList: React.FC<UsersList_Props> = ({ users }) => {
  const [openedUserMenuId, setOpenedUserMenuId] = useState<string | null>(null);

  const usersSliceState = useSelector(selectUsersSlice);
  const isUsersDataLoading: boolean = usersSliceState.isLoadingViaAPI;

  const handleSetOpenedUserMenuId = (id: string) => {
    setOpenedUserMenuId((prevId) => {
      return prevId === id ? null : id;
    });
  };

  return (
    <ul className="h-[215px] flex flex-col gap-1 overflow-y-auto">
      {users.length > 0 ? (
        users.map((userInfo) => {
          return (
            <User
              key={userInfo.id}
              userInfo={userInfo}
              isMenuOpened={openedUserMenuId === userInfo.id}
              openOptionsMenu={handleSetOpenedUserMenuId}
            />
          );
        })
      ) : (
        <div className="m-auto flex flex-col gap-3 items-center">
          {isUsersDataLoading ? (
            <Loader />
          ) : (
            <>
              <IoPersonCircleOutline className="text-[150px] text-[#e2e2e2]" />
              <h2 className="text-center text-sm md:text-[16px]">
                Список пользователей пуст
              </h2>
            </>
          )}
        </div>
      )}
    </ul>
  );
};

export default UsersList;

import { IoPersonSharp } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa6';

import { useState, useEffect } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';

import { User_Type } from '../../../entities/User_Type.ts';
import User from './User';

interface UsersList_Props {
  users: User_Type[];
}

const UsersList: React.FC<UsersList_Props> = ({ users }) => {
  const [openedUserMenuId, setOpenedUserMenuId] = useState<string | null>(null);

  const handleSetOpenedUserMenuId = (id: string) => {
    setOpenedUserMenuId((prevId) => {
      return prevId === id ? null : id;
    });
  };

  return (
    <ul className="flex flex-col gap-1">
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
        <div className="flex flex-col gap-3 items-center">
          <IoPersonCircleOutline className="text-[150px] text-[#e2e2e2]" />
          <h2 className="text-center">Список пользователей пуст</h2>
        </div>
      )}
    </ul>
  );
};

export default UsersList;

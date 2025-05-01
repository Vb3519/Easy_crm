import { useState, useEffect } from 'react';
import { AiOutlineProduct } from 'react-icons/ai';

import { User_Type } from '../../../entities/User_Type.ts';
import User from './User';

interface UsersList_Props {
  users: User_Type[];
}

const UsersList: React.FC<UsersList_Props> = ({ users }) => {
  return (
    <ul className="flex flex-col gap-1">
      {users.length > 0 ? (
        users.map((userInfo) => {
          return <User key={userInfo.id} userInfo={userInfo} />;
        })
      ) : (
        <div className="flex flex-col gap-3 items-center">
          <AiOutlineProduct className="text-[150px] text-[#e2e2e2]" />
          <h2 className="text-center">Список пользователей пуст</h2>
        </div>
      )}
    </ul>
  );
};

export default UsersList;

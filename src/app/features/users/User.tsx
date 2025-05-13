import { useDispatch, useSelector } from 'react-redux';

// React-icons:
import { IoPersonSharp } from 'react-icons/io5';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

// Types:
import { User_Type } from '../../../entities/User_Type.ts';
import { AppDispatch } from '../../redux/store.ts';

// State:
import {
  deleteUserData,
  selectUsersSlice,
} from '../../redux/slices/usersSlice.ts';

interface User_Props {
  userInfo: User_Type;
  isMenuOpened: boolean;
  openOptionsMenu: (id: string) => void;
}

const User: React.FC<User_Props> = ({
  userInfo,
  isMenuOpened,
  openOptionsMenu,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const usersSliceState = useSelector(selectUsersSlice);

  // Удаление пользователя:
  const handleDeleteUserData = (userId: string) => {
    dispatch(deleteUserData(userId));
  };

  return (
    <li className="text-sm relative p-2 flex items-center gap-4 border-2 border-gray-200 rounded-lg md:text-[16px]">
      <IoPersonSharp className="text-[30px] text-[#cccccc]" title="Аватар" />
      <div>
        <p>{userInfo.name}</p>
        <p>{userInfo.added_at}</p>
      </div>
      <button
        disabled={usersSliceState.isLoadingViaAPI}
        className="ml-auto"
        onClick={() => {
          openOptionsMenu(userInfo.id);
        }}
      >
        {isMenuOpened ? (
          <FaChevronUp className="mr-2 cursor-pointer transition duration-200 ease-in hover:text-blue-500" />
        ) : (
          <FaChevronDown className="mr-2 cursor-pointer transition duration-200 ease-in hover:text-blue-500" />
        )}
      </button>
      {isMenuOpened ? (
        <ul className="absolute z-10 top-[45px] right-[10px] p-3 flex flex-col items-center gap-2 border-1 border-gray-200 rounded-lg bg-[white] elem-shadow">
          <li
            className="cursor-pointer transition duration-200 ease-in hover:text-blue-500"
            onClick={() => {
              handleDeleteUserData(userInfo.id);
              openOptionsMenu(userInfo.id);
            }}
          >
            Удалить
          </li>
          <li className="cursor-pointer transition duration-200 ease-in hover:text-blue-500">
            Изменить имя
          </li>
        </ul>
      ) : (
        ''
      )}
    </li>
  );
};

export default User;

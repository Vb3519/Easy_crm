import { IoPersonSharp } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa6';

import { User_Type } from '../../../entities/User_Type.ts';

interface User_Props {
  userInfo: User_Type;
}

const User: React.FC<User_Props> = ({ userInfo }) => {
  return (
    <li className="p-2 flex items-center gap-4 border-2 border-gray-200 rounded-lg">
      <IoPersonSharp className="text-[30px] text-[#cccccc]" title="Аватар" />
      <div>
        <p>{userInfo.name}</p>
        <p>{userInfo.added_at}</p>
      </div>
      <FaChevronDown className="ml-auto mr-2" />
    </li>
  );
};

export default User;

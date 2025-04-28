import User from './User';
import { UserData_Type } from '../../App';
interface UsersList_Type {
  usersData: UserData_Type[];
}

const UsersList: React.FC<UsersList_Type> = ({ usersData }) => {
  return (
    <ul className="w-full flex flex-col gap-3">
      {usersData.map((userInfo) => {
        return <User key={userInfo.id} userInfo={userInfo} />;
      })}
    </ul>
  );
};

export default UsersList;

import User from './User';
import { UserInfo_Type } from './User';

// Компонент принимает объект пропсов в котором есть ключ со значением "usersData" и у него тип UserInfo_Type[];
interface UserList_Type {
  usersData: UserInfo_Type[];
}

const UsersList: React.FC<UserList_Type> = ({ usersData }) => {
  return (
    <ul className="w-full flex flex-col gap-3">
      {usersData.map((userInfo) => {
        return (
          <User
            key={userInfo.id}
            id={userInfo.id}
            name={userInfo.name}
            email={userInfo.email}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;

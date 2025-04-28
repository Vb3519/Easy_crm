interface UserInfo_Type {
  userInfo: { id: string; name: string; email: string };
}

const User: React.FC<UserInfo_Type> = ({ userInfo }) => {
  return (
    <li className="p-3 flex flex-col gap-2 rounded-xl bg-blue-300">
      <h4>Id: {userInfo.id}</h4>
      <p>Имя: {userInfo.name}</p>
      <p>Эл. почта: {userInfo.email}</p>
    </li>
  );
};

export default User;

export interface UserInfo_Type {
  id: string;
  name: string;
  email: string;
}

const User = (props: UserInfo_Type) => {
  const { id, name, email } = props;

  return (
    <li className="p-3 flex flex-col gap-3 rounded-xl bg-blue-100">
      <h4 className="font-semibold">id: {id}</h4>
      <p>
        <span className="font-semibold">Name:</span> {name}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {email}
      </p>
    </li>
  );
};

export default User;

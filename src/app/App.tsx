import { useState, useEffect } from 'react';

interface UserInfo_Type {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  const [users, setUsers] = useState<UserInfo_Type[]>([]);

  const getUsersInfo = async () => {
    try {
      const response: Response = await fetch('http://localhost:3001/users');

      if (response.ok) {
        const usersData: UserInfo_Type[] = await response.json();
        setUsers(usersData);
      } else {
        // имитация ошибки загрузки:
        console.log(`HTML error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log('HTML Error:', (error as Error).message);
    }
  };

  useEffect(() => {
    getUsersInfo();
  }, []);

  if (users.length > 0) {
    return (
      <div>
        {users.map((userInfo) => {
          return (
            <div key={userInfo.id}>
              <h3>{userInfo.id}</h3>
              <p>{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>Ошибка загрузки :с</div>;
  }
};

export default App;

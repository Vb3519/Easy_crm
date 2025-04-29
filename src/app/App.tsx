import { useState, useEffect } from 'react';

// UI:
import Button from '../shared/ui/Button';

import UsersList from './features/users/UsersList';

export interface UserData_Type {
  id: string;
  name: string;
  email: string;
}

// Эту функцию можно вынести в отдельный модуль:
const fetchData = async (url: string) => {
  // имитация загрузки:
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('promise fulfilled');
    }, 3000);
  });

  try {
    const response: Response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      console.log('HTTP Error:', `${response.status} ${response.statusText}`);
    }
  } catch (error: unknown) {
    console.log('HTTP Error:', (error as Error).message);
  }
};

const App = () => {
  const [usersData, setUsersData] = useState<UserData_Type[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  const USERS_URL: string = 'http://localhost:3001/users';

  const handleFetchData = async (url: string) => {
    if (usersData.length > 0) {
      alert('Данные пользователей уже загружены!');
      return;
    }

    console.log('Загрузка пользователей');
    setIsDataLoading(true); // блокировка кнопки при загрузке

    const fetchedUsersData: UserData_Type[] = await fetchData(url);
    setIsDataLoading(false);

    if (fetchedUsersData.length > 0) {
      setUsersData((prevData) => {
        return [...prevData, ...fetchedUsersData];
      });
    }
  };

  useEffect(() => {
    console.log('usersData:', usersData);
  }, [usersData]);

  // Добавление пользователя:
  // ------------------------------
  const addNewUser = async () => {
    const newUser: UserData_Type = {
      name: 'Viktor',
      id: 'Admin',
      email: 'Vb415@bk.ru',
    };

    const currentUsersDataBase = await fetchData(USERS_URL);
    const isAlrdyInDatabase: boolean = currentUsersDataBase.some(
      (userInfo: any) => {
        return userInfo.id === newUser.id;
      }
    );

    if (isAlrdyInDatabase) {
      alert('Пользователь уже добавлен в базу данных!');
      return;
    }

    try {
      const response: Response = await fetch(USERS_URL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();

        setUsersData((prevData) => {
          return [...prevData, newUser];
        });
        console.log('обновленные данные:', data);
      } else {
        console.log('Ошибка на сервере:', response.status);
      }
    } catch (error: unknown) {
      console.log('HTTP Error:', (error as Error).message);
    }
  };

  return (
    <>
      <div className="p-3 flex flex-col gap-4 items-center">
        {isDataLoading ? (
          <h3 className="font-semibold text-lg">Идет загрузка данных...</h3>
        ) : (
          ''
        )}
        {usersData.length > 0 ? (
          <UsersList usersData={usersData} />
        ) : (
          <h3 className="font-semibold text-lg">
            Данные пользователей не загружены
          </h3>
        )}
      </div>
      <div className="width-full flex gap-3 flex-wrap">
        <Button
          type="button"
          children="Загрузить данные пользователей"
          className="bg-amber-300"
          onClick={() => {
            handleFetchData(USERS_URL);
          }}
          disabled={isDataLoading}
        />
        <Button
          type="button"
          children="Добавить пользователя"
          className="bg-blue-300"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation(); // Останавливаем распространение события
            addNewUser();
            console.log('Добавление пользователя');
          }}
        />
      </div>
    </>
  );
};

export default App;

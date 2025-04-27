import { useState, useEffect, Suspense, lazy } from 'react';

// UI:
import Button from '../shared/ui/Button';

import UsersList from './features/users/UsersList';

import { UserInfo_Type } from './features/users/User';

const App = () => {
  const [usersData, setUsersData] = useState<UserInfo_Type[]>([]);
  const [isUsersDataLoading, setIsUsersDataLoading] = useState<boolean>(false);

  const handleLoadUsersData = async () => {
    if (usersData.length > 0) {
      alert('Данные пользователей уже загружены!');
      return;
    }
    console.log('Скачиваем данные пользователей');

    try {
      // кнопка блокируется на время загрузки
      setIsUsersDataLoading(true);

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('Имитация загрузки завершена');
        }, 3000);
      });
      console.log('Имитация загрузки завершена');

      // служебный объект-промис, содержащий данные (распаристь)
      const response: Response = await fetch('http://localhost:3001/users');

      if (response.ok) {
        const usersData: UserInfo_Type[] = await response.json(); // объект промис с данными (распаристь)

        setUsersData((prevData) => {
          return [...prevData, ...usersData];
        });

        console.log('usersData:', usersData);
      } else {
        console.log('HTTP Error:', response.status, response.statusText);
      }
    } catch (error: unknown) {
      // Приведение типов:
      console.log('Error:', (error as Error).message);
    } finally {
      // Разблокировка кнопки при завершении загрузки (успешном или нет)
      setIsUsersDataLoading(false);
    }
  };

  const LoadingUsersDataFallback = () => {
    return <h3>Идет загрузка данных...</h3>;
  };

  return (
    <div className="w-full p-3 flex flex-col gap-2 items-center">
      {usersData.length > 0 ? (
        <Suspense fallback={<LoadingUsersDataFallback />}>
          <UsersList usersData={usersData} />
        </Suspense>
      ) : (
        <h3 className="font-semibold text-lg text-center">
          Сейчас данные о пользователях не загружены
        </h3>
      )}

      <div className="p-2 flex gap-3 flex-wrap">
        <Button
          disabled={isUsersDataLoading}
          className="font-semibold text-sm p-2 bg-amber-300 rounded-md cursor-pointer"
          onClick={() => {
            handleLoadUsersData();
          }}
          children="Скачать данные"
        />
        <Button
          className="font-semibold text-sm p-2 bg-blue-300 rounded-md cursor-pointer"
          onClick={() => {
            console.log('Добавляем данные пользователя');
          }}
          children="Добавить пользователя"
        />
      </div>
    </div>
  );
};

export default App;

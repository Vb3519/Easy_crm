import { useState, useEffect } from 'react';
import { SiCivicrm } from 'react-icons/si';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { PiGearSix } from 'react-icons/pi';
import { IoIosNotificationsOutline } from 'react-icons/io';

// UI:
import Button from '../shared/ui/Button';

import ProjectsPage from './features/projects/ProjectsPage';
import UsersPage from './features/users/UsersPage';

const App = () => {
  return (
    <div className="flex flex-col gap-4 bg-[#F5F5F5]">
      <header className="p-2 flex gap-2 font-[inter] flex-wrap justify-between">
        <div className="flex gap-3 items-center">
          <div className="w-fit p-2 rounded-xl bg-blue-500 cursor-pointer">
            <SiCivicrm className="text-[30px] text-[whitesmoke]" />
          </div>
          <h1 className="font-bold text-xl">
            Easy <span className="text-blue-500">CRM</span>
          </h1>
        </div>
        <div className="flex gap-6 items-center justify-between">
          <div className="flex gap-2 items-center">
            <IoPersonCircleOutline
              className="text-[45px] text-[#cccccc]"
              title="Аватар"
            />
            <p className="font-semibold text-sm" title="Имя пользователя">
              User Name
            </p>
          </div>
          <ul className="flex gap-2">
            <li>
              <PiGearSix
                className="text-[25px] cursor-pointer"
                title="Настройки"
              />
            </li>
            <li>
              <IoIosNotificationsOutline
                className="text-[25px] cursor-pointer"
                title="Уведомления"
              />
            </li>
          </ul>
        </div>
      </header>
      <main className="font-[inter]">
        <div className="p-2 flex gap-2">
          <Button
            className="bg-blue-500 text-[whitesmoke]"
            children="Проекты"
            onClick={() => {
              console.log('Открываем проекты');
            }}
          />
          <Button
            className="bg-blue-500 text-[whitesmoke]"
            children="Пользователи"
            onClick={() => {
              console.log('Открываем список пользователей');
            }}
          />
        </div>
        <UsersPage />
        <ProjectsPage />
      </main>
      <footer></footer>
    </div>
  );
};

export default App;

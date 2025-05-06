import { useState, useEffect } from 'react';
import { SiCivicrm } from 'react-icons/si';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { PiGearSix } from 'react-icons/pi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FaGlobe } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';

// UI:
import Button from '../shared/ui/Button';

import ActiveProjectDetails from './features/projects/ActiveProjectDetails';
import GeneralProjectsList from './features/projects/GeneralProjectsList';

import UsersPage from './features/users/UsersPage';

const App = () => {
  const [isProjectsPageOpened, setIsProjectsPageOpened] =
    useState<boolean>(true);
  const [isUsersPageOpened, setIsUsersPageOpened] = useState<boolean>(true);

  const togglePropjectsPageVisibility = () => {
    setIsProjectsPageOpened(!isProjectsPageOpened);
  };

  const toggleUsersPageVisibility = () => {
    setIsUsersPageOpened(!isUsersPageOpened);
  };

  return (
    <div className="h-screen flex flex-col gap-4 bg-[#F5F5F5] overflow-y-auto">
      {/* ------------------------------ ХЕАДЕР: ------------------------------ */}
      <header className="p-2 flex gap-2 flex-grow font-[inter] flex-wrap justify-between xs:px-4 lg:px-16">
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
      {/* ------------------------------ МЕИН: ------------------------------ */}
      <main className="font-[inter] flex flex-col gap-4 md:flex-row md:px-4 md:gap-4 lg:px-16">
        <div className="p-2 flex gap-2 xs:px-4 md:hidden">
          <Button
            className="bg-blue-500 text-[whitesmoke]"
            children="Проекты"
            onClick={() => {
              togglePropjectsPageVisibility();
              console.log('Открываем проекты');
            }}
          />
          <Button
            className="bg-blue-500 text-[whitesmoke]"
            children="Пользователи"
            onClick={() => {
              toggleUsersPageVisibility();
              console.log('Открываем список пользователей');
            }}
          />
        </div>

        <div className="flex flex-col gap-4 xs:px-4 md:basis-[40%] md:px-0 xl:basis-[25%]">
          {isUsersPageOpened ? <UsersPage /> : null}
          {isProjectsPageOpened ? <GeneralProjectsList /> : null}
        </div>

        <ActiveProjectDetails />
      </main>

      {/* ------------------------------ ФУТЕР: ------------------------------ */}
      <footer className="font-[inter] p-2 flex flex-col gap-4 flex-grow xs:px-4 lg:px-16">
        <div className="flex flex-col gap-2 xs:flex-row xs:items-center">
          <h2 className="font-bold text-xl text-gray-300">Easy CRM</h2>
          <a
            href="#"
            className="cursor-pointer transition duration-200 ease-in hover:text-blue-500 xs:pt-0.5"
          >
            Политика конфиденциальности
          </a>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <ul className="flex gap-2 items-center">
            <li>
              <FaGlobe className="text-[#9c9c9c] text-xl" />
            </li>
            <li className="cursor-pointer transition duration-200 ease-in hover:text-blue-500">
              Ru
            </li>
            <li className="cursor-pointer transition duration-200 ease-in hover:text-blue-500">
              En
            </li>
          </ul>
          <div className="flex gap-2 items-center">
            <MdOutlineEmail className="text-[#9c9c9c] text-xl" />
            <span className="cursor-pointer transition duration-200 ease-in hover:text-blue-500">
              vb415@bk.ru
            </span>
          </div>
          <ul className="flex gap-2">
            <li className="p-2 rounded-[50%] bg-green-700 text-[whitesmoke] text-xl cursor-pointer transition duration-200 ease-in hover:shadow-[0px_0px_10px_rgba(0,0,0,0.4)]">
              <FaWhatsapp />
            </li>
            <li className="p-2 rounded-[50%] bg-blue-500 text-[whitesmoke] text-xl cursor-pointer transition duration-200 ease-in hover:shadow-[0px_0px_10px_rgba(0,0,0,0.4)]">
              <FaTelegramPlane />
            </li>
          </ul>
          <span className="font-semibold text-gray-300 sm:ml-auto">
            by Bordyugov Viktor 2025
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;

import { useState } from 'react';
import { useSelector } from 'react-redux';

// React-icons:
import { SiCivicrm } from 'react-icons/si';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { PiGearSix } from 'react-icons/pi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FaGlobe } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';

import { selectProjectsSlice } from './redux/slices/projectsSlice/projectsSlice';

// Лейаут форм для добавления данных:
import FormsLayout from './features/forms/FormsLayout';
import { selectDataFormsSlice } from './redux/slices/dataFormsSlice';

// UI:
import Button from '../shared/ui/Button';

import ActiveProjectDetails from './features/projects/ActiveProjectDetails';
import EmptyProjectDetails from './features/projects/EmptyProjectDetails';
import GeneralProjectsList from './features/projects/GeneralProjectsList';

import UsersPage from './features/users/UsersPage';

const App = () => {
  const formsStateSlice = useSelector(selectDataFormsSlice);

  const projectsStateSlice = useSelector(selectProjectsSlice);
  const selectedProjectId: string | null = projectsStateSlice.selectedProjectId;

  const [isProjectsPageOpened, setIsProjectsPageOpened] =
    useState<boolean>(true);
  const [isUsersPageOpened, setIsUsersPageOpened] = useState<boolean>(true);

  // Открыть / закрыть список проектов или пользователей:
  // ----------------------------------------------------------
  const togglePropjectsPageVisibility = () => {
    setIsProjectsPageOpened(!isProjectsPageOpened);
  };

  const toggleUsersPageVisibility = () => {
    setIsUsersPageOpened(!isUsersPageOpened);
  };

  return (
    <div className="h-screen flex flex-col justify-between gap-4 bg-[#F5F5F5] overflow-y-auto">
      {/* ------------------------------ HEADER: ------------------------------ */}
      <header className="p-2 flex gap-2 font-[inter] flex-wrap justify-between xs:px-4 lg:px-8">
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
            <p
              className="font-semibold text-sm md:text-[16px]"
              title="Имя пользователя"
            >
              User Name
            </p>
          </div>

          <ul className="flex gap-2">
            <li>
              <PiGearSix
                className="text-[25px] cursor-pointer transition duration-200 ease-in hover:text-blue-500"
                title="Настройки"
              />
            </li>
            <li>
              <IoIosNotificationsOutline
                className="text-[25px] cursor-pointer transition duration-200 ease-in hover:text-blue-500"
                title="Уведомления"
              />
            </li>
          </ul>
        </div>
      </header>

      {/* ------------------------------ MAIN: ------------------------------ */}
      <main className="mb-auto font-[inter] flex flex-col gap-4 md:flex-row md:px-4 md:gap-4 lg:px-8">
        <div className="p-2 flex gap-2 xs:px-4 md:hidden">
          <Button
            className="bg-blue-500 text-[whitesmoke] transition duration-200 ease-in hover:shadow-[0px_0px_10px_rgba(0,0,0,0.4)]"
            children="Проекты"
            onClick={() => {
              togglePropjectsPageVisibility();
            }}
          />
          <Button
            className="bg-blue-500 text-[whitesmoke] transition duration-200 ease-in hover:shadow-[0px_0px_10px_rgba(0,0,0,0.4)]"
            children="Пользователи"
            onClick={() => {
              toggleUsersPageVisibility();
            }}
          />
        </div>

        <section className="flex flex-col gap-4 xs:px-4 md:basis-[45%] md:px-0 xl:basis-[30%] 2xl:basis-[20%]">
          {isUsersPageOpened ? <UsersPage /> : null}
          {isProjectsPageOpened ? <GeneralProjectsList /> : null}
        </section>

        {selectedProjectId ? <ActiveProjectDetails /> : <EmptyProjectDetails />}
      </main>

      {/* ------------------------------ FOOTER: ------------------------------ */}
      <footer className="font-[inter] text-sm p-2 flex flex-col gap-4 xs:px-4 lg:px-8 md:text-[16px]">
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

      {formsStateSlice.isFormsLayoutVisible ? <FormsLayout /> : null}
    </div>
  );
};

export default App;

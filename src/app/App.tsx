import { useState, useEffect } from 'react';
import { SiCivicrm } from 'react-icons/si';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { IoPersonSharp } from 'react-icons/io5';
import { PiGearSix } from 'react-icons/pi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { FaChevronDown } from 'react-icons/fa6';
import { GrProjects } from 'react-icons/gr';
import { BsThreeDotsVertical } from 'react-icons/bs';

// UI:
import Button from '../shared/ui/Button';

interface Project_Type {
  id: string;
  name: string;
}

const App = () => {
  const [projects, setProjects] = useState<Project_Type[]>([]);
  const fetch_URL: string = 'http://localhost:3001/projects';

  // Скачивание данных по проектам, чтобы рендер бился с состоянием:
  const fetchProjectsData = async (url: string) => {
    console.log('Загрузка проектов');

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 3000);
    });

    try {
      const response: Response = await fetch(url);

      if (response.ok) {
        const projectsData: Project_Type[] = await response.json();

        setProjects((prevData) => {
          return [...prevData, ...projectsData];
        });
        console.log('Текущие проекты:', projectsData);
      } else {
        console.log(`HTTP Error: ${response.status} ${response.statusText}`);
      }
    } catch (error: unknown) {
      console.log('Error:', (error as Error).message);
    }
  };

  const handleFetchProjectsData = (url: string) => {
    fetchProjectsData(url);
  };

  // Добавление проекта:
  const addNewProject = async () => {
    const newProject: Project_Type = {
      id: '4',
      name: 'Название проекта №4',
    };

    try {
      const response: Response = await fetch(fetch_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const projectData = await response.json();
        console.log('После добавления проекта:', projectData);

        setProjects((prevData) => {
          return [...prevData, projectData];
        });
      } else {
        console.log(`HTTP Error: ${response.status} ${response.statusText}`);
      }
    } catch (error: unknown) {
      console.log('HTTP Error:', (error as Error).message);
    }
  };

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

        <div className="mt-3 p-2 flex flex-col gap-3 bg-[white]">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-2xl">Ваши проекты:</h2>

            <ul className="flex flex-col gap-1">
              {projects.length > 0
                ? projects.map((projectInfo) => {
                    return (
                      <Project key={projectInfo.id} projectInfo={projectInfo} />
                    );
                  })
                : 'Данные по проектам не загружены'}
            </ul>
            <Button
              className="p-3 text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
              children="Скачать проекты"
              onClick={() => {
                handleFetchProjectsData(fetch_URL);
                console.log('Скачиваем проекты');
              }}
            />
            <Button
              className="p-3 text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
              children="Добавить Проект"
              onClick={() => {
                addNewProject();
                console.log('Добавляем проект');
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg leading-[25px]">
              Название очень перспективного проекта
            </h3>
            <nav>
              <ul className="flex gap-3">
                <li className="cursor-pointer">Задачи</li>
                <li className="cursor-pointer">В разработке</li>
              </ul>
            </nav>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <span className="w-3 h-3 bg-orange-700 rounded-[50%]"></span>
                <h5>К выполнению</h5>
                <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
                  3
                </span>
                <FaChevronDown className="ml-auto" />
              </div>
              <ul>
                <li className="flex flex-col gap-4 items-center justify-center">
                  <p className="font-semibold text-sm text-center">
                    В данный момент список Ваш задач "К выполению" пуст
                  </p>
                  <RxQuestionMarkCircled className="text-[150px] text-[#e2e2e2]" />
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <span className="w-3 h-3 bg-blue-700 rounded-[50%]"></span>
                <h5>В процессе</h5>
                <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
                  1
                </span>
                <FaChevronDown className="ml-auto" />
              </div>
              <ul>
                <li className="flex flex-col gap-4 items-center justify-center">
                  <p className="font-semibold text-sm text-center">
                    В данный момент список Ваш задач "В процессе" пуст
                  </p>
                  <RxQuestionMarkCircled className="text-[150px] text-[#e2e2e2]" />
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <span className="w-3 h-3 bg-green-700 rounded-[50%]"></span>
                <h5>Завершены</h5>
                <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
                  5
                </span>
                <FaChevronDown className="ml-auto" />
              </div>
              <ul>
                <li className="flex flex-col gap-4 items-center justify-center">
                  <p className="font-semibold text-sm text-center">
                    В данный момент Ваш список завершенных задач пуст
                  </p>
                  <RxQuestionMarkCircled className="text-[150px] text-[#e2e2e2]" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-3 p-2 flex flex-col gap-3 bg-[white]">
          <h2 className="font-semibold text-2xl">Пользователи:</h2>
          <ul className="flex flex-col gap-1">
            <li className="p-2 flex items-center gap-4 border-2 border-gray-200 rounded-lg">
              <IoPersonSharp
                className="text-[30px] text-[#cccccc]"
                title="Аватар"
              />
              <div>
                <p>User Name</p>
                <p>Добавлен в 23:45</p>
              </div>
              <FaChevronDown className="ml-auto mr-2" />
            </li>
            <li className="p-2 flex items-center gap-4 border-2 border-gray-200 rounded-lg">
              <IoPersonSharp
                className="text-[30px] text-[#cccccc]"
                title="Аватар"
              />
              <div>
                <p>User Name</p>
                <p>Добавлен в 23:45</p>
              </div>
              <FaChevronDown className="ml-auto mr-2" />
            </li>
            <li className="p-2 flex items-center gap-4 border-2 border-gray-200 rounded-lg">
              <IoPersonSharp
                className="text-[30px] text-[#cccccc]"
                title="Аватар"
              />
              <div>
                <p>User Name</p>
                <p>Добавлен в 23:45</p>
              </div>
              <FaChevronDown className="ml-auto mr-2" />
            </li>
          </ul>
          <Button
            className="p-3 text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
            children="Добавить Пользователя"
            onClick={() => {
              console.log('Добавляем пользователя');
            }}
          />
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default App;

interface ProjectProps_Type {
  projectInfo: Project_Type;
}

const Project: React.FC<ProjectProps_Type> = ({ projectInfo }) => {
  return (
    <li
      key={projectInfo.id}
      className="p-2 flex items-center gap-4 border-2 border-gray-200 rounded-lg cursor-pointer"
    >
      <GrProjects />
      <p>{projectInfo.name}</p>
      <BsThreeDotsVertical className="ml-auto" />
    </li>
  );
};

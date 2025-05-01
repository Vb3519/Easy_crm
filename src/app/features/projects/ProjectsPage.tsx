import { RxQuestionMarkCircled } from 'react-icons/rx';
import { GrProjects } from 'react-icons/gr';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa6';

import Button from '../../../shared/ui/Button';

const ProjectsPage = () => {
  return (
    <div className="mt-3 p-2 flex flex-col gap-3 bg-[white]">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-2xl">Ваши проекты:</h2>

        <ul className="flex flex-col gap-1">
          <li className="p-2 flex items-center gap-4 border-2 border-gray-200 rounded-lg cursor-pointer">
            <GrProjects />
            <p>Название проекта №1</p>
            <BsThreeDotsVertical className="ml-auto" />
          </li>
          <li className="p-2 flex items-center gap-4 border-2 border-gray-200 rounded-lg cursor-pointer">
            <GrProjects />
            <p>Название проекта №2</p>
            <BsThreeDotsVertical className="ml-auto" />
          </li>
          <li className="p-2 flex items-center gap-4 border-2 border-gray-200 rounded-lg cursor-pointer">
            <GrProjects />
            <p>Название проекта №3</p>
            <BsThreeDotsVertical className="ml-auto" />
          </li>
        </ul>
        <Button
          className="p-3 text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
          children="Скачать проекты"
          onClick={() => {
            console.log('Скачиваем проекты');
          }}
        />
        <Button
          className="p-3 text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
          children="Добавить Проект"
          onClick={() => {
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
  );
};

export default ProjectsPage;

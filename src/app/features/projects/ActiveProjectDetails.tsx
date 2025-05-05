import { RxQuestionMarkCircled } from 'react-icons/rx';
import { GrProjects } from 'react-icons/gr';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa6';

import { LuEye } from 'react-icons/lu';
import { LuMessageSquareMore } from 'react-icons/lu';
import { LuPaperclip } from 'react-icons/lu';

import Button from '../../../shared/ui/Button';

const ActiveProjectDetails = () => {
  return (
    <div className="flex flex-col gap-3 xs:px-4 md:basis-[60%] md:px-0 xl:basis-[75%]">
      <div className="h-full p-2 flex flex-col gap-3 bg-[white] xs:p-4 xs:rounded-xl container-shadow">
        <h3 className="font-semibold text-lg leading-[25px]">
          Название просматриваемого проекта
        </h3>
        <nav>
          <ul className="flex gap-3">
            <li className="cursor-pointer">Задачи</li>
            <li className="cursor-pointer">В разработке</li>
          </ul>
        </nav>
        <div className="flex flex-col gap-4 xl:flex-row">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <span className="w-3 h-3 bg-orange-700 rounded-[50%]"></span>
              <h5>К выполнению</h5>
              <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
                3
              </span>
              <FaChevronDown className="ml-auto" />
            </div>
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col gap-4 items-center justify-center">
                <p className="font-semibold text-sm text-center">
                  В данный момент Ваш список задач "К выполнению" пуст
                </p>
                <RxQuestionMarkCircled className="text-[150px] text-[#e2e2e2]" />
              </li>
              {/* ------------------------------ КАРТОЧКА ЗАДАЧИ: ------------------------------ */}
              <li className="p-4 flex flex-col gap-3 rounded-2xl elem-shadow">
                <div className="flex gap-2 items-center justify-between">
                  <div className="p-2 rounded-2xl bg-amber-200">
                    Разработка ПО
                  </div>
                  <BsThreeDotsVertical />
                </div>
                <h4 className="font-semibold">Название задачи</h4>
                <p className="leading-5">
                  Описание задачи. Тут много текста. Максимум 250 букв например.
                  Описание задачи. Тут много текста. Максимум 250 букв например.
                  Описание задачи. Тут много текста. Максимум 250 букв например.
                </p>
                <div className="pt-3 flex gap-3 items-center justify-between border-t-1 border-gray-300">
                  <div className="flex gap-2 items-center justify-start flex-wrap">
                    <span>Участники:</span>{' '}
                    <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
                      3
                    </span>
                  </div>
                  <ul className="flex gap-2">
                    <li title="Просмотры" className="cursor-pointer">
                      <LuEye className="text-xl text-[#9c9c9c]" />
                    </li>
                    <li title="Сообщения" className="cursor-pointer">
                      <LuMessageSquareMore className="text-xl text-[#9c9c9c]" />
                    </li>
                    <li title="Файлы" className="cursor-pointer">
                      <LuPaperclip className="text-xl text-[#9c9c9c]" />
                    </li>
                  </ul>
                </div>
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
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col gap-4 items-center justify-center">
                <p className="font-semibold text-sm text-center">
                  В данный момент Ваш список задач "В процессе" пуст
                </p>
                <RxQuestionMarkCircled className="text-[150px] text-[#e2e2e2]" />
              </li>

              {/* ------------------------------ КАРТОЧКА ЗАДАЧИ: ------------------------------ */}
              <li className="p-4 flex flex-col gap-3 rounded-2xl elem-shadow">
                <div className="flex gap-2 items-center justify-between">
                  <div className="p-2 rounded-2xl bg-blue-300">
                    Веб-разработка
                  </div>
                  <BsThreeDotsVertical />
                </div>
                <h4 className="font-semibold">Название задачи</h4>
                <p className="leading-5">
                  Описание задачи. Тут много текста. Максимум 250 букв например.
                  Описание задачи. Тут много текста. Максимум 250 букв например.
                  Описание задачи. Тут много текста. Максимум 250 букв например.
                </p>
                <div className="pt-3 flex gap-3 items-center justify-between border-t-1 border-gray-300">
                  <div className="flex gap-2 items-center justify-start flex-wrap">
                    <span>Участники:</span>{' '}
                    <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
                      3
                    </span>
                  </div>
                  <ul className="flex gap-2">
                    <li title="Просмотры" className="cursor-pointer">
                      <LuEye className="text-xl text-[#9c9c9c]" />
                    </li>
                    <li title="Сообщения" className="cursor-pointer">
                      <LuMessageSquareMore className="text-xl text-[#9c9c9c]" />
                    </li>
                    <li title="Файлы" className="cursor-pointer">
                      <LuPaperclip className="text-xl text-[#9c9c9c]" />
                    </li>
                  </ul>
                </div>
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
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col gap-4 items-center justify-center">
                <p className="font-semibold text-sm text-center">
                  В данный момент Ваш список завершенных задач пуст
                </p>
                <RxQuestionMarkCircled className="text-[150px] text-[#e2e2e2]" />
              </li>

              {/* ------------------------------ КАРТОЧКА ЗАДАЧИ: ------------------------------ */}
              <li className="p-4 flex flex-col gap-3 rounded-2xl elem-shadow">
                <div className="flex gap-2 items-center justify-between">
                  <div className="p-2 rounded-2xl bg-orange-300">
                    Анализ данных
                  </div>
                  <BsThreeDotsVertical />
                </div>
                <h4 className="font-semibold">Название задачи</h4>
                <p className="leading-5">
                  Описание задачи. Тут много текста. Максимум 250 букв например.
                  Описание задачи. Тут много текста. Максимум 250 букв например.
                  Описание задачи. Тут много текста. Максимум 250 букв например.
                </p>
                <div className="pt-3 flex gap-3 items-center justify-between border-t-1 border-gray-300">
                  <div className="flex gap-2 items-center justify-start flex-wrap">
                    <span>Участники:</span>{' '}
                    <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
                      3
                    </span>
                  </div>
                  <ul className="flex gap-2">
                    <li title="Просмотры" className="cursor-pointer">
                      <LuEye className="text-xl text-[#9c9c9c]" />
                    </li>
                    <li title="Сообщения" className="cursor-pointer">
                      <LuMessageSquareMore className="text-xl text-[#9c9c9c]" />
                    </li>
                    <li title="Файлы" className="cursor-pointer">
                      <LuPaperclip className="text-xl text-[#9c9c9c]" />
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveProjectDetails;

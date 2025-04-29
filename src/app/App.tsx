import { useState, useEffect } from 'react';
import { SiCivicrm } from 'react-icons/si';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { PiGearSix } from 'react-icons/pi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { FaChevronDown } from 'react-icons/fa6';

// UI:
import Button from '../shared/ui/Button';

const App = () => {
  return (
    <div className="p-2 flex flex-col gap-4 bg-[#F5F5F5]">
      <header className="p-2 flex gap-2 font-[inter] flex-wrap justify-between">
        <div className="w-fit p-2 rounded-xl bg-blue-500 cursor-pointer">
          <SiCivicrm className="text-[30px] text-[whitesmoke]" />
        </div>
        <div className="flex gap-6 items-center justify-between">
          <div className="flex gap-2 items-center">
            <IoPersonCircleOutline className="text-[45px]" title="Аватар" />
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
      <main>
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

        <div className="mt-3 p-2 flex flex-col gap-3">
          <h2 className="font-semibold text-2xl">Ваши проекты:</h2>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg leading-[25px]">
              Название очень перспективного проекта
            </h3>
            <nav>
              <ul>
                <li>Задачи</li>
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
      </main>
      <footer></footer>
    </div>
  );
};

export default App;

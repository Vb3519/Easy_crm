import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import EmptyTask from './EmptyTask';
import TaskWithDetails from './TaskWithDetails';

const InProgressTasksPage = () => {
  const [isTasksDetailsOpened, setIsTasksDetailsOpened] =
    useState<boolean>(true);

  const toggleTasksDetailsVisibility = () => {
    setIsTasksDetailsOpened(!isTasksDetailsOpened);
  };

  return (
    <div className="flex flex-col gap-4 basis-[33%]">
      <div className="flex gap-2 items-center">
        <span className="w-3 h-3 bg-blue-700 rounded-[50%]"></span>
        <h5>В процессе</h5>
        <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
          1
        </span>
        <span className="ml-auto" onClick={toggleTasksDetailsVisibility}>
          {isTasksDetailsOpened ? <FaChevronDown /> : <FaChevronUp />}
        </span>
      </div>

      {/* -------------- ЗАДАЧИ (В ПРОЦЕССЕ): --------------  */}
      {isTasksDetailsOpened ? (
        <ul className="flex flex-col gap-4">
          <EmptyTask
            text={'В данный момент Ваш список задач "В процессе" пуст'}
          />
          <TaskWithDetails
            className="bg-blue-300"
            type="Веб-разработка"
            title="Название задачи"
            description="Описание задачи. Тут много текста. Максимум 250 букв например. Описание задачи. Тут много текста. Максимум 250 букв например. Описание задачи. Тут много текста. Максимум 250 букв например."
          />
        </ul>
      ) : (
        <h2 className="text-center">Откройте меню тасок "В процессе"</h2>
      )}
    </div>
  );
};

export default InProgressTasksPage;

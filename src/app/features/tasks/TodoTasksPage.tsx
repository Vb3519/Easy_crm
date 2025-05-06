import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import EmptyTask from './EmptyTask';
import TaskWithDetails from './TaskWithDetails';

const TodoTasksPage = () => {
  const [isTasksDetailsOpened, setIsTasksDetailsOpened] =
    useState<boolean>(true);

  const toggleTasksDetailsVisibility = () => {
    setIsTasksDetailsOpened(!isTasksDetailsOpened);
  };

  return (
    <div className="flex flex-col gap-4 basis-[33%]">
      <div className="flex gap-2 items-center">
        <span className="w-3 h-3 bg-orange-700 rounded-[50%]"></span>
        <h5>К выполнению</h5>
        <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
          3
        </span>
        <span className="ml-auto" onClick={toggleTasksDetailsVisibility}>
          {isTasksDetailsOpened ? <FaChevronDown /> : <FaChevronUp />}
        </span>
      </div>

      {/* -------------- ЗАДАЧИ (К ВЫПОЛНЕНИЮ): -------------- */}
      {isTasksDetailsOpened ? (
        <ul className="flex flex-col gap-4">
          <EmptyTask
            text={'В данный момент Ваш список задач "К выполнению" пуст'}
          />
          <TaskWithDetails
            className="bg-amber-200"
            type="Разработка ПО"
            title="Название задачи"
            description="Описание задачи. Тут много текста. Максимум 250 букв например. Описание задачи. Тут много текста. Максимум 250 букв например. Описание задачи. Тут много текста. Максимум 250 букв например."
          />
        </ul>
      ) : (
        <h2 className="text-center">Откройте меню тасок "К выполнению"</h2>
      )}
    </div>
  );
};

export default TodoTasksPage;

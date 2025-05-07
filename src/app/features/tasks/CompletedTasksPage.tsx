import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import { Task_Type } from '../../../entities/Task_Type';

import EmptyTask from './EmptyTask';
import TaskWithDetails from './TaskWithDetails';

interface CompletedTasksPageProps_Type {
  tasksCompleted: Task_Type[] | undefined;
  taskWithOpenedMenuId: string | null;
  toggleTaskOptionsMenu: (id: string) => void;
}

const CompletedTasksPage: React.FC<CompletedTasksPageProps_Type> = ({
  tasksCompleted,
  taskWithOpenedMenuId,
  toggleTaskOptionsMenu,
}) => {
  const [isCompletedTasksListOpened, setIsCompletedTasksListOpened] =
    useState<boolean>(true);

  const toggleTasksListVisibility = () => {
    setIsCompletedTasksListOpened(!isCompletedTasksListOpened);
  };

  return (
    <div className="flex flex-col gap-4 basis-[33%]">
      <div className="p-4 flex gap-2 items-center rounded-2xl elem-shadow border-2 border-transparent">
        <span className="w-3 h-3 bg-green-700 rounded-[50%]"></span>
        <h5>Завершены</h5>
        <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
          {tasksCompleted ? tasksCompleted.length : 0}
        </span>
        <div
          className="ml-auto w-7 h-7 flex items-center justify-center transition delay-100 ease-in cursor-pointer rounded-md hover:bg-[#e2e2e2]"
          onClick={toggleTasksListVisibility}
          title="Список задач"
        >
          {isCompletedTasksListOpened ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {/* -------------- ЗАДАЧИ (ЗАВЕРШЕНЫ): --------------  */}
      {isCompletedTasksListOpened ? (
        <ul className="flex flex-col gap-4">
          {tasksCompleted && tasksCompleted.length > 0 ? (
            tasksCompleted.map((taskInfo) => {
              const taskTypeColor: string = taskInfo.type;
              const taskTypeColors: any = {
                'Разработка ПО': 'bg-amber-200',
                'Веб-разработка': 'bg-blue-300',
                'Анализ данных': 'bg-orange-300',
              };

              return (
                <TaskWithDetails
                  key={taskInfo.id}
                  className={taskTypeColors[taskTypeColor]}
                  type={taskInfo.type}
                  title={taskInfo.title}
                  description={taskInfo.description}
                  isOptionsMenuOpened={taskWithOpenedMenuId === taskInfo.id}
                  toggleTaskOptionsMenu={() => {
                    toggleTaskOptionsMenu(taskInfo.id);
                  }}
                />
              );
            })
          ) : (
            <EmptyTask
              text={'В данный момент Ваш список задач "В процессе" пуст'}
            />
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default CompletedTasksPage;

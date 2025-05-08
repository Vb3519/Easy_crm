import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import { Task_Type } from '../../../entities/Task_Type';

import EmptyTask from './EmptyTask';
import TaskWithDetails from './TaskWithDetails';

interface InProgressTasksPageProps_Type {
  tasksInProgress: Task_Type[] | undefined;
  taskWithOpenedMenuId: string | null;
  toggleTaskOptionsMenu: (id: string) => void;
}

const InProgressTasksPage: React.FC<InProgressTasksPageProps_Type> = ({
  tasksInProgress,
  taskWithOpenedMenuId,
  toggleTaskOptionsMenu,
}) => {
  const [isInProgressTasksListOpened, setIsInProgressTasksListOpened] =
    useState<boolean>(true);

  const toggleTasksListVisibility = () => {
    setIsInProgressTasksListOpened(!isInProgressTasksListOpened);
  };

  return (
    <div className="flex flex-col gap-4 basis-[33%]">
      <div className="p-4 flex gap-2 items-center rounded-2xl elem-shadow border-2 border-transparent">
        <span className="w-3 h-3 bg-blue-700 rounded-[50%]"></span>
        <h5>В процессе</h5>
        <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
          {tasksInProgress ? tasksInProgress.length : 0}
        </span>
        <div
          className="ml-auto w-7 h-7 flex items-center justify-center transition delay-100 ease-in cursor-pointer rounded-md hover:bg-[#e2e2e2]"
          onClick={toggleTasksListVisibility}
          title="Список задач"
        >
          {isInProgressTasksListOpened ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {/* -------------- ЗАДАЧИ (В ПРОЦЕССЕ): --------------  */}
      {isInProgressTasksListOpened ? (
        <ul className="flex flex-col gap-4">
          {tasksInProgress && tasksInProgress.length > 0 ? (
            tasksInProgress.map((taskInfo) => {
              const taskTypeColor: string = taskInfo.type;
              const taskTypeColors: any = {
                'Разработка ПО': 'bg-amber-200',
                'Веб-разработка': 'bg-blue-300',
                'Анализ данных': 'bg-orange-300',
              };

              return (
                <TaskWithDetails
                  taskId={taskInfo.id}
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

export default InProgressTasksPage;

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

// Types:
import { Task_Type } from '../../../entities/Task_Type';

import EmptyTask from './EmptyTask';
import TaskWithDetails from './TaskWithDetails';

interface TodoTasksPageProps_Type {
  tasksTodo: Task_Type[] | undefined;
  taskWithOpenedMenuId: string | null;
  toggleTaskOptionsMenu: (id: string) => void;
}

const TodoTasksPage: React.FC<TodoTasksPageProps_Type> = ({
  tasksTodo,
  taskWithOpenedMenuId,
  toggleTaskOptionsMenu,
}) => {
  const [isTodoTasksListOpened, setIsTodoTasksListOpened] =
    useState<boolean>(true);

  // Открыть список задач со статусом "к выполнению":
  const toggleTasksListVisibility = () => {
    setIsTodoTasksListOpened(!isTodoTasksListOpened);
  };

  return (
    <div className="flex flex-col gap-4 basis-[33%]">
      <div className="p-4 flex gap-2 items-center rounded-2xl elem-shadow border-2 border-transparent">
        <span className="w-3 h-3 bg-orange-700 rounded-[50%]"></span>
        <h5>К выполнению</h5>
        <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
          {tasksTodo ? tasksTodo.length : 0}
        </span>
        <div
          className="ml-auto w-7 h-7 flex items-center justify-center transition delay-100 ease-in cursor-pointer rounded-md hover:bg-[#e2e2e2]"
          onClick={toggleTasksListVisibility}
          title="Список задач"
        >
          {isTodoTasksListOpened ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {/* -------------- ЗАДАЧИ (К ВЫПОЛНЕНИЮ): -------------- */}
      {isTodoTasksListOpened ? (
        <ul className="flex flex-col gap-4">
          {tasksTodo && tasksTodo.length > 0 ? (
            tasksTodo.map((taskInfo) => {
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
              text={'В данный момент Ваш список задач "К выполнению" пуст'}
            />
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default TodoTasksPage;

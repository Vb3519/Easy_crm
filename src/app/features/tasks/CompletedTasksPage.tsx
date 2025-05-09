import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import { Task_Type } from '../../../entities/Task_Type';

import EmptyTask from './EmptyTask';
import TaskWithDetails from './TaskWithDetails';

import { selectTasksSlice } from '../../redux/slices/TasksSlice';
import Loader from '../../../shared/components/Loader';

interface CompletedTasksPageProps_Type {
  tasksCompleted: Task_Type[];
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

  const tasksSliceState = useSelector(selectTasksSlice);
  const isTasksDataLoading: boolean = tasksSliceState.isLoadingViaAPI;

  const toggleTasksListVisibility = () => {
    setIsCompletedTasksListOpened(!isCompletedTasksListOpened);
  };

  return (
    <div className="flex flex-col gap-1 basis-[33%]">
      <div className="p-2">
        <div className="p-2 flex gap-2 items-center rounded-2xl elem-shadow border-2 border-transparent">
          <span className="w-3 h-3 bg-green-700 rounded-[50%]"></span>
          <h5>Завершены</h5>
          <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
            {isTasksDataLoading ? 0 : tasksCompleted.length}
          </span>
          <div
            className="ml-auto w-7 h-7 flex items-center justify-center transition delay-100 ease-in cursor-pointer rounded-md hover:bg-[#e2e2e2]"
            onClick={toggleTasksListVisibility}
            title="Список задач"
          >
            {isCompletedTasksListOpened ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
      </div>

      {/* -------------- ЗАДАЧИ (ЗАВЕРШЕНЫ): --------------  */}
      {isCompletedTasksListOpened ? (
        <ul className="h-[370px] p-2 flex flex-col gap-4 overflow-y-auto sm:h-[290px] md:h-[370px] xl:h-[700px]">
          {tasksCompleted.length > 0 ? (
            <>
              {isTasksDataLoading ? (
                <Loader />
              ) : (
                tasksCompleted.map((taskInfo) => {
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
              )}
            </>
          ) : (
            <>
              {isTasksDataLoading ? (
                <Loader />
              ) : (
                <EmptyTask
                  text={'В данный момент Ваш список задач "В процессе" пуст'}
                />
              )}
            </>
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default CompletedTasksPage;

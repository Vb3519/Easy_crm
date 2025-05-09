import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectProjectsSlice } from '../../redux/slices/projectsSlice/projectsSlice';
import { selectTasksSlice } from '../../redux/slices/TasksSlice';
import { addNewTask } from '../../redux/slices/TasksSlice';

import Button from '../../../shared/ui/Button';

// Types:
import { AppDispatch } from '../../redux/store';
import { Project_Type } from '../../../entities/Project_Type';
import { Task_Type } from '../../../entities/Task_Type';

import TodoTasksPage from '../tasks/TodoTasksPage';
import InProgressTasksPage from '../tasks/InProgressTasksPage';
import CompletedTasksPage from '../tasks/CompletedTasksPage';

const ActiveProjectDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const [taskOptionsMenuOpenedId, setTaskOptionsMenuOpenedId] = useState<
    string | null
  >(null);

  const tasks_URL: string = 'http://localhost:3001/tasks';

  // Проекты:
  // --------------------------
  const projectsStateSlice = useSelector(selectProjectsSlice);
  const currentProjectsList: Project_Type[] = projectsStateSlice.projects;
  const selectedProjectId: string | null = projectsStateSlice.selectedProjectId;

  const activeProjectDetails: Project_Type | undefined =
    currentProjectsList.find((projectInfo: Project_Type) => {
      return projectInfo.id === selectedProjectId;
    });

  // Массивы с задачами выбранного проекта трех типов ("к выполнению"; "в процессе"; "завершены"):
  // --------------------------
  const tasksStateSlice = useSelector(selectTasksSlice);
  const currentProjectTasksList = tasksStateSlice.tasks;

  const tasksTodo: Task_Type[] = currentProjectTasksList.filter((taskInfo) => {
    return taskInfo.status === 'to_do';
  });

  const tasksInProgress: Task_Type[] = currentProjectTasksList.filter(
    (taskInfo) => {
      return taskInfo.status === 'in_progress';
    }
  );

  const tasksCompleted: Task_Type[] = currentProjectTasksList.filter(
    (taskInfo) => {
      return taskInfo.status === 'completed';
    }
  );

  // Открыть меню опций задачи:
  // --------------------------
  const toggleTaskOptionsMenuVisibility = (id: string) => {
    setTaskOptionsMenuOpenedId((prevId: string | null) => {
      return prevId === id ? null : id;
    });
  };

  // Добавление новой задачи:
  // --------------------------
  const handleAddNewTask = () => {
    dispatch(addNewTask(tasks_URL));
  };

  return (
    <div className="flex flex-col gap-3 xs:px-4 md:basis-[55%] md:px-0 xl:basis-[70%] 2xl:basis-[80%]">
      <div className="h-full p-2 flex flex-col gap-3 bg-[white] xs:p-4 xs:rounded-xl container-shadow">
        <h3 className="font-semibold text-lg leading-[25px]">
          {activeProjectDetails
            ? activeProjectDetails.title
            : 'Название активного проекта'}
        </h3>

        <nav>
          <ul className="flex gap-3">
            <li className="cursor-pointer">Задачи</li>
            <li className="cursor-pointer">В разработке</li>
          </ul>
        </nav>

        <div className="flex flex-col gap-2 xl:flex-row">
          <TodoTasksPage
            tasksTodo={tasksTodo}
            taskWithOpenedMenuId={taskOptionsMenuOpenedId}
            toggleTaskOptionsMenu={toggleTaskOptionsMenuVisibility}
          />
          <InProgressTasksPage
            tasksInProgress={tasksInProgress}
            taskWithOpenedMenuId={taskOptionsMenuOpenedId}
            toggleTaskOptionsMenu={toggleTaskOptionsMenuVisibility}
          />
          <CompletedTasksPage
            tasksCompleted={tasksCompleted}
            taskWithOpenedMenuId={taskOptionsMenuOpenedId}
            toggleTaskOptionsMenu={toggleTaskOptionsMenuVisibility}
          />
        </div>
        <Button
          className="mt-auto mx-auto p-3 w-[50%] text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
          children="Создать задачу"
          onClick={() => {
            handleAddNewTask();
            console.log('Создаем задачу');
          }}
        />
      </div>
    </div>
  );
};

export default ActiveProjectDetails;

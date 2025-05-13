import { useSelector, useDispatch } from 'react-redux';

// React-icons:
import { GrProjects } from 'react-icons/gr';
import { BsThreeDotsVertical } from 'react-icons/bs';

// Types:
import { Project_Type } from '../../../entities/Project_Type';
import { AppDispatch } from '../../redux/store';

// State:
import {
  selectProjectsSlice,
  setActiveProjectId,
  deleteProjectWithTasks,
} from '../../redux/slices/projectsSlice/projectsSlice';

import {
  loadActiveProjectTasks,
  selectTasksSlice,
  deleteAllProjectTasks,
} from '../../redux/slices/tasksSlice';

import { toggleTaskFormVisibility } from '../../redux/slices/dataFormsSlice';

interface ProjectProps_Type {
  projectInfo: Project_Type;
  isProjectMenuOpened: boolean;
  openOptionsMenu: (id: string) => void;
  closeOptionsMenu: () => void;
  deleteProject: (id: string) => void;
}

const Project: React.FC<ProjectProps_Type> = ({
  projectInfo,
  isProjectMenuOpened,
  openOptionsMenu,
  closeOptionsMenu,
  deleteProject,
}) => {
  const dispatch: AppDispatch = useDispatch();

  // Проекты:
  const projectStateSlice = useSelector(selectProjectsSlice);
  const isprojectDataLoading: boolean = projectStateSlice.isLoadingViaAPI;
  const selectedProjectId: string | null = projectStateSlice.selectedProjectId;

  // Задачи:
  const tasksStateSlice = useSelector(selectTasksSlice);
  const isTasksDataLoading: boolean = tasksStateSlice.isLoadingViaAPI;

  const tasks_URL: string = 'http://localhost:3001/tasks';
  // const tasks_URL: string = 'https://easy-crm-3ii3.onrender.com/tasks';

  // Выбор активного проекта и загрузка его задач:
  // ------------------------------------------------
  const handleSetProjectIdAndLoadThisProjectTasks = (projectId: string) => {
    const selectedProjectId: string | null =
      projectStateSlice.selectedProjectId;

    if (selectedProjectId === projectId) {
      return;
    }

    // Присваивается id выбранного проекта и загружаются его задачи:
    dispatch(setActiveProjectId(projectId));
    dispatch(loadActiveProjectTasks(projectId));
  };

  // Отображение формы добавления новой задачи:
  // ------------------------------------------------
  const handleToggleTaskFormVisibility = () => {
    if (!selectedProjectId) {
      alert('Пожалуйста выберите активный проект!');
      closeOptionsMenu();
      return;
    }

    dispatch(toggleTaskFormVisibility());
    closeOptionsMenu();
  };

  // Удаление проекта и всех его задач (API и слайс):
  // ------------------------------------------------
  const handleDeleteProjectWithTasks = () => {
    if (selectedProjectId) {
      // Удаление проекта (API):
      deleteProject(selectedProjectId);

      // Удаление задач проекта (API):
      dispatch(
        deleteProjectWithTasks({ projectId: selectedProjectId, url: tasks_URL })
      );

      // Удаление задач проекта (слайс состояния Redux):
      dispatch(deleteAllProjectTasks(selectedProjectId));
    }
  };

  return (
    <li className="text-sm w-full relative p-2 flex items-center gap-2 border-2 border-gray-200 rounded-lg md:text-[16px]">
      <button
        className="flex items-center gap-2 cursor-pointer transition duration-200 ease-in hover:text-blue-500"
        disabled={isTasksDataLoading || isprojectDataLoading}
        onClick={() => {
          handleSetProjectIdAndLoadThisProjectTasks(projectInfo.id);
          closeOptionsMenu();
        }}
        key={projectInfo.id}
      >
        <GrProjects />
        <p>{projectInfo.title}</p>
      </button>

      {selectedProjectId === projectInfo.id ? (
        <button
          disabled={isTasksDataLoading || isprojectDataLoading}
          className="ml-auto cursor-pointer"
          onClick={() => {
            openOptionsMenu(projectInfo.id);
          }}
        >
          <BsThreeDotsVertical
            className={`${
              isTasksDataLoading || isprojectDataLoading
                ? 'text-gray-400'
                : 'text-black transition duration-200 ease-in hover:text-blue-500'
            }`}
          />
        </button>
      ) : null}

      {isProjectMenuOpened ? (
        <ul className="absolute z-10 top-[30px] right-[10px] p-3 flex flex-col items-center gap-2 border-1 border-gray-200 rounded-lg bg-[white] elem-shadow">
          <li
            className="cursor-pointer transition duration-200 ease-in hover:text-blue-500"
            onClick={() => {
              handleToggleTaskFormVisibility();
            }}
          >
            Добавить задачу
          </li>

          <li
            className="cursor-pointer transition duration-200 ease-in hover:text-blue-500"
            onClick={() => {
              handleDeleteProjectWithTasks();
              openOptionsMenu(projectInfo.id);
            }}
          >
            Удалить
          </li>
        </ul>
      ) : null}
    </li>
  );
};

export default Project;

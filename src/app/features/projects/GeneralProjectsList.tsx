import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineProduct } from 'react-icons/ai';

// Types:
import { Project_Type } from '../../../entities/Project_Type';
import { AppDispatch } from '../../redux/store';

// UI:
import Project from './Project';
import Button from '../../../shared/ui/Button';
import Loader from '../../../shared/components/Loader';

// State:
import {
  selectIsLoadingViaAPI,
  selectProjects,
  loadProjectsData,
  deleteSelectedProject,
} from '../../redux/slices/projectsSlice/projectsSlice';

import { selectTasksSlice } from '../../redux/slices/tasksSlice';

import { toggleProjectFormVisibility } from '../../redux/slices/dataFormsSlice';

const GeneralProjectsList = () => {
  const dispatch: AppDispatch = useDispatch();

  const [openedprojectMenuId, setOpenedprojectMenuId] = useState<string | null>(
    null
  );
  const isProjectsDataLoading: boolean = useSelector(selectIsLoadingViaAPI);
  const projectsList: Project_Type[] = useSelector(selectProjects);

  const isTasksDataLoading: boolean =
    useSelector(selectTasksSlice).isLoadingViaAPI;

  const projects_URL: string = 'http://localhost:3001/projects';

  // Загрузка данных по проектам:
  // ------------------------------
  const handleLoadProjectsData = (url: string) => {
    dispatch(loadProjectsData(url));
  };

  // Открыть форму для добавления нового проекта (отображает форму и лейаут):
  // -------------------------------------------------------------------------
  const handleToggleAddNewProjectForm = () => {
    dispatch(toggleProjectFormVisibility());
  };

  // Удаление проекта:
  // ------------------------------
  const handleDeleteProject = (id: string) => {
    dispatch(deleteSelectedProject(id));
  };

  // Открытие меню проекта:
  // ------------------------------
  const toggleProjectOptionsMenu = (id: string) => {
    setOpenedprojectMenuId((prevProjectId) => {
      return prevProjectId === id ? null : id;
    });
  };

  // Закрытие меню опций любого проекта (при смене активного проекта);
  // ------------------------------
  const closeOptionsMenu = () => {
    setOpenedprojectMenuId(null);
  };

  useEffect(() => {
    if (projectsList.length === 0) {
      handleLoadProjectsData(projects_URL);
    }
  }, []);

  return (
    <div className="p-2 flex flex-col gap-3 bg-[white] xs:p-4 xs:rounded-xl container-shadow xl:flex-grow">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold md:text-lg">Ваши проекты:</h2>
        {isProjectsDataLoading && projectsList.length > 0 ? (
          <div className="w-5 h-5 border-4 border-t-transparent border-blue-300 rounded-full animate-spin"></div>
        ) : null}
      </div>

      <ul className="h-[190px] flex flex-col gap-1 overflow-y-auto">
        {projectsList.length > 0 ? (
          projectsList.map((projectInfo) => {
            return (
              <Project
                key={projectInfo.id}
                projectInfo={projectInfo}
                isProjectMenuOpened={openedprojectMenuId === projectInfo.id}
                openOptionsMenu={toggleProjectOptionsMenu}
                closeOptionsMenu={closeOptionsMenu}
                deleteProject={handleDeleteProject}
              />
            );
          })
        ) : (
          <div className="m-auto flex flex-col gap-3 items-center">
            {isProjectsDataLoading ? (
              <Loader />
            ) : (
              <>
                <AiOutlineProduct className="text-[150px] text-[#e2e2e2]" />
                <h2 className="text-center text-sm md:text-[16px]">
                  Список проектов пуст
                </h2>
              </>
            )}
          </div>
        )}
      </ul>

      <Button
        disabled={isProjectsDataLoading || isTasksDataLoading}
        className={`p-3 text-sm font-semibold rounded-lg cursor-pointer text-[whitesmoke] ${
          isProjectsDataLoading || isTasksDataLoading
            ? 'bg-[#c3c3c3]'
            : 'bg-blue-500 transition duration-200 ease-in hover:shadow-[0px_0px_10px_rgba(0,0,0,0.4)]'
        }`}
        children="Добавить Проект"
        onClick={() => {
          handleToggleAddNewProjectForm();
        }}
      />
    </div>
  );
};

export default GeneralProjectsList;

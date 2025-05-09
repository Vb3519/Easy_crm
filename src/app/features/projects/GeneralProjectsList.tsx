import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineProduct } from 'react-icons/ai';

import { Project_Type } from '../../../entities/Project_Type';
import { AppDispatch } from '../../redux/store';
import Project from './Project';
import Button from '../../../shared/ui/Button';
import Loader from '../../../shared/components/Loader';

import {
  selectIsLoadingViaAPI,
  selectProjects,
  loadProjectsData,
  addNewProject,
  deleteSelectedProject,
} from '../../redux/slices/projectsSlice/projectsSlice';

const GeneralProjectsList = () => {
  const dispatch: AppDispatch = useDispatch();
  const [openedprojectMenuId, setOpenedprojectMenuId] = useState<string | null>(
    null
  );
  const isLoadingViaAPI: boolean = useSelector(selectIsLoadingViaAPI);
  const projects_URL: string = 'http://localhost:3001/projects';

  const projectsList: Project_Type[] = useSelector(selectProjects);

  // Загрузка данных по проектам:
  // ------------------------------
  const handleLoadProjectsData = (url: string) => {
    dispatch(loadProjectsData(url));
  };

  // Добавление нового проекта:
  // ------------------------------
  const handleAddNewProject = (url: string) => {
    dispatch(addNewProject(url));
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

  return (
    <div className="p-2 flex flex-col gap-3 bg-[white] xs:p-4 xs:rounded-xl container-shadow xl:flex-grow">
      <h2 className="font-semibold text-2xl">Ваши проекты:</h2>

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
            {isLoadingViaAPI ? (
              <Loader />
            ) : (
              <>
                <AiOutlineProduct className="text-[150px] text-[#e2e2e2]" />
                <h2 className="text-center">Список проектов пуст</h2>
              </>
            )}
          </div>
        )}
      </ul>
      <Button
        disabled={isLoadingViaAPI}
        className="p-3 text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
        children="Скачать проекты"
        onClick={() => {
          console.log('Скачиваем проекты');
          handleLoadProjectsData(projects_URL);
        }}
      />
      <Button
        disabled={isLoadingViaAPI}
        className="p-3 text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
        children="Добавить Проект"
        onClick={() => {
          handleAddNewProject(projects_URL);
          console.log('Добавляем проект');
        }}
      />
    </div>
  );
};

export default GeneralProjectsList;

import { useSelector, useDispatch } from 'react-redux';

// React-icons:
import { GrProjects } from 'react-icons/gr';
import { BsThreeDotsVertical } from 'react-icons/bs';

// Types:
import { Project_Type } from '../../../entities/Project_Type';
import { AppDispatch } from '../../redux/store';

import {
  selectProjectsSlice,
  setActiveProjectId,
} from '../../redux/slices/projectsSlice/projectsSlice';

interface ProjectProps_Type {
  projectInfo: Project_Type;
  isProjectMenuOpened: boolean;
  openOptionsMenu: (id: string) => void;
  deleteProject: (id: string) => void;
}

const Project: React.FC<ProjectProps_Type> = ({
  projectInfo,
  isProjectMenuOpened,
  openOptionsMenu,
  deleteProject,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const projectStateSlice = useSelector(selectProjectsSlice);

  // Выбор активного проекта (для просмотра его задач и т.д.):
  // ------------------------------
  const handleSetActiveProject = (id: string) => {
    const selectedProjectId: string | null =
      projectStateSlice.selectedProjectId;

    if (selectedProjectId === id) {
      return;
    }
    dispatch(setActiveProjectId(id));
  };

  return (
    <li
      onClick={() => {
        handleSetActiveProject(projectInfo.id);
      }}
      key={projectInfo.id}
      className="relative p-2 flex items-center gap-2 border-2 border-gray-200 rounded-lg cursor-pointer"
    >
      <GrProjects />
      <p>{projectInfo.title}</p>
      <BsThreeDotsVertical
        className="ml-auto"
        onClick={() => {
          openOptionsMenu(projectInfo.id);
        }}
      />
      {isProjectMenuOpened ? (
        <ul className="absolute z-10 top-[30px] right-[10px] p-3 flex flex-col items-center gap-2 border-1 border-gray-200 rounded-lg bg-[white] elem-shadow">
          <li
            className="cursor-pointer hover:underline"
            onClick={() => {
              deleteProject(projectInfo.id);
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

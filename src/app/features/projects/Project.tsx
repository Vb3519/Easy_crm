// React-icons:
import { GrProjects } from 'react-icons/gr';
import { BsThreeDotsVertical } from 'react-icons/bs';

// Types:
import { Project_Type } from '../../../entities/Project_Type';
interface ProjectProps_Type {
  projectInfo: Project_Type;
}

const Project: React.FC<ProjectProps_Type> = ({ projectInfo }) => {
  return (
    <li
      key={projectInfo.id}
      className="p-2 flex items-center gap-4 border-2 border-gray-200 rounded-lg cursor-pointer"
    >
      <GrProjects />
      <p>{projectInfo.name}</p>
      <BsThreeDotsVertical className="ml-auto" />
    </li>
  );
};

export default Project;

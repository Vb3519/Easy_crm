import Project from './Project';
import { Project_Type } from '../../../entities/Project_Type';

interface ProjectsListProp_Type {
  projects: Project_Type[];
}

const ProjectsList: React.FC<ProjectsListProp_Type> = ({ projects }) => {
  return (
    <ul>
      {projects.map((projectInfo: Project_Type) => {
        return <Project projectInfo={projectInfo} />;
      })}
    </ul>
  );
};

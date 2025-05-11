import { v4 as uuidv4 } from 'uuid';

import { Project_Type } from '../../entities/Project_Type';

const createNewProject = (title: string) => {
  const newProjectData: Project_Type = {
    id: uuidv4(),
    title: title,
  };

  return newProjectData;
};

export default createNewProject;

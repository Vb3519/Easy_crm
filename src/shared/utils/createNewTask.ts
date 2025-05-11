import { v4 as uuidv4 } from 'uuid';

import { Task_Type } from '../../entities/Task_Type';

const createNewTask = (
  projectId: string,
  title: string,
  description: string,
  type: string
) => {
  const newTask: Task_Type = {
    id: uuidv4(),
    projectId: projectId,
    type: type,
    title: title,
    description: description,
    status: 'to_do',
  };

  return newTask;
};

export default createNewTask;

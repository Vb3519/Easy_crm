import { Task_Type } from './Task_Type';

export interface Project_Type {
  id: string;
  title: string;
  tasks?: {
    to_do: Task_Type[];
    in_process: Task_Type[];
    completed: Task_Type[];
  };
}

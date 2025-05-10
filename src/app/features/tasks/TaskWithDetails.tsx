import { useSelector, useDispatch } from 'react-redux';

import { BsThreeDotsVertical } from 'react-icons/bs';

import { LuEye } from 'react-icons/lu';
import { LuMessageSquareMore } from 'react-icons/lu';
import { LuPaperclip } from 'react-icons/lu';

import { AppDispatch } from '../../redux/store';
import { changeTaskStatus, deleteTask } from '../../redux/slices/TasksSlice';

interface TaskWithDetailsProps_Type {
  taskId: string;
  className?: string;
  type: string;
  title: string;
  description: string;
  status?: string;
  isOptionsMenuOpened: boolean;
  toggleTaskOptionsMenu: () => void;
}

const TaskWithDetails: React.FC<TaskWithDetailsProps_Type> = ({
  taskId,
  className,
  type,
  title,
  description,
  isOptionsMenuOpened,
  toggleTaskOptionsMenu,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const taskStatusValues: string[] = ['to_do', 'in_progress', 'completed'];

  // Изменение статуса задачи:
  // -------------------------------
  const handleChangeTaskStatus = (taskId: string, taskStatus: string) => {
    toggleTaskOptionsMenu();
    dispatch(changeTaskStatus({ taskId, taskStatus }));
  };

  // Удаление задачи:
  // -------------------------------
  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <li className="relative p-4 flex flex-col gap-3 rounded-2xl elem-shadow">
      <div className="flex gap-2 items-center justify-between">
        <div className={`p-2 rounded-2xl ${className}`}>{type}</div>
        <BsThreeDotsVertical
          className="cursor-pointer"
          onClick={() => {
            toggleTaskOptionsMenu();
          }}
        />
      </div>
      <h4 className="font-semibold">{title}</h4>
      <p className="leading-5">{description}</p>
      <div className="pt-3 flex gap-3 items-center justify-between border-t-1 border-gray-300">
        <div className="flex gap-2 items-center justify-start flex-wrap">
          <span>Участники:</span>{' '}
          <span className="w-7 h-7 flex items-center justify-center bg-[#e2e2e2] rounded-md">
            3
          </span>
        </div>
        <ul className="flex gap-2">
          <li title="Просмотры" className="cursor-pointer">
            <LuEye className="text-xl text-[#9c9c9c]" />
          </li>
          <li title="Сообщения" className="cursor-pointer">
            <LuMessageSquareMore className="text-xl text-[#9c9c9c]" />
          </li>
          <li title="Файлы" className="cursor-pointer">
            <LuPaperclip className="text-xl text-[#9c9c9c]" />
          </li>
        </ul>
      </div>
      {isOptionsMenuOpened ? (
        <ul className="absolute z-10 top-[50px] right-[15px] p-3 flex flex-col items-center gap-2 border-1 border-gray-200 rounded-lg bg-[white] elem-shadow">
          <li
            className="cursor-pointer hover:underline"
            onClick={() => {
              handleChangeTaskStatus(taskId, taskStatusValues[0]);
              console.log('Задача для выполнения');
            }}
          >
            К выполнению
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => {
              handleChangeTaskStatus(taskId, taskStatusValues[1]);
              console.log('Задача взята в работу');
            }}
          >
            В процессе
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => {
              handleChangeTaskStatus(taskId, taskStatusValues[2]);
              console.log('Задача завершена');
            }}
          >
            Завершить
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => {
              handleDeleteTask(taskId);
              toggleTaskOptionsMenu();
              console.log('Задача удалена');
            }}
          >
            Удалить
          </li>
        </ul>
      ) : null}
    </li>
  );
};

export default TaskWithDetails;

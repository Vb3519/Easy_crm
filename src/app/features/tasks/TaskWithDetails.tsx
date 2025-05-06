import { BsThreeDotsVertical } from 'react-icons/bs';

import { LuEye } from 'react-icons/lu';
import { LuMessageSquareMore } from 'react-icons/lu';
import { LuPaperclip } from 'react-icons/lu';

interface TaskWithDetailsProps_Type {
  className?: string;
  type: string;
  title: string;
  description: string;
  status?: string;
}

const TaskWithDetails: React.FC<TaskWithDetailsProps_Type> = ({
  className,
  type,
  title,
  description,
}) => {
  return (
    <li className="p-4 flex flex-col gap-3 rounded-2xl elem-shadow">
      <div className="flex gap-2 items-center justify-between">
        <div className={`p-2 rounded-2xl ${className}`}>{type}</div>
        <BsThreeDotsVertical />
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
    </li>
  );
};

export default TaskWithDetails;

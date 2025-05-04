import { GrProjects } from 'react-icons/gr';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Button from '../../../shared/ui/Button';

const ProjectsListPage = () => {
  return (
    <div className="p-2 flex flex-col gap-3 bg-[white] xs:p-4 xs:rounded-xl container-shadow">
      <h2 className="font-semibold text-2xl">Ваши проекты:</h2>

      <ul className="flex flex-col gap-1">
        <li className="p-2 flex items-center gap-2 border-2 border-gray-200 rounded-lg cursor-pointer">
          <GrProjects />
          <p>Название проекта №1</p>
          <BsThreeDotsVertical className="ml-auto" />
        </li>
        <li className="p-2 flex items-center gap-2 border-2 border-gray-200 rounded-lg cursor-pointer">
          <GrProjects />
          <p>Название проекта №2</p>
          <BsThreeDotsVertical className="ml-auto" />
        </li>
        <li className="p-2 flex items-center gap-2 border-2 border-gray-200 rounded-lg cursor-pointer">
          <GrProjects />
          <p>Название проекта №3</p>
          <BsThreeDotsVertical className="ml-auto" />
        </li>
      </ul>
      <Button
        className="p-3 text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
        children="Скачать проекты"
        onClick={() => {
          console.log('Скачиваем проекты');
        }}
      />
      <Button
        className="p-3 text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
        children="Добавить Проект"
        onClick={() => {
          console.log('Добавляем проект');
        }}
      />
    </div>
  );
};

export default ProjectsListPage;

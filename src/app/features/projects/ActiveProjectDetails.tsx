import TodoTasksPage from '../tasks/TodoTasksPage';
import InProgressTasksPage from '../tasks/InProgressTasksPage';
import CompletedTasksPage from '../tasks/CompletedTasksPage';

const ActiveProjectDetails = () => {
  return (
    <div className="flex flex-col gap-3 xs:px-4 md:basis-[60%] md:px-0 xl:basis-[75%]">
      <div className="h-full p-2 flex flex-col gap-3 bg-[white] xs:p-4 xs:rounded-xl container-shadow">
        <h3 className="font-semibold text-lg leading-[25px]">
          Название просматриваемого проекта
        </h3>

        <nav>
          <ul className="flex gap-3">
            <li className="cursor-pointer">Задачи</li>
            <li className="cursor-pointer">В разработке</li>
          </ul>
        </nav>

        <div className="flex flex-col gap-4 xl:flex-row">
          <TodoTasksPage />
          <InProgressTasksPage />
          <CompletedTasksPage />
        </div>
      </div>
    </div>
  );
};

export default ActiveProjectDetails;

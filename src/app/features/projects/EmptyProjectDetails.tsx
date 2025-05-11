import { GiNotebook } from 'react-icons/gi';

const EmptyProjectDetails = () => {
  return (
    <div className="flex flex-col gap-3 xs:px-4 md:basis-[55%] md:px-0 xl:basis-[70%] 2xl:basis-[80%]">
      <div className="h-full p-2 flex flex-col items-center justify-center gap-3 bg-[white] xs:p-4 xs:rounded-xl container-shadow">
        <h3 className="text-center font-semibold text-lg lg:text-xl 2xl:text-2xl">
          Приложение для управления проектами "Easy CRM"
        </h3>
        <div>
          <GiNotebook className="text-[150px] text-[#e2e2e2] md:text-[200px] 2xl:text-[250px]" />
        </div>
        <figure>
          <figcaption className="pb-1 font-semibold border-b-2 border-b-gray-200 md:text-lg">
            Функционал:
          </figcaption>
          <ul className="list-disc list-inside text-sm md:text-[16px]">
            <li className="py-2">
              Сервер, на котором размещена бэкенд часть приложения, бесплатный.
              Возможны задержки на первичный запрос (в районе 1 минуты), т.к.
              сервер "засыпает".
            </li>
            <li className="py-2">
              В таком случае пожалуйста клонируйте репозиторий на свой ПК.
            </li>
            <li className="py-2">
              Добавление / удаление новых пользователей; проектов и задач к
              проектам.
            </li>
            <li className="py-2">
              Изменение статуса каждой отдельной задачи. Возможные варианты: "К
              выполнению"; "В процессе"; "Завершена".
            </li>
          </ul>
        </figure>
      </div>
    </div>
  );
};

export default EmptyProjectDetails;

import { GiNotebook } from 'react-icons/gi';

import Loader from '../../../shared/components/Loader';

const EmptyProjectDetails = () => {
  return (
    <div className="flex flex-col gap-3 xs:px-4 md:basis-[60%] md:px-0 xl:basis-[75%]">
      <div className="h-full p-2 flex flex-col items-center justify-center gap-3 bg-[white] xs:p-4 xs:rounded-xl container-shadow">
        <h3 className="text-center font-semibold text-2xl">
          Приложение для управления проектами Easy CRM
        </h3>
        <div>
          <GiNotebook className="text-[250px] text-[#e2e2e2]" />
        </div>
        <figure>
          <figcaption>Функционал:</figcaption>
          <ul className="list-disc list-inside">
            <li>
              Сервер, на котором размещена бэкенд часть приложения, бесплатный.
              Возможны задержки на первичный запрос (в районе 1 минуты), т.к.
              сервер "засыпает".
            </li>
            <li>Пожалуйста клонируйте репозиторий на свой ПК.</li>
            <li>
              Добавление / удаление новых пользователей; проектов и задач к
              проектам.
            </li>
            <li>
              Изменение статуса каждой отдельной задачи. Возможные варианты: "К
              выполнению"; "В процессе"; "Завершена".
            </li>
            <li>
              Вы можете воспользоваться автоматическим заполнением приложения
              (для перезентации функционала), так и самостоятельно начать
              работу.
            </li>
          </ul>
        </figure>
      </div>
    </div>
  );
};

export default EmptyProjectDetails;

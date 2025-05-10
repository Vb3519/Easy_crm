import { GiNotebook } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';

import AddNewUserForm from '../users/AddNewUserForm';

import Button from '../../../shared/ui/Button';
import Form from '../../../shared/ui/Form';

const EmptyProjectDetails = () => {
  return (
    <div className="flex flex-col gap-3 xs:px-4 md:basis-[55%] md:px-0 xl:basis-[70%] 2xl:basis-[80%]">
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
      <AddNewUserForm />

      <Form>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Добавление нового проекта:</h2>
          <button
            type="button"
            aria-label="Закрыть форму"
            onClick={() => {
              console.log('Форма закрыта');
            }}
            className="w-7 h-7 flex items-center justify-center transition delay-100 ease-in cursor-pointer rounded-md hover:bg-[#e2e2e2]"
          >
            <RxCross2 className="text-xl text-gray-600" />
          </button>
        </div>
        <fieldset className="flex flex-col gap-4">
          <label>Название проекта:</label>
          <input
            name="title"
            required
            className="p-3 text-sm rounded-lg bg-[#e2e2e2] outline-none"
            type="text"
            placeholder="Название проекта..."
            maxLength={20}
          />
          <Button
            className="p- text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
            type="submit"
            children="Отправить"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              console.log('Добавлен новый проект');
            }}
          />
        </fieldset>
      </Form>

      <Form>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Добавление новой задачи:</h2>
          <button
            type="button"
            aria-label="Закрыть форму"
            onClick={() => {
              console.log('Форма закрыта');
            }}
            className="w-7 h-7 flex items-center justify-center transition delay-100 ease-in cursor-pointer rounded-md hover:bg-[#e2e2e2]"
          >
            <RxCross2 className="text-xl text-gray-600" />
          </button>
        </div>
        <fieldset className="flex flex-col gap-4">
          <legend className="pb-2">Информация по задаче:</legend>
          <input
            name="title"
            required
            className="p-3 rounded-lg bg-[#e2e2e2] outline-none"
            type="text"
            placeholder="Название..."
            maxLength={15}
          />
          <textarea
            name="description"
            required
            className="w-full h-[150px] p-3 rounded-lg bg-[#e2e2e2] outline-none resize-none"
            placeholder="Описание..."
            maxLength={250}
          ></textarea>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend>Тип задачи:</legend>
          <div>
            <label className="w-fit flex items-center gap-2 cursor-pointer">
              <input name="type" value="Разработка ПО" type="checkbox" />
              Разработка ПО
            </label>
            <label className="w-fit flex items-center gap-2 cursor-pointer">
              <input name="type" value="Веб-разработка" type="checkbox" />
              Веб-разработка
            </label>
            <label className="w-fit flex items-center gap-2 cursor-pointer">
              <input name="type" value="Анализ данных" type="checkbox" />
              Анализ данных
            </label>
          </div>
        </fieldset>

        <Button
          className="p- text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
          type="submit"
          children="Отправить"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            console.log('Добавлен новый проект');
          }}
        />
      </Form>
    </div>
  );
};

export default EmptyProjectDetails;

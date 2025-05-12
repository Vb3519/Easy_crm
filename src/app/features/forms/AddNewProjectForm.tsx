import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// React-icons:
import { RxCross2 } from 'react-icons/rx';

// Types:
import { AppDispatch } from '../../redux/store';

// State:
import {
  addNewProject,
  selectProjects,
} from '../../redux/slices/projectsSlice/projectsSlice';
import { toggleProjectFormVisibility } from '../../redux/slices/dataFormsSlice';

// UI:
import Form from '../../../shared/ui/Form';
import Button from '../../../shared/ui/Button';

const AddNewProjectForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [projectTitle, setProjectTitle] = useState<string>('');

  const projectsList = useSelector(selectProjects);
  const projects_URL: string = 'http://localhost:3001/projects';

  // Обработка состояния названия проекта:
  // --------------------------------------------
  const handleSetProjectTitle = (projectTitle: string) => {
    setProjectTitle(projectTitle);
  };

  // Добавление проекта в базу данных:
  // --------------------------------------------
  const handleAddNewProject = (projectTitleValue: string) => {
    if (projectsList.length >= 6) {
      alert('Добавлено максимальное количество проектов!');
      setProjectTitle('');
      closeAddNewProjectForm();
      return;
    }

    if (projectTitleValue.length > 0) {
      dispatch(
        addNewProject({ title: projectTitleValue.trim(), url: projects_URL })
      );
      setProjectTitle('');
      closeAddNewProjectForm();
    } else {
      alert('Укажите название для проекта!');
    }
  };

  // Закрытие формы и лейаута для нее:
  // --------------------------------------------
  const closeAddNewProjectForm = () => {
    dispatch(toggleProjectFormVisibility());
  };

  return (
    <Form>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Добавление нового проекта:</h2>
        <button
          type="button"
          aria-label="Закрыть форму"
          onClick={() => {
            closeAddNewProjectForm();
          }}
          className="w-7 h-7 flex items-center justify-center transition delay-100 ease-in cursor-pointer rounded-md hover:bg-[#e2e2e2]"
        >
          <RxCross2 className="text-xl text-gray-600" />
        </button>
      </div>
      <fieldset className="flex flex-col gap-4">
        <label>Название проекта:</label>
        <input
          value={projectTitle}
          name="title"
          required
          className="p-3 text-sm rounded-lg bg-[#e2e2e2] outline-none"
          type="text"
          placeholder="Название проекта..."
          maxLength={20}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const projectTitle: string = event.target.value;

            handleSetProjectTitle(projectTitle);
          }}
        />
        <Button
          className="p- text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke]"
          type="submit"
          children="Отправить"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            handleAddNewProject(projectTitle);
          }}
        />
      </fieldset>
    </Form>
  );
};

export default AddNewProjectForm;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RxCross2 } from 'react-icons/rx';

// Types:
import { AppDispatch } from '../../redux/store';

// UI:
import Form from '../../../shared/ui/Form';
import Button from '../../../shared/ui/Button';

// State:
import { toggleTaskFormVisibility } from '../../redux/slices/dataFormsSlice';
import { selectProjectsSlice } from '../../redux/slices/projectsSlice/projectsSlice';
import { addNewTask } from '../../redux/slices/tasksSlice';

const AddNewTaskForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const projectsSliceState = useSelector(selectProjectsSlice);
  const selectedProjectId: string | null = projectsSliceState.selectedProjectId;

  const tasks_URL: string = 'http://localhost:3001/tasks';

  const [newTaskData, setNewTaskData] = useState({
    title: '',
    description: '',
    type: '',
  });

  // Добавление новой задачи:
  // ------------------------------------------------
  const handleAddNewTask = () => {
    const formElementsValues: string[] = Object.values(newTaskData);

    const isFormValid: boolean = formElementsValues.every((value) => {
      return value !== '';
    });

    if (selectedProjectId && isFormValid) {
      dispatch(
        addNewTask({
          url: tasks_URL,
          projectId: selectedProjectId,
          title: newTaskData.title,
          description: newTaskData.description,
          type: newTaskData.type,
        })
      );
    } else {
      alert('Пожалуйста заполните все поля формы!');
      return;
    }

    handleToggleTaskFormVisibility();
  };

  // Отображение / закрытие формы добавления новой задачи:
  // ------------------------------------------------
  const handleToggleTaskFormVisibility = () => {
    dispatch(toggleTaskFormVisibility());
  };

  const taskTypes: string[] = [
    'Разработка ПО',
    'Веб-разработка',
    'Анализ данных',
  ];

  return (
    <Form>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold lg:text-lg">Добавление новой задачи:</h2>
        <button
          type="button"
          aria-label="Закрыть форму"
          onClick={() => {
            handleToggleTaskFormVisibility();
          }}
          className="w-7 h-7 flex items-center justify-center transition delay-100 ease-in cursor-pointer rounded-md hover:bg-[#e2e2e2]"
        >
          <RxCross2 className="text-xl text-gray-600" />
        </button>
      </div>

      <fieldset className="flex flex-col gap-4">
        <legend className="pb-2">Информация по задаче:</legend>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const taskTitle: string = event.target.value;

            setNewTaskData((prevTaskData) => {
              return { ...prevTaskData, title: taskTitle };
            });
          }}
          value={newTaskData.title}
          name="title"
          required
          className="p-3 rounded-lg bg-[#e2e2e2] outline-none md:text-[16px]"
          type="text"
          placeholder="Название..."
          maxLength={15}
        />
        <textarea
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const taskDescription: string = event.target.value;

            setNewTaskData((prevTaskData) => {
              return { ...prevTaskData, description: taskDescription };
            });
          }}
          value={newTaskData.description}
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
          <label className="w-fit flex items-center gap-2 cursor-pointer transition duration-200 ease-in hover:text-blue-500">
            <input
              disabled={
                newTaskData.type !== taskTypes[0] && newTaskData.type !== ''
              }
              name="type"
              value="Разработка ПО"
              type="checkbox"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const taskType: string = event.target.value;
                const isChecked: boolean = event.target.checked;

                setNewTaskData((prevTaskData) => {
                  return { ...prevTaskData, type: isChecked ? taskType : '' };
                });
              }}
            />
            Разработка ПО
          </label>

          <label className="w-fit flex items-center gap-2 cursor-pointer transition duration-200 ease-in hover:text-blue-500">
            <input
              disabled={
                newTaskData.type !== taskTypes[1] && newTaskData.type !== ''
              }
              name="type"
              value="Веб-разработка"
              type="checkbox"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const taskType: string = event.target.value;
                const isCheked: boolean = event.target.checked;

                setNewTaskData((prevTaskData) => {
                  return { ...prevTaskData, type: isCheked ? taskType : '' };
                });
              }}
            />
            Веб-разработка
          </label>

          <label className="w-fit flex items-center gap-2 cursor-pointer transition duration-200 ease-in hover:text-blue-500">
            <input
              disabled={
                newTaskData.type !== taskTypes[2] && newTaskData.type !== ''
              }
              name="type"
              value="Анализ данных"
              type="checkbox"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const taskType: string = event.target.value;
                const isCheked: boolean = event.target.checked;

                setNewTaskData((prevTaskData) => {
                  return { ...prevTaskData, type: isCheked ? taskType : '' };
                });
              }}
            />
            Анализ данных
          </label>
        </div>
      </fieldset>

      <Button
        className="p- text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke] transition duration-200 ease-in hover:shadow-[0px_0px_10px_rgba(0,0,0,0.4)]"
        type="submit"
        children="Отправить"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          handleAddNewTask();
          console.log('Добавлена новая задача');
        }}
      />
    </Form>
  );
};

export default AddNewTaskForm;

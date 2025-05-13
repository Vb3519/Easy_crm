import { useSelector } from 'react-redux';

// Формы добавления данных:
import AddNewUserForm from './AddNewUserForm';
import AddNewProjectForm from './AddNewProjectForm';
import AddNewTaskForm from './AddNewTaskForm';

// State:
import { selectDataFormsSlice } from '../../redux/slices/dataFormsSlice';

const FormsLayout = () => {
  const dataFormsStateSlice = useSelector(selectDataFormsSlice);

  // Добавление нового пользователя (форма):
  // ----------------------------------------
  if (dataFormsStateSlice.isAddUserFormOpened) {
    return (
      <div
        className={`z-20 fixed h-screen w-full flex items-center justify-center bg-black/30`}
      >
        <AddNewUserForm />
      </div>
    );
  }

  // Добавление нового проекта (форма):
  // ----------------------------------------
  if (dataFormsStateSlice.isAddProjectFormOpened) {
    return (
      <div
        className={`z-20 fixed h-screen w-full flex items-center justify-center bg-black/30`}
      >
        <AddNewProjectForm />
      </div>
    );
  }

  // Добавление новой задачи (форма):
  // ----------------------------------------
  if (dataFormsStateSlice.isAddTaskFormOpened) {
    return (
      <div
        className={`z-20 fixed h-screen w-full flex items-center justify-center bg-black/30`}
      >
        <AddNewTaskForm />
      </div>
    );
  }
};

export default FormsLayout;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// React-icons:
import { RxCross2 } from 'react-icons/rx';

// Types:
import { User_Type } from '../../../entities/User_Type';
import { AppDispatch } from '../../redux/store';

// State:
import { selectUsers } from '../../redux/slices/usersSlice';
import { addNewUserData } from '../../redux/slices/usersSlice';
import { toggleUserFormVisibility } from '../../redux/slices/dataFormsSlice';

// UI:
import Form from '../../../shared/ui/Form';
import Button from '../../../shared/ui/Button';

const AddNewUserForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const [userName, setUserName] = useState<string>('');
  const users: User_Type[] = useSelector(selectUsers);

  const users_URL: string = 'http://localhost:3001/users';

  // Обработка состояния имени пользователя:
  // --------------------------------------------
  const handleSetUserName = (userNameValue: string) => {
    setUserName(userNameValue);
  };

  // Добавление пользователя в базу данных:
  // --------------------------------------------
  const handleAddNewUser = (userNameValue: string) => {
    if (users.length >= 6) {
      alert('Добавлено максимальное количество пользователей!');
      setUserName('');
      closeAddNewUserForm();
      return;
    }

    if (userNameValue.length > 0) {
      dispatch(
        addNewUserData({ userName: userNameValue.trim(), url: users_URL })
      );
      setUserName('');
      closeAddNewUserForm();
    } else {
      alert('Укажите имя пользователя!');
      return;
    }
  };

  // Закрытие формы и лейаута для нее:
  // --------------------------------------------
  const closeAddNewUserForm = () => {
    dispatch(toggleUserFormVisibility());
  };

  return (
    <Form>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[16px] lg:text-lg">
          Добавление нового пользователя:
        </h2>
        <button
          type="button"
          aria-label="Закрыть форму"
          onClick={() => {
            closeAddNewUserForm();
          }}
          className="w-7 h-7 flex items-center justify-center transition delay-100 ease-in cursor-pointer rounded-md hover:bg-[#e2e2e2]"
        >
          <RxCross2 className="text-xl text-gray-600" />
        </button>
      </div>

      <fieldset className="flex flex-col gap-4 lg:gap-6">
        <label>Имя пользователя:</label>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const userName: string = event.target.value;
            handleSetUserName(userName);
          }}
          value={userName}
          name="name"
          required
          className="p-3 text-sm rounded-lg bg-[#e2e2e2] outline-none md:text-[16px]"
          type="text"
          placeholder="Имя пользователя..."
          maxLength={15}
        />

        <Button
          className="p- text-sm font-semibold rounded-lg cursor-pointer bg-blue-500 text-[whitesmoke] transition duration-200 ease-in hover:shadow-[0px_0px_10px_rgba(0,0,0,0.4)]"
          type="submit"
          children="Отправить"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            handleAddNewUser(userName);
          }}
        />
      </fieldset>
    </Form>
  );
};

export default AddNewUserForm;

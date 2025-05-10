import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../redux/store';

import AddNewUserForm from '../users/AddNewUserForm';
import {
  selectDataFormsSlice,
  toggleUserFormVisibility,
} from '../../redux/slices/dataFormsSlice';

const FormsLayout = () => {
  const dispatch: AppDispatch = useDispatch();
  const dataFormsStateSlice = useSelector(selectDataFormsSlice);

  const handleAddNewUserFormVisibility = () => {
    dispatch(toggleUserFormVisibility());
  };

  return (
    <div className="z-20 fixed h-screen w-full flex items-center justify-center bg-transparent">
      {dataFormsStateSlice.isAddUserFormOpened ? <AddNewUserForm /> : null}
    </div>
  );
};

export default FormsLayout;

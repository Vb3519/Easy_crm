import { v4 as uuiv4 } from 'uuid';

import { User_Type } from '../../entities/User_Type';
import getCurrentTime from './getCurrentTime';

const createNewUser = (name: string): User_Type => {
  const newUserInfo: User_Type = {
    id: uuiv4(),
    name: name,
    added_at: `Добавлен в ${getCurrentTime()}`,
  };

  return newUserInfo;
};

export default createNewUser;

import { useContext } from 'react';
import { UsersContext } from '../context/contextUsers';

export function useUsers() {
  const context = useContext(UsersContext);

  return context;
}

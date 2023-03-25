import { createContext, ReactNode, useState } from 'react';
import { api } from '../services/axios';

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface UserProviderProps {
  children: ReactNode;
}

interface UsersContextProps {
  users: UserProps[];
  loadUsers: () => void;
}

export const UsersContext = createContext({} as UsersContextProps);

export function UsersProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const { data } = await api.get('/users');

    setUsers(data);
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        loadUsers
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

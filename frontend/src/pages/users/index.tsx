import {
  Box,
  Card,
  Center,
  Container,
  SimpleGrid,
  Spinner,
  Text
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';
import CardUser from '../../components/CardUser';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useUsers } from '../../hooks/useUsers';

interface UsersProps {
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

function Users() {
  const [loading, setLoading] = useState(true);
  const { loadUsers, users } = useUsers();
  useEffect(() => {
    loadUsers();
    setLoading(false);
  }, [users]);
  return (
    <Container w="full" maxW={1300} display="flex" bgColor="gray.800">
      <Sidebar />
      <Box w="full" h="100vh" overflowY="scroll" padding={4}>
        <Header />
        {loading && (
          <Center>
            <Spinner size="xl" color="primaryGreen" />
          </Center>
        )}
        <SimpleGrid
          w="full"
          h="full"
          textColor="white"
          columns={3}
          spacing={4}
          pt={10}
        >
          {users.map(user => (
            <CardUser
              key={user.id}
              name={user.name}
              username={user.username}
              email={user.email}
              phone={user.phone}
              website={user.website}
              company={user.company}
              id={user.id}
              address={user.address}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
}

export default Users;

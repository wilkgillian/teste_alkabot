import {
  Box,
  Icon,
  Text,
  VStack,
  StackProps,
  useBreakpointValue
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineHome, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { FiTrendingUp } from 'react-icons/fi';

function NavLinks(props: StackProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });
  const router = useRouter();

  return (
    <VStack pt={10} spacing={8} {...props}>
      {!isWideVersion && (
        <Link passHref href="/">
          <Box
            as="button"
            borderBottom={router.asPath === '/' ? '2px solid #6EEB83' : ''}
            color={router.asPath === '/' ? '#6EEB83' : ''}
          >
            <Icon as={AiOutlineHome} fontSize="3xl" />
            <Text color="white">home</Text>
          </Box>
        </Link>
      )}
      <Link passHref href="/search">
        <Box
          as="button"
          borderBottom={router.asPath === '/search' ? '2px solid #6EEB83' : ''}
          color={router.asPath === '/search' ? '#6EEB83' : ''}
        >
          <Icon as={AiOutlineSearch} fontSize="3xl" />
          <Text color="white">buscar</Text>
        </Box>
      </Link>
      <Link passHref href="/trending">
        <Box
          as="button"
          borderBottom={
            router.asPath === '/trending' ? '2px solid #6EEB83' : ''
          }
          color={router.asPath === '/trending' ? '#6EEB83' : ''}
        >
          <Icon as={FiTrendingUp} fontSize="3xl" />
          <Text color="white">trending</Text>
        </Box>
      </Link>
      <Link passHref href="/users">
        <Box
          as="button"
          borderBottom={router.asPath === '/users' ? '2px solid #6EEB83' : ''}
          color={router.asPath === '/users' ? '#6EEB83' : ''}
        >
          <Icon as={AiOutlineUser} fontSize="3xl" />
          <Text color="white">usuários</Text>
        </Box>
      </Link>
    </VStack>
  );
}

export default NavLinks;

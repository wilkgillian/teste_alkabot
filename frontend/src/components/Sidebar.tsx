import { Icon, VStack, useBreakpointValue } from '@chakra-ui/react';
import { FaBloggerB } from 'react-icons/fa';
import Link from 'next/link';
import NavLinks from './NavLinks';

function Sidebar() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <VStack
      as="ul"
      w={100}
      h="100vh"
      left={0}
      borderRight="1px solid #6EEB83"
      padding="4rem 0"
      __css={{
        lastChild: {
          marginTop: 'auto'
        }
      }}
    >
      <Link passHref href="/">
        <Icon
          as={FaBloggerB}
          w={14}
          h={14}
          rounded="50%"
          color="black"
          bgColor="primaryGreen"
          padding={2}
        />
      </Link>
      <NavLinks />
      {/* <Button
        variant="unstyled"
        display="block"
        bgColor="transparent"
        color="primaryGreen"
        marginTop="auto"
        marginBottom={10}
        _hover={{
          color: 'white'
        }}
      >
        <Icon as={IoIosAddCircleOutline} fontSize="3xl" />
        <Text textColor="white">Criar</Text>
      </Button> */}
    </VStack>
  );
}

export default Sidebar;

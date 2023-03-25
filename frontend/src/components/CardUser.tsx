import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  Text,
  Avatar,
  Center,
  Flex,
  Icon
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BsLink45Deg } from 'react-icons/bs';
import { FaIndustry } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { getRandomUserImage } from '../utils/getRandomUserImage';

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

function CardUser({
  id,
  name,
  email,
  username,
  address,
  phone,
  website,
  company
}: UsersProps) {
  const [avatar, setAvatar] = useState('');
  const loadImage = async () => {
    const image = await getRandomUserImage();

    setAvatar(image);
  };
  useEffect(() => {
    loadImage();
  }, []);
  return (
    <Link passHref href={`users/${id}`}>
      <Card
        transition="0.2s"
        _hover={{
          boxShadow: 'dark-lg',
          transform: 'scale(1.02)'
        }}
        bgColor="gray.700"
        h={500}
      >
        <CardBody>
          <Center>
            <Avatar size="2xl" src={avatar} />
          </Center>
          <Stack mt={6} padding={4}>
            <Heading size="md" textAlign="center" textColor="primaryGreen">
              {name}
            </Heading>
            <Text>@{username}</Text>
            <Flex alignItems="center">
              <Icon as={AiOutlineMail} mr={2} />
              <Text fontSize={14}>{email}</Text>
            </Flex>
            <Flex alignItems="center">
              <Icon as={BsLink45Deg} mr={2} />
              <Text fontSize={14}>{website}</Text>
            </Flex>
            <Flex alignItems="center">
              <Icon as={AiOutlinePhone} mr={2} />
              <Text fontSize={14}>{phone}</Text>
            </Flex>
            <Flex alignItems="center">
              <Icon as={GoLocation} mr={2} />
              <Text fontSize={14}>
                {address.street}, {address.city}, {address.zipcode}
              </Text>
            </Flex>
            <Flex alignItems="center">
              <Icon as={FaIndustry} mr={2} />
              <Text fontSize={14}>{company.name}</Text>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
}

export default CardUser;

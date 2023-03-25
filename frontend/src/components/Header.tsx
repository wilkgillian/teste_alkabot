import { Avatar, Text, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRandomUserImage } from '../utils/getRandomUserImage';

function Header() {
  const [avatar, setAvatar] = useState('');
  async function loadImage() {
    const avatar = await getRandomUserImage();
    setAvatar(avatar);
  }
  useEffect(() => {
    loadImage();
  }, []);
  return (
    <Flex w="full" h={20} justifyContent="flex-end" alignItems="center" gap={4}>
      <Text fontWeight="bold">JohnDoe</Text>
      <Link href="/" passHref>
        <Avatar src={avatar} alignSelf="flex-end" />
      </Link>
    </Flex>
  );
}

export default Header;

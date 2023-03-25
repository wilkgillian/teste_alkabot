import { Avatar, Box, Flex, Icon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { getRandomUserImage } from '../utils/getRandomUserImage';

interface CommentsProps {
  name: string;
  email: string;
  body: string;
}

function CommentBox({ name, email, body }: CommentsProps) {
  const [liked, setLiked] = useState(false);
  const [unLiked, setUnLiked] = useState(false);
  const [userImage, setUserImage] = useState('');
  const loadImage = async (): Promise<void> => {
    const randomImage = await getRandomUserImage();

    setUserImage(randomImage);
  };
  useEffect(() => {
    loadImage();
  }, []);
  return (
    <Flex
      w="full"
      color="white"
      mb={4}
      borderBottom="1px solid white"
      padding={4}
      gap={4}
    >
      <Avatar src={userImage} alignSelf="center" />
      <Box>
        <Text as="h1" fontWeight="bold" textColor="primaryGreen" fontSize={22}>
          {name}
        </Text>
        <Text as="span" fontWeight="normal" textColor="gray.500">
          {email}
        </Text>
        <Text as="p" fontWeight="bold">
          {body}
        </Text>
      </Box>
      <Icon
        as={AiOutlineLike}
        cursor="pointer"
        onClick={() => {
          setLiked(!liked);
          setUnLiked(false);
        }}
        color={liked ? 'green' : 'white'}
      />
      <Icon
        as={AiOutlineDislike}
        cursor="pointer"
        onClick={() => {
          setUnLiked(!unLiked);
          setLiked(false);
        }}
        color={unLiked ? 'red' : 'white'}
      />
    </Flex>
  );
}

export default CommentBox;

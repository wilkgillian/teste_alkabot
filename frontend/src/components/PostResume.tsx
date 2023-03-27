import { Box, Divider, Flex, Text, Icon, Button } from '@chakra-ui/react';
import { AiOutlineLike, AiOutlineDislike, AiOutlineSave } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import Link from 'next/link';
import { useState } from 'react';
import CommentBox from './CommentBox';

interface PostResumeProps {
  userId: string;
  title: string;
  id: string | number;
  date: Date;
  content: string;
  liked: boolean;
  unLiked: boolean;
  saved: boolean;
  author: string;
  hastags: string[];
  comments: CommentsProps[];
}
interface CommentsProps {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

function PostResume({
  id,
  userId,
  title,
  date,
  author,
  content,
  hastags,
  comments
}: PostResumeProps) {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [unLiked, setUnLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const day = date.getDay();
  const month = date.toLocaleString('en', { month: 'long' });
  return (
    <Box w="full" display="flex" alignItems="center" textColor="white">
      <Text fontSize={24} w={70} fontWeight="bold" textAlign="center">
        {day}
        <br />
        {month.slice(0, 3)}
      </Text>
      <Divider orientation="vertical" margin={4} bgColor="primaryGreen" />
      <Box w="full">
        <Link href={`/post/${id}`} passHref>
          <Text
            as="h1"
            fontSize={24}
            textColor="primaryGreen"
            fontWeight="bold"
            textTransform="capitalize"
            mt={12}
          >
            {title}
          </Text>
          <Link href={`/users/${userId}`} passHref>
            <Text
              as="h1"
              fontSize={12}
              textColor="gray.500"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {author}
            </Text>
          </Link>
        </Link>
        <Text as="p" maxH={120} overflow="hidden" textOverflow="ellipsis">
          {content}
        </Text>
        <Link passHref href={`/post/${id}`}>
          <Text as="strong" textColor="primaryGreen">
            ...ler mais
          </Text>
        </Link>
        <Flex mt={2}>
          {hastags.map(hastag => (
            <Box
              key={Math.random()}
              p="0 1rem"
              m={2}
              border="1px solid #6EEB83"
              rounded={10}
              textColor="primaryGreen"
            >
              <Text as="span" fontSize={14}>
                #{hastag}
              </Text>
            </Box>
          ))}
          <Flex w="full" justifyContent="flex-end" alignItems="center" gap={2}>
            <Button
              bgColor="gray.700"
              leftIcon={<BiCommentDetail />}
              onClick={() => setShowComments(!showComments)}
            >
              Comentários
            </Button>
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
            <Icon
              as={AiOutlineSave}
              cursor="pointer"
              onClick={() => setSaved(!saved)}
              color={saved ? 'pink' : 'white'}
            />
          </Flex>
        </Flex>
        {showComments && (
          <Box
            w="full"
            bgColor="gray.700"
            textColor="white"
            mt={10}
            padding={4}
            maxH={200}
            overflowY="scroll"
          >
            {comments?.map(comment => (
              <CommentBox
                key={comment.id}
                name={comment.name}
                email={comment.email}
                body={comment.body}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PostResume;

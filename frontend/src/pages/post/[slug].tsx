import {
  Box,
  Center,
  Spinner,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import CommentBox from '../../components/CommentBox';
import Header from '../../components/Header';
import { usePosts } from '../../hooks/usePosts';
import { api } from '../../services/axios';

interface PostProps {
  post: {
    userId: string;
    title: string;
    id: string;
    body: string;
    liked: boolean;
    unLiked: boolean;
    saved: boolean;
    author: string;
    hastags: string[];
    comments: CommentsProps[];
  };
}

interface CommentsProps {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

function Post({ post }: PostProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { getUser, loadComments } = usePosts();
  async function loadRestOfData() {
    const author = await getUser(post.userId);
    const comments = await loadComments(post.id);
    setAuthor(author);
    setComments(comments);
    setLoading(false);
  }
  const router = useRouter();
  loadRestOfData();
  if (router.isFallback) {
    return (
      <Text>
        <Spinner /> Carregando
      </Text>
    );
  }
  return (
    <Box
      w="full"
      h="full"
      maxW={1300}
      padding={isWideVersion ? '4rem 10rem' : '1rem'}
      margin={isWideVersion ? 'auto' : '0.5rem'}
      bgColor="gray.800"
      textColor="white"
    >
      <Header />
      <BackButton />
      <Text
        mt={isWideVersion ? '1rem' : '2rem'}
        fontSize={isWideVersion ? 48 : 22}
        textTransform="capitalize"
        fontWeight="bold"
        textColor="primaryGreen"
        mb={isWideVersion ? 4 : 1}
      >
        {post.title}
      </Text>
      <Text color="gray.500" fontSize={22} mb={isWideVersion ? 12 : 2}>
        {author}
      </Text>
      <Text
        fontSize={isWideVersion ? 32 : 22}
        fontWeight="thin"
        textColor="white"
      >
        {post.body}
      </Text>
      <Box mt={20}>
        <Text m={6} textAlign="center" fontWeight="bold" fontSize={22}>
          Comentários
        </Text>
        {loading && (
          <Center>
            <Spinner size="xl" color="primaryGreen" />
          </Center>
        )}
        {comments.map(comment => (
          <CommentBox
            key={comment.id}
            body={comment.body}
            name={comment.name}
            email={comment.email}
          />
        ))}
      </Box>
    </Box>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await api.get('/posts');

  const paths = posts.data.map((post: { id: number }) => {
    return {
      params: {
        slug: String(post.id)
      }
    };
  });

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const { data } = await api.get('posts');

  const post = data.find((post: { id: number }) => String(post.id) === slug);

  return {
    props: {
      post: post
    },
    revalidate: 1800
  };
};

export default Post;

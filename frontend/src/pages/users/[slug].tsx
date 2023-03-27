import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';
import CardUser from '../../components/CardUser';
import Header from '../../components/Header';
import PostResume from '../../components/PostResume';
import { usePosts } from '../../hooks/usePosts';
import { api } from '../../services/axios';

interface UserProps {
  user: {
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
  };
}

function User({ user }: UserProps) {
  const [loading, seLoading] = useState(true);
  const { posts, loadPosts } = usePosts();
  const userPosts = posts.filter(posts => Number(posts.userId) == user.id);
  const router = useRouter();
  if (router.isFallback) {
    return (
      <Text>
        <Spinner /> Carregando
      </Text>
    );
  }
  useEffect(() => {
    loadPosts();
    seLoading(false);
  }, []);
  return (
    <Box
      w="full"
      textAlign="left"
      color="white"
      padding="4rem 10rem"
      bgColor="gray.800"
    >
      <BackButton />
      <Text fontSize={24} textAlign="center">
        Todas as publicações de <strong>{user.name}</strong>
      </Text>
      {loading && (
        <Center>
          <Spinner size="xl" color="primaryGreen" />
        </Center>
      )}
      {userPosts.map(post => (
        <PostResume
          key={post.id}
          author={post.author}
          comments={post.comments}
          content={post.body}
          hastags={post.hastags}
          date={new Date()}
          id={post.id}
          liked={post.liked}
          title={post.title}
          saved={post.saved}
          unLiked={post.unLiked}
          userId={post.userId}
        />
      ))}
    </Box>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await api.get('/posts');

  const paths = posts.data.map((post: { userId: number }) => {
    return {
      params: {
        slug: String(post.userId)
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

  const { data } = await api.get(`/users/${slug}`);

  const user: UserProps = data;

  return {
    props: {
      user: user
    },
    revalidate: 1800
  };
};

export default User;

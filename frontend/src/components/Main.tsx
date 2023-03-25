import { Box, Button, Center, Flex, Spinner, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import Header from './Header';
import PostResume from './PostResume';

export default function Main() {
  const { loadPosts, posts } = usePosts();
  const [loadedPosts, setLoadedPost] = useState([]);
  const [loading, setLoading] = useState(true);

  function loadMorePosts() {
    const startIndex = loadedPosts.length;
    const endIndex = startIndex + 10;
    const newPosts = posts.slice(startIndex, endIndex);
    setLoadedPost([...loadedPosts, ...newPosts]);
  }

  loadPosts();
  useEffect(() => {
    setLoadedPost(posts.slice(0, 10));
    setLoading(false);
  }, []);

  return (
    <VStack
      w="full"
      padding={10}
      h="100vh"
      overflowY="scroll"
      gap={0}
      spacing={0}
    >
      <Header />
      {loading && (
        <Box w="full" h="100vh">
          <Center w="full" h="full">
            <Spinner size="xl" color="primaryGreen" />
          </Center>
        </Box>
      )}
      {loadedPosts.map(post => (
        <PostResume
          id={post.id + 3}
          key={post.id}
          title={post.title}
          author={post.author ? post.author : ''}
          content={post.body}
          hastags={post.hastags}
          userId={post.userId}
          liked={post.liked}
          unLiked={post.unLiked}
          saved={post.saved}
          comments={post.comments}
          date={post.date}
        />
      ))}
      <Flex w="full" h={20} justifyContent="center" padding={10}>
        <Button onClick={loadMorePosts}>Carregar mais posts</Button>
      </Flex>
    </VStack>
  );
}

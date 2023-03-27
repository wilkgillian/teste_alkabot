import {
  Box,
  Center,
  Container,
  Spinner,
  useBreakpointValue
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import NavLinks from '../components/NavLinks';
import PostResume from '../components/PostResume';
import Sidebar from '../components/Sidebar';
import { usePosts } from '../hooks/usePosts';

function Trending() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });
  const [loading, setLoading] = useState(true);
  const { posts, loadPosts } = usePosts();
  const trendingPosts = posts.slice(0, 10);
  useEffect(() => {
    loadPosts();
    setLoading(false);
  }, []);
  return (
    <Container
      w="full"
      h="100vh"
      maxW={1300}
      display={isWideVersion ? 'flex' : 'block'}
      bgColor="gray.800"
    >
      {loading && (
        <Center>
          <Spinner size="xl" color="primaryGreen" />
        </Center>
      )}
      {isWideVersion ? (
        <Sidebar />
      ) : (
        <>
          <Header />
          <NavLinks
            flexDir="row"
            w="full"
            justifyContent="space-between"
            alignItems="end"
            mt={-14}
          />
        </>
      )}
      <Box w="full" h="100vh" overflowY="scroll" padding={4}>
        {isWideVersion && <Header />}
        {trendingPosts.map(post => (
          <PostResume
            key={post.id}
            author={post.author}
            comments={post.comments}
            content={post.body}
            date={post.date}
            hastags={post.hastags}
            id={post.id}
            liked={post.liked}
            saved={post.saved}
            title={post.title}
            unLiked={post.unLiked}
            userId={post.userId}
          />
        ))}
      </Box>
    </Container>
  );
}

export default Trending;

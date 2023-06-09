import {
  Box,
  Button,
  Center,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useBreakpointValue
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavLinks from '../components/NavLinks';
import PostResume from '../components/PostResume';
import Sidebar from '../components/Sidebar';
import { usePosts } from '../hooks/usePosts';

function Search() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });
  const { posts, loadPosts } = usePosts();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  function filterPosts(value: string) {
    setLoading(true);
    const filtered = posts.filter(posts =>
      posts.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPosts(filtered);
    setLoading(false);
  }
  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <Container
      w="full"
      maxW={1300}
      h="100vh"
      display={isWideVersion ? 'flex' : 'block'}
      bgColor="gray.800"
    >
      {isWideVersion ? (
        <Sidebar />
      ) : (
        <NavLinks
          flexDir="row"
          w="full"
          justifyContent="space-between"
          alignItems="end"
        />
      )}
      <Box w="full" h="100vh" overflowY="scroll" padding={4}>
        <InputGroup size="md" w="90%" m="2rem auto">
          <Input
          textColor="white"
            pr="4.5rem"
            type="text"
            placeholder="Buscar post"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => filterPosts(value)}>
              Buscar
            </Button>
          </InputRightElement>
        </InputGroup>
        {loading && (
          <Center>
            <Spinner size="xl" color="primaryGreen" />
          </Center>
        )}
        {filteredPosts.map(post => (
          <PostResume
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
            key={post.id}
          />
        ))}
      </Box>
    </Container>
  );
}

export default Search;

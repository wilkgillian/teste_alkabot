import { useBreakpointValue } from '@chakra-ui/react';
import { Container } from '../components/Container';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';

function Index() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });
  return (
    <Container>
      {isWideVersion && <Sidebar />}
      <Main />
    </Container>
  );
}

export default Index;

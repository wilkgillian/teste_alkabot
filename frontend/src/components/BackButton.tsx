import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';

function BackButton() {
  const router = useRouter();

  function gotToBack() {
    router.back();
  }
  return (
    <Button
      leftIcon={<BiArrowBack />}
      onClick={gotToBack}
      variant="ghost"
      bgColor="primaryGreen"
      textColor="white"
    >
      Voltar
    </Button>
  );
}

export default BackButton;

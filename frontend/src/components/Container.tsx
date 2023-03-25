import { Box, Flex, BoxProps } from '@chakra-ui/react';

export const Container = (props: BoxProps) => (
  <Box
    w="full"
    maxW={1300}
    display="flex"
    flexDir="row"
    h="100vh"
    bgColor="gray.800"
    color="green.400"
    margin="auto"
    {...props}
  />
);

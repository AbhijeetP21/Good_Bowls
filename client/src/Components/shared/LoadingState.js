/**
 * Loading State Component
 * Displays a loading spinner with optional message
 */
import React from 'react';
import { Center, Spinner, VStack, Text } from '@chakra-ui/react';

const LoadingState = ({ message = 'Loading...', size = 'xl', minH = '200px' }) => {
  return (
    <Center minH={minH} w="full">
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="orange.500"
          size={size}
        />
        {message && (
          <Text color="gray.600" fontSize="md">
            {message}
          </Text>
        )}
      </VStack>
    </Center>
  );
};

export default LoadingState;

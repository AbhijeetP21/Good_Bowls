/**
 * Error State Component
 * Displays an error message with optional retry action
 */
import React from 'react';
import {
  Center,
  VStack,
  Text,
  Button,
  Icon,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { WarningCircle } from 'phosphor-react';

const ErrorState = ({
  title = 'Something went wrong',
  message = 'An error occurred while loading the data.',
  onRetry,
  retryText = 'Try Again',
  minH = '200px',
}) => {
  const bgColor = useColorModeValue('red.50', 'red.900');
  const textColor = useColorModeValue('red.600', 'red.200');

  return (
    <Center minH={minH} w="full">
      <Box
        bg={bgColor}
        p={8}
        borderRadius="lg"
        maxW="md"
        textAlign="center"
      >
        <VStack spacing={4}>
          <Icon as={WarningCircle} weight="fill" boxSize={12} color="red.500" />
          <VStack spacing={1}>
            <Text fontSize="lg" fontWeight="semibold" color={textColor}>
              {title}
            </Text>
            <Text color="gray.600" fontSize="sm">
              {message}
            </Text>
          </VStack>
          {onRetry && (
            <Button
              colorScheme="red"
              variant="outline"
              onClick={onRetry}
              size="sm"
            >
              {retryText}
            </Button>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default ErrorState;

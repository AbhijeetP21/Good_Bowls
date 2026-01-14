/**
 * Empty State Component
 * Displays when there's no data to show
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
import { Tray } from 'phosphor-react';

const EmptyState = ({
  title = 'No data found',
  message = 'There are no items to display.',
  icon = Tray,
  actionText,
  onAction,
  minH = '200px',
}) => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const iconColor = useColorModeValue('gray.400', 'gray.500');

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
          <Icon as={icon} weight="light" boxSize={16} color={iconColor} />
          <VStack spacing={1}>
            <Text fontSize="lg" fontWeight="semibold" color="gray.700">
              {title}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {message}
            </Text>
          </VStack>
          {onAction && actionText && (
            <Button
              colorScheme="orange"
              onClick={onAction}
              size="sm"
            >
              {actionText}
            </Button>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default EmptyState;

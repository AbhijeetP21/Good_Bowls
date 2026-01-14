import {
	Box,
	Text,
	VStack,
	HStack,
	Badge,
	Divider,
	Flex
} from '@chakra-ui/react';
import React from 'react';

export default function OrderDisplay({ order }) {
	return (
		<Box
			bg="white"
			border="1px"
			borderColor="gray.200"
			borderRadius='lg'
			shadow='sm'
			overflow="hidden"
			transition="all 0.2s"
			_hover={{ shadow: 'md', borderColor: 'brand.200' }}
		>
			{/* Header */}
			<Flex bg="gray.50" p={4} justify="space-between" align="center" borderBottom="1px" borderColor="gray.100">
				<VStack align="start" spacing={0}>
					<Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="bold">Order Date</Text>
					<Text fontSize="sm" fontWeight="medium">{order.createdAt.substring(0, 10)}</Text>
				</VStack>
				<Badge colorScheme={order.isDelivered ? 'green' : 'orange'} variant="solid" px={2} py={1} borderRadius="md">
					{order.isDelivered ? 'Delivered' : 'Processing'}
				</Badge>
			</Flex>

			{/* Body */}
			<Box p={4}>
				<VStack align="stretch" spacing={4}>
					{/* Items */}
					<Box>
						<Text fontSize="sm" fontWeight="bold" color="gray.500" mb={2}>ITEMS</Text>
						<VStack align="stretch" spacing={2}>
							{order.orderItems.map((item, index) => (
								<Flex key={index} justify="space-between" fontSize="sm">
									<Text>{item.name} <Text as="span" color="gray.500" fontSize="xs">({item.varient})</Text> x{item.quantity}</Text>
									<Text fontWeight="medium">${item.price}</Text>
								</Flex>
							))}
						</VStack>
					</Box>

					<Divider />

					{/* Address */}
					<Box>
						<Text fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>SHIPPING ADDRESS</Text>
						<Text fontSize="sm" color="gray.700">{order.shippingAddress}</Text>
					</Box>

					<Divider />

					{/* Total */}
					<Flex justify="space-between" align="center" pt={2}>
						<VStack align="start" spacing={0}>
							<Text fontSize="xs" color="gray.500">ORDER ID</Text>
							<Text fontSize="xs" fontFamily="mono">{order._id || order.orderId}</Text>
						</VStack>
						<Text fontSize="xl" fontWeight="bold" color="brand.600">${order.orderAmount}</Text>
					</Flex>
				</VStack>
			</Box>
		</Box>
	);
}

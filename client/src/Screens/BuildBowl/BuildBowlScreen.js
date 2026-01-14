import React from 'react';
import { Box } from '@chakra-ui/react';
import BuildBowl from '../../Components/BuildBowl/BuildBowl';
import NavbarModern from '../../Components/Navbar/NavbarModern';

export default function BuildBowlScreen() {
	return (
		<Box minH="100vh" bg="gray.50">
			<NavbarModern />
			<BuildBowl />
		</Box>
	);
}

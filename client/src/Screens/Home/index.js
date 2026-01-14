import React from 'react';
import { Box } from '@chakra-ui/react';
import NavbarModern from '../../Components/Navbar/NavbarModern';
import BowlDisplayModern from '../../Components/BowlDisplay/BowlDisplayModern';

function Home() {
	return (
		<Box minH="100vh" bg="gray.50">
			<NavbarModern />
			<BowlDisplayModern />
		</Box>
	);
}

export default Home;

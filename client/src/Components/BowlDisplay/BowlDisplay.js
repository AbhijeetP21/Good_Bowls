import { Button, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Pizza as PizzaIcon } from 'phosphor-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllBowls } from '../../actions/bowlActions';
import BowlCard from '../BowlCard/BowlCard';
import './styles.css';
export default function BowlDisplay() {
	const dispatch = useDispatch();

	const bowlstate = useSelector((state) => state.getAllBowls);

	const { bowls, error, loading } = bowlstate;

	useEffect(() => {
		dispatch(getAllBowls());
	}, [dispatch]);
	return (
		<Flex
			display='flex'
			flexDirection={'column'}
			alignItems='center'
			justifyContent='center'
			width='full'
		>
			{loading ? (
				<h1>Loading</h1>
			) : error ? (
				<h1>Something went wrong</h1>
			) : (
				<>
					<SimpleGrid
						columns={[1, 1, 2, 3]}
						width='full'
						margin={5}
						alignItems={'center'}
						justifyContent={'center'}
						spacing={[5, 5, 10, 10]}
					>
						{bowls.map((bowl) => {
							return (
								<Flex
									width={'full'}
									alignItems={'center'}
									justifyContent='center'
								>
									<BowlCard key={bowl._id} bowl={bowl} />
								</Flex>
							);
						})}
					</SimpleGrid>
					<Flex
						width='100%'
						backgroundColor='#b33030'
						padding='20px'
						justifyContent='center'
					>
						<VStack>
							<Text
								fontSize='3xl'
								textAlign='center'
								color='white'
							>
								Want to make your own bowl??
							</Text>
							<Link to='/build-bowl'>
								<Button
									color='#b33030'
									padding='10px'
									height='70px'
									width='300px'
									fontSize='20px'
								>
									Click here
									<PizzaIcon size={32} color='#b33030' />
								</Button>
							</Link>
						</VStack>
					</Flex>
				</>
			)}
		</Flex>
	);
}

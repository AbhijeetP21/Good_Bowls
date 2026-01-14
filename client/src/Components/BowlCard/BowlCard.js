import { Box, Button, Image, Select, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
export default function BowlCard({ bowl }) {
	const [show, setShow] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [varient, setVarient] = useState('small');

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const dispatch = useDispatch();
	function addtocart() {
		dispatch(addToCart(bowl, quantity, varient));
	}

	return (
		<>
			<Box
				boxShadow='lg'
				maxW='sm'
				borderWidth='1px'
				borderRadius='lg'
				overflow='hidden'
			>
				<Text onClick={handleShow} textAlign='center' fontSize='3xl'>
					{bowl.name}
				</Text>
				<Image
					onClick={handleShow}
					src={bowl.image}
					width='200px'
					height='200px'
					marginLeft='80px'
				/>

				<Box p='6'>
					<Box display='flex' alignItems='baseline'>
						<Text fontSize='1xl' padding='5px'>
							Sizes:
						</Text>
						<Select
							value={varient}
							onChange={(e) => {
								setVarient(e.target.value);
							}}
							size='sm'
							placeholder='Select'
						>
							{bowl.varients.map((varient) => {
								return (
									<option key={varient} value={varient}>
										{varient}
									</option>
								);
							})}
						</Select>
						<Text fontSize='1xl' padding='5px'>
							Quantity:
						</Text>
						<Select
							size='sm'
							value={quantity}
							onChange={(e) => {
								setQuantity(e.target.value);
							}}
							placeholder='Select '
						>
							{[...Array(10).keys()].map((x, i) => {
								return (
									<option key={i} value={i + 1}>
										{i + 1}
									</option>
								);
							})}
						</Select>
					</Box>
					<Box padding={1}>
						<Box display='flex' alignItems='baseline'>
							<Text fontSize='20px' fontWeight='bold' width='50%'>
								Price:{' '}
								{bowl.prices[0][varient] * quantity + ' '}
								Rs/-
							</Text>

							<Button
								width='50%'
								backgroundColor='#b33030'
								color='white'
								_hover={{ bg: '#FF7272' }}
								onClick={addtocart}
							>
								ADD TO CART
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{bowl.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Image
						src={bowl.image}
						width='300px'
						height='300px'
						marginLeft='80px'
					/>
					<Text fontSize='1xl' textAlign='center'>
						{bowl.description}
					</Text>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

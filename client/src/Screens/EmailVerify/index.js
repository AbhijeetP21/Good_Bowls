import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import { API_BASE_URL } from '../../config/api';
import { Box, Icon, VStack, Heading, Button } from '@chakra-ui/react';
import { CheckCircle } from 'phosphor-react';
import styles from './styles.module.css';

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const { id, token } = useParams();

	useEffect(() => {
		return async () => {
			if (id && token) {
				const url = `${API_BASE_URL}/users/${id}/verify/${token}`;
				const { data } = await axios.get(url);
				if (data?.success) {
					alert(data?.message);
					setValidUrl(true);
				} else {
					setValidUrl(false);
				}
			}
		};
	}, [id, token]);

	return (
		<Fragment>
			{validUrl ? (
				<Box className={styles.container} textAlign="center" py={10}>
					<VStack spacing={6}>
						<Icon as={CheckCircle} w={24} h={24} color="green.500" weight="fill" />
						<Heading size="lg" color="gray.700">Email verified successfully</Heading>
						<Link to='/login'>
							<Button colorScheme="green" size="lg">Login</Button>
						</Link>
					</VStack>
				</Box>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default EmailVerify;


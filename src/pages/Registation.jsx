import React, { useState, useEffect } from 'react';
import { Button, Box } from '@chakra-ui/react';
import { SigninForm } from '../components/SignInForm/SignInForm';
import { SignUpForm } from '../components/SignUpForm/SignUpForm';
import { useNavigate } from 'react-router-dom';


export const Registration = () => {
	const [authType, setAuthType] = useState('signin');
	const navigate = useNavigate();


	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/todolist');
		}
	}, []);

	return (
		<>
			<Box display="flex" width="70%" justifyContent="space-evenly">
				<Button
					width="30%"
					backgroundColor={authType === 'signin' && '#B9929F'}
					onClick={() => setAuthType('signin')}
				>
					Signin
				</Button>

				<Button
					width="30%"
					backgroundColor={authType === 'signup' && '#B9929F'}
					onClick={() => setAuthType('signup')}
				>
					Signup
				</Button>
			</Box>
			{authType === 'signin' && <SigninForm />}
			{authType === 'signup' && <SignUpForm />}
		</>
	);
};

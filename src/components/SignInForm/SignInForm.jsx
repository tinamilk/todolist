import React, { useState } from 'react';
import {
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	Button,
} from '@chakra-ui/react';
import { useSigninMutation } from '../../store/userApi/userApi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setModalActive } from '../../store/modal/modal';
import { setUser } from '../../store/tasksQuery/tasksQuery';

export const SigninForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isEmailEmpty, setisEmailEmpty] = useState(false);
	const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
	const [token, setToken] = useState('');
	const [signin] = useSigninMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (token) {
			localStorage.setItem('token', token);
			navigate('/todolist');
		}
	}, [token]);

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	const handleSignIn = async () => {
		setIsPasswordEmpty(!password);
		setisEmailEmpty(!email);

		if (password && email) {
			const body = {
				email: email,
				password: password,
			};

			await signin(body)
				.unwrap()
				.then((res) => {
					setToken(res.accessToken);
					dispatch(setUser(res.name));
				})
				.catch(() => dispatch(setModalActive('Invalid password or email')));
		}
	};

	return (
		<FormControl width="70%">
			<FormLabel>Email</FormLabel>
			<Input
				autoFocus
				size="lg"
				border="2px solid #197278"
				borderRadius="10px"
				height="40px"
				_focus={{
					border: '3px solid #197278',
					boxShadow: 'none',
				}}
				_hover={{
					border: '2px solid #197278',
				}}
				type="email"
				value={email}
				onChange={handleEmailChange}
				isInvalid={isEmailEmpty}
			/>
			{!isEmailEmpty ? (
				<FormHelperText>Enter the email.</FormHelperText>
			) : (
				<FormHelperText color="red">Email is required.</FormHelperText>
			)}
			<FormLabel>Password</FormLabel>
			<Input
				size="lg"
				border="2px solid #197278"
				borderRadius="10px"
				height="40px"
				_focus={{
					border: '3px solid #197278',
					boxShadow: 'none',
				}}
				_hover={{
					border: '2px solid #197278',
				}}
				type="password"
				value={password}
				onChange={handlePasswordChange}
				isInvalid={isPasswordEmpty}
			/>
			{!isPasswordEmpty ? (
				<FormHelperText>Enter the password.</FormHelperText>
			) : (
				<FormHelperText color="red">Password is required.</FormHelperText>
			)}

			<Button width="40%" onClick={handleSignIn}>
				Login
			</Button>
		</FormControl>
	);
};

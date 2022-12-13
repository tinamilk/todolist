/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	FormErrorMessage,
	Button,
} from '@chakra-ui/react';
import { useSignupMutation } from '../../store/userApi/userApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setModalActive } from '../../store/modal/modal';
import { setUser } from '../../store/tasksQuery/tasksQuery';

export const SignUpForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userName, setUserName] = useState('');
	const [isEmailEmpty, setisEmailEmpty] = useState(false);
	const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
	const [isUserNameEmpty, setIsUserNameEmpty] = useState(false);
	const [token, setToken] = useState('');
	const [signup] = useSignupMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (token) {
			localStorage.setItem('token', token);
			navigate('/todolist');
		}
		setEmail('');
		setPassword('');
		setUserName('');
	}, [token]);

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);
	const handleUserNameChange = (e) => setUserName(e.target.value);

	const handleSignUp = async () => {
		setIsPasswordEmpty(!password);
		setisEmailEmpty(!email);
		setIsUserNameEmpty(!userName);

		console.log(userName);

		if (password && email && userName) {
			const body = {
				userName,
				email,
				password,
			};

			await signup(body)
				.unwrap()
				.then((res) => {
					setToken(res.accessToken);
					dispatch(setUser(res.name));
				})
				.catch(() => dispatch(setModalActive('Email is already in use')));
		}
	};

	return (
		<FormControl
			width="70%"
			isInvalid={isEmailEmpty || isPasswordEmpty || isUserNameEmpty}
		>
			<FormLabel>Your name</FormLabel>
			<Input
				autoFocus
				size="lg"
				border={isUserNameEmpty ? '2px solid red' : '2px solid #197278'}
				borderRadius="10px"
				height="40px"
				_focus={{
					border: '3px solid #197278',
					boxShadow: 'none',
				}}
				_hover={{
					border: '2px solid #197278',
				}}
				type="text"
				value={userName}
				onChange={handleUserNameChange}
			/>
			{!isPasswordEmpty ? (
				<FormHelperText>Enter the name.</FormHelperText>
			) : (
				<FormErrorMessage>Name is required.</FormErrorMessage>
			)}
			<FormLabel>Email</FormLabel>
			<Input
				size="lg"
				border={isEmailEmpty ? '2px solid red' : '2px solid #197278'}
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
			/>
			{!isEmailEmpty ? (
				<FormHelperText>Enter the email.</FormHelperText>
			) : (
				<FormErrorMessage>Email is required.</FormErrorMessage>
			)}
			<FormLabel>Password</FormLabel>
			<Input
				size="lg"
				border={isPasswordEmpty ? '2px solid red' : '2px solid #197278'}
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
			/>
			{!isPasswordEmpty ? (
				<FormHelperText>Enter the passsword.</FormHelperText>
			) : (
				<FormErrorMessage>Password is required.</FormErrorMessage>
			)}

			<Button width="40%" onClick={handleSignUp}>
				Signup
			</Button>
		</FormControl>
	);
};

// Login modal

import { useMutation } from '@apollo/client'
import {
	Button,
	Container,
	FormControl,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'
import { LoginUserDocument } from './gql/graphql'
import { LoginModalProps } from './types'

export const Login: React.FC<LoginModalProps> = ({ isOpen, onClose, setIsLoggedIn }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
	const [loginUser] = useMutation(LoginUserDocument)

	React.useEffect(() => {
		return () => {
			setUsername('')
			setPassword('')
		}
	}, [])

	const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		let res
		try{
			res = await loginUser({variables: {email: username, password: password}})
			console.log('res:', res)
			if(res.data?.loginUser?.token) {
				setIsLoggedIn(true)
				localStorage.setItem('token', res.data.loginUser.token)}
		}catch(err){
			console.log("Error:",err)
		}
		console.log(username)
		console.log(password)
		onClose()
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Container>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign={'center'}>
						<Heading>Login</Heading>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={(e)=>submit(e)}>
							<FormControl>
								<Input placeholder="Email" value={username} onChange={(e)=>setUsername(e.target.value)}/>
							</FormControl>
							<FormControl>
								<Input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
							</FormControl>
							<Button type="submit">Login</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Container>
		</Modal>
	)
}

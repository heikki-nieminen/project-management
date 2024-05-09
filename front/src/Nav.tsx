import { Button, Container, useColorMode, useDisclosure } from '@chakra-ui/react'
import { Login } from './Login'
import React from 'react'
import { NavProps } from './types'
import { Link } from 'react-router-dom'

export const Nav: React.FC<NavProps> = ({ isLoggedIn, setIsLoggedIn }) => {
	const { colorMode, toggleColorMode } = useColorMode()
	const { isOpen, onOpen, onClose } = useDisclosure()

	const handleLogout = () => {
		localStorage.removeItem('token')
		setIsLoggedIn(false)
	}

	return (
		<Container id="nav" display={'flex'} justifyContent={'space-between'} maxW={'100%'} mt={1} position={'fixed'}>
			<Container id="leftSide" display={'flex'} justifyContent={'flex-start'}>
				<Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
				{isLoggedIn && (
					<Button as={Link} to={'/'}>
						Projects
					</Button>
				)}
			</Container>
			<Container id="rightSide" display={'flex'} justifyContent={'flex-end'}>
				{!isLoggedIn ? (
					<Button onClick={onOpen} justifySelf={'right'}>
						Login
					</Button>
				) : (
					<Button onClick={handleLogout} justifySelf={'right'}>
						Logout
					</Button>
				)}
			</Container>

			{isOpen && <Login isOpen={isOpen} onClose={onClose} setIsLoggedIn={setIsLoggedIn} />}
		</Container>
	)
}

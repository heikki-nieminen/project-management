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
import { NewProjectProps, ProjectType, Projects } from './types'

export const NewProject: React.FC<NewProjectProps> = ({ isOpen, onClose, setProjects }) => {
	const [name, setName] = React.useState('')
	const [description, setDescription] = React.useState('')

	const submit = async () => {
		console.log('TEST')
		// TODO: implement the submit of the new project

		// You can use the setProjects function to add the new project to the list of projects

		// You can use the onClose function to close the modal

		setProjects((prevProjects) => {
			return [
				...prevProjects,
				{
					id: prevProjects.length + 1,
					name: name,
					description: description,
					totalTimeSpent: 0,
					tasks: [],
				},
			]
		})
    onClose()
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Container>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign={'center'}>
						<Heading>New Project</Heading>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form
							onSubmit={(e) => {
								e.preventDefault()
								submit()
							}}
						>
							<FormControl>
								<Input placeholder="Project name" value={name} onChange={(e) => setName(e.target.value)} required />
							</FormControl>
							<FormControl mt={2}>
								<Input
									placeholder="Project description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									required
								/>
							</FormControl>
							<Button type={'submit'} mt={2} mb={2}>
								Add new project
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Container>
		</Modal>
	)
}

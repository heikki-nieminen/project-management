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
import { CreateProjectDocument } from './gql/graphql'
import { useMutation } from '@apollo/client'

export const NewProject: React.FC<NewProjectProps> = ({ isOpen, onClose, addProject}) => {
	const [name, setName] = React.useState('')
	const [description, setDescription] = React.useState('')
	const [createProject] = useMutation(CreateProjectDocument)
	
	const submit = async () => {
		console.log('TEST')
		// Make addProjectMutation and get id from it
		try{
			const res = await createProject({
				variables: {
					name: name,
					description: description,
				},
			})
			console.log(res)
			if(res.data?.createProject){
				addProject({...res.data?.createProject, todoCount: 0, inProgressCount: 0, doneCount: 0, tasks: []})
			}
		} catch (err) {
			console.log(err)
		}
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

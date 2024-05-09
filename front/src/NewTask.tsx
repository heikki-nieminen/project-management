import { useMutation } from '@apollo/client'
import {
	Button,
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
import { CreateTaskDocument, Task } from './gql/graphql'

type NewTaskProps = {
	open: boolean
	setOpen: (open: boolean) => void
	projectId: string
	addTask: (task: Task) => void
}

export const NewTask: React.FC<NewTaskProps> = ({ open, setOpen, projectId, addTask }) => {
	const [name, setName] = React.useState('')
	const [description, setDescription] = React.useState('')
	const [createTask] = useMutation(CreateTaskDocument)
	const onClose = () => {
		setOpen(false)
	}

	const submit = async () => {
		try {
			const res = await createTask({
				variables: {
					name: name,
					description: description,
					project_id: projectId,
				},
			})
			if (res.data?.createTask) {
				addTask(res.data?.createTask)
			}
		} catch (err) {
			console.log(err)
		}

		onClose()
	}

	return (
		<Modal isOpen={open} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign="center">
					<Heading>New Task</Heading>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Input placeholder="Task Name" onChange={(e) => setName(e.target.value)} />
					<Input placeholder="Task Description" mt={2} onChange={(e) => setDescription(e.target.value)} />
					<Button width={'full'} variant={'solid'} mt={4} onClick={submit}>
						Add Task
					</Button>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

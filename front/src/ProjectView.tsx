// Split into 3 columns: Todo, In Progress, Done
//  - Each column should contain a list of tasks
//  - Each task should contain a title
//  - clicking on a task should open a accordion with the task's description and time spent
//  - First column should contain a button to add a new task
//  - Dragging a task from one column to another should update the task's status

import {
	Accordion,
	Box,
	Button,
	Center,
	Container,
	Grid,
	GridItem,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { ProjectProps } from './types'
import { Project, ProjectTasksDocument, ProjectTasksQuery, Task, UpdateTaskDocument } from './gql/graphql'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { StrictModeDroppable } from './assets/StrictModeDroppable'
import { NewTask } from './NewTask'

export const ProjectView: React.FC<ProjectProps> = () => {
	// TODO: Re-check task indexing when moving

	const { projectId } = useParams()
	const { error, loading, data } = useQuery<ProjectTasksQuery>(ProjectTasksDocument, {
		variables: {
			projectId: projectId,
		},
	})

	if (error) {
		console.log(error)
	}

	const project = data?.projectTasks || { name: '', tasks: [] }

	// Sort tasks by order
	const todoTasks = project.tasks
		.filter((task) => task.state === 'todo')
		.sort((a, b) =>
			a.order !== null && b.order !== null && a.order !== undefined && b.order !== undefined ? a.order - b.order : 0
		)
	const inProgressTasks = project.tasks
		.filter((task) => task.state === 'in-progress')
		.sort((a, b) =>
			a.order !== null && b.order !== null && a.order !== undefined && b.order !== undefined ? a.order - b.order : 0
		)
	const doneTasks = project.tasks
		.filter((task) => task.state === 'done')
		.sort((a, b) =>
			a.order !== null && b.order !== null && a.order !== undefined && b.order !== undefined ? a.order - b.order : 0
		)

	const [todo, setTodo] = React.useState(todoTasks)
	const [inProgress, setInProgress] = React.useState(inProgressTasks)
	const [done, setDone] = React.useState(doneTasks)

	const [dataLoaded, setDataLoaded] = React.useState(false)

	const [newTaskOpen, setNewTaskOpen] = React.useState(false)

	const [updateTask] = useMutation(UpdateTaskDocument)

	const bg = useColorModeValue('brand.50', 'brand.200')

	React.useEffect(() => {
		if(data && !dataLoaded) {
			setTodo(todoTasks)
			setInProgress(inProgressTasks)
			setDone(doneTasks)
			setDataLoaded(true)
		}
	}, [data])

	// Find correct list by taskid
	const findList = (id: string) => {
		if (id === 'todo') {
			return todo
		} else if (id === 'in-progress') {
			return inProgress
		}
		return done
	}

	const addTask = (task: Task) => {
		setTodo([...todo, task])
	}

	const updateTaskQuery = async (task: Task, newState: string, order: number) => {
		try {
			 await updateTask({
				variables: {
					updateTaskId: task.id,
					name: task.name,
					description: task.description,
					state: newState,
					order: order,
				},
			})
		} catch (error) {
			console.log('ERROR:', error)
		}
	}

	// Handle drag and drop events
	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return
		}

		const { source, destination, draggableId } = result

		if (source.droppableId === destination.droppableId) {
			// Reorder within the same list
			const list = findList(source.droppableId)
			let reorderedTasks = [...list]
			const [removed] = reorderedTasks.splice(source.index, 1)
			reorderedTasks.splice(destination.index, 0, { ...removed, order: destination.index })

			// Update the order property of tasks in the list
			const updatedTasks = reorderedTasks.map((task, index) => {
				return { ...task, order: index }
			})

			console.log('updatedTasks:', updatedTasks)

			// Update the corresponding state and make update query for each task in list
			if (source.droppableId === 'todo') {
				updatedTasks.forEach((task) => {
					updateTaskQuery(task, 'todo', task.order)
				})
				setTodo(updatedTasks)
			} else if (source.droppableId === 'in-progress') {
				updatedTasks.forEach((task) => {
					updateTaskQuery(task, 'in-progress', task.order)
				})
				setInProgress(updatedTasks)
			} else if (source.droppableId === 'done') {
				updatedTasks.forEach((task) => {
					updateTaskQuery(task, 'done', task.order)
				})
				setDone(updatedTasks)
			}
		} else {
			// Move between lists
			const sourceList = findList(source.droppableId)
			const destinationList = findList(destination.droppableId)
			const [removed] = sourceList.splice(source.index, 1)

			// Update the order property of the removed task
			const updatedTask = { ...removed, order: destination.index }
			destinationList.splice(destination.index, 0, updatedTask)

			// Update the order property of tasks in the source list
			const updatedSourceList = sourceList.map((task, index) => {
				return { ...task, order: index }
			})

			// Update the order property of tasks in the destination list
			const updatedDestinationList = destinationList.map((task, index) => {
				return { ...task, order: index }
			})

			// Update the corresponding states and make update query for each task in list
			if (source.droppableId === 'todo') {
				updatedSourceList.forEach((task) => {
					updateTaskQuery(task, 'todo', task.order)
				})
				setTodo([...updatedSourceList])
			} else if (source.droppableId === 'in-progress') {
				updatedSourceList.forEach((task) => {
					updateTaskQuery(task, 'in-progress', task.order)
				})
				setInProgress([...updatedSourceList])
			} else if (source.droppableId === 'done') {
				updatedSourceList.forEach((task) => {
					updateTaskQuery(task, 'done', task.order)
				})
				setDone([...updatedSourceList])
			}

			if (destination.droppableId === 'todo') {
				updatedDestinationList.forEach((task) => {
					updateTaskQuery(task, 'todo', task.order)
				})
				setTodo([...updatedDestinationList])
			} else if (destination.droppableId === 'in-progress') {
				updatedDestinationList.forEach((task) => {
					updateTaskQuery(task, 'in-progress', task.order)
				})
				setInProgress([...updatedDestinationList])
			} else if (destination.droppableId === 'done') {
				updatedDestinationList.forEach((task) => {
					updateTaskQuery(task, 'done', task.order)
				})
				setDone([...updatedDestinationList])
			}
		}
	}

	return (
		<Container maxW="container.xl">
			<Center>
				<Heading>{project.name}</Heading>
			</Center>

			<Grid templateColumns="repeat(3, 1fr)">
				<DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
					<GridItem>
						<Heading as={'h3'} size={'lg'} textAlign={'center'}>
							Todo
						</Heading>
						<StrictModeDroppable droppableId="todo">
							{(provided, snapshot) => (
								<div ref={provided.innerRef} {...provided.droppableProps}>
									<Box width={'100%'} minHeight={'50vh'} bg={snapshot.isDraggingOver ? bg : 'none'}>
										{todo.map((task, index) => (
											<SingleTask key={task.id} index={index} {...task} />
										))}
										{provided.placeholder}
									</Box>
								</div>
							)}
						</StrictModeDroppable>
					</GridItem>
					<GridItem>
						<Heading as={'h3'} size={'lg'} textAlign={'center'}>
							In Progress
						</Heading>
						<StrictModeDroppable droppableId="in-progress">
							{(provided, snapshot) => (
								<div ref={provided.innerRef} {...provided.droppableProps}>
									<Box width={'100%'} minHeight={'50vh'} bg={snapshot.isDraggingOver ? bg : 'none'}>
										{inProgress.map((task, index) => (
											<SingleTask key={task.id} index={index} {...task} />
										))}
										{provided.placeholder}
									</Box>
								</div>
							)}
						</StrictModeDroppable>
					</GridItem>
					<GridItem id="done">
						<Heading as={'h3'} size={'lg'} textAlign={'center'}>
							Done
						</Heading>
						<StrictModeDroppable droppableId="done">
							{(provided, snapshot) => (
								<div ref={provided.innerRef} {...provided.droppableProps}>
									<Box width={'100%'} minHeight={'50vh'} bg={snapshot.isDraggingOver ? bg : 'none'}>
										{done.map((task, index) => (
											<SingleTask key={task.id} index={index} {...task} />
										))}
										{provided.placeholder}
									</Box>
								</div>
							)}
						</StrictModeDroppable>
					</GridItem>
				</DragDropContext>
			</Grid>
			<Center mt={4}>
				<Button width={'full'} variant={'solid'} onClick={() => setNewTaskOpen(true)}>
					Add new task
				</Button>
			</Center>
			<NewTask open={newTaskOpen} setOpen={setNewTaskOpen} projectId={projectId as string} addTask={addTask} />
		</Container>
	)
}

// TODO: make task expandable

type TaskWithIndex = Task & { index: number }
export const SingleTask: React.FC<TaskWithIndex> = ({ id = '0', name, description, time_spent, index }) => {
	const bg = useColorModeValue('brand.100', 'brand.300')
	const bgDragging = useColorModeValue('brand.200', 'brand.100')
	const hoverBg = useColorModeValue('brand.200', 'brand.100')

	return (
		<Draggable key={id} draggableId={id} index={index}>
			{(provided, snapshot) => (
				<Box
					bg={snapshot.isDragging ? bgDragging : bg}
					_hover={{ bg: hoverBg }}
					cursor={'grab'}
					draggable
					m={2}
					p={2}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<Accordion allowToggle>
						<Heading as={'h4'} size={'md'}>
							{name}
						</Heading>
						<Text>{description}</Text>
						<br />
						<Text>{time_spent}</Text>
					</Accordion>
				</Box>
			)}
		</Draggable>
	)
}

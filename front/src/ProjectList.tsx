import React, { useEffect, useState } from 'react'
import {
	Heading,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Button,
	useColorMode,
	useColorModeValue,
	Accordion,
	AccordionItem,
	AccordionPanel,
	AccordionButton,
	IconButton,
	AccordionIcon,
	Text,
	Center,
	Box,
	Grid,
	GridItem,
	Container,
	useDisclosure,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Projects } from './types'
import { ProjectView } from './ProjectView'
import { NewProject } from './NewProject'
import { useMutation, useQuery } from '@apollo/client'
import { GetUserProjectsDocument, GetUserProjectsQuery, Project } from './gql/graphql'
import { color } from 'framer-motion'
import { Link } from 'react-router-dom'

export const ProjectList = () => {
	const bg = useColorModeValue('brand.50', 'brand.200')
	const hoverBg = useColorModeValue('brand.100', 'brand.300')

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [selectedProject, setSelectedProject] = useState<string>('')
	//const [projectsList, setProjectsList] = useState<Project[]>([]) // Fix: Specify the type as Project[]

	const { loading, error, data, refetch } = useQuery<GetUserProjectsQuery>(GetUserProjectsDocument) // Fix: re-fetch when landing
	const [projects, setProjects] = React.useState(data && data.getUserProjects ? data.getUserProjects : [])

	const calculatePercentage = (todoCount: number = 0, inProgressCount: number = 0, doneCount: number = 0): number => {
		const total = todoCount + inProgressCount + doneCount
		return Math.round((doneCount / total) * 1000) / 10 || 0
	}

	const addProject = (project: Project) => {
		setProjects([...projects, project])
	}

	useEffect(() => {
		refetch()
	}, [refetch])

	useEffect(() => {
		if (data && data.getUserProjects) {
			setProjects(data.getUserProjects)
		}
	}, [data])

	console.log('data:', projects)
	console.log('loading:', loading)
	console.log('error:', error)

	// TODO: re-fetch when landing

	return (
		<>
			<Grid templateColumns={'repeat(3, 1fr)'}>
				<GridItem></GridItem>
				<GridItem>
					<Center>
						<Heading>Projects</Heading>
					</Center>
				</GridItem>
				<GridItem></GridItem>
			</Grid>
			<Container maxW={'8xl'}>
				<Accordion allowMultiple reduceMotion>
					<Grid templateColumns={'50px repeat(4, 1fr) 50px'}>
						<GridItem />
						<GridItem display="flex" alignItems="center" justifyContent={'center'}>
							Project
						</GridItem>
						<GridItem display="flex" alignItems="center" justifyContent={'center'}>
							Total Time Spent
						</GridItem>
						<GridItem display="flex" alignItems="center" justifyContent={'center'}>
							Tasks
						</GridItem>
						<GridItem display={'flex'} alignItems="center" justifyContent={'center'}>
							% Done
						</GridItem>
						<GridItem />
						{projects.map((project, index) => (
							<AccordionItem bg={bg} _hover={{ bg: hoverBg }} key={index} colSpan={6} as={GridItem}>
								<Grid templateColumns={'50px repeat(4, 1fr) 50px'}>
									<GridItem>
										<AccordionButton alignItems={'center'} justifyContent={'center'}>
											<Box>
												<ChevronDownIcon />
											</Box>
										</AccordionButton>
									</GridItem>
									<GridItem display="flex" alignItems="center" justifyContent={'center'}>
										{project.name}
									</GridItem>
									<GridItem display="flex" alignItems="center" justifyContent={'center'}>
										0
									</GridItem>
									<GridItem display="flex" alignItems="center" justifyContent={'center'}>
										<Text color={project.todoCount > 0 ? 'red' : undefined}>{project.todoCount}</Text>
										<Text>/</Text>
										<Text color={project.inProgressCount > 0 ? 'orange' : undefined}>{project.inProgressCount}</Text>
										<Text>/</Text>
										<Text color={project.doneCount > 0 ? 'green' : undefined}>{project.doneCount}</Text>
									</GridItem>
									<GridItem display={'flex'} alignItems="center" justifyContent={'center'}>
										{calculatePercentage(project.todoCount, project.inProgressCount, project.doneCount)} %
									</GridItem>
									<GridItem>
										<Link to={`/project/${project.id}`}>
											<IconButton aria-label="Open project" variant={'inline-flex'} icon={<ChevronRightIcon />} />
										</Link>
									</GridItem>
								</Grid>

								<AccordionPanel>
									<Grid templateColumns={'repeat(2, 1fr)'}>
										<GridItem colSpan={2}>
											<Center>{project.description}</Center>
										</GridItem>
										{/* <GridItem colSpan={1}>
											<Center>{project.totalTimeSpent}</Center>
										</GridItem>
										<GridItem colSpan={1}>
											<Center>{project.tasks.length}</Center>
										</GridItem> */}
									</Grid>
								</AccordionPanel>
							</AccordionItem>
						))}
					</Grid>
				</Accordion>
				<Button variant={'solid'} onClick={onOpen} mt={2} width={'full'}>
					Add new project
				</Button>
			</Container>
			<NewProject isOpen={isOpen} onClose={onClose} addProject={addProject} />
		</>
	)
}

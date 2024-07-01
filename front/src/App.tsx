import { Center, Grid, GridItem } from '@chakra-ui/react'
import { ProjectList } from './ProjectList'
import { Nav } from './Nav'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProjectView } from './ProjectView'
import "./App.css"

export const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setIsLoggedIn(true)
		}
	}, [])

	return (
		<>
			<BrowserRouter>
				<Grid
					templateColumns={`1fr minmax(auto, 80%) 1fr`}
					templateAreas={`"header header header"
                        "side main side2"
                        "footer footer footer"`}
					gap="1"
					fontWeight="bold"
					minHeight="100vh" // Set the minimum height of the grid to 100vh (viewport height)
					position="relative" // Set the position of the grid to relative
				>
					<GridItem pl={'2'} gridArea="header">
						<Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
					</GridItem>
					<GridItem pl={'2'} gridArea="side" width={'1fr'}></GridItem>
					<GridItem pl={'2'} gridArea="main" width={'8fr'}>
						{!isLoggedIn ? (
							<Center>Please login</Center>
						) : (
							<Routes>
								<Route path="/" element={<ProjectList />} />
								<Route path="/project/:projectId" element={<ProjectView />} />
							</Routes>
						)}
					</GridItem>
					<GridItem pl={'2'} gridArea="side2" width={'1fr'}></GridItem>
					<GridItem
						pl={'2'}
						gridArea="footer"
						bg="brand.200"
						position="fixed" // Set the position of the footer to absolute
						bottom="0" // Position the footer at the bottom of the grid
						width="100%" // Set the width of the footer to 100% of the grid
					>
						<h1>Heikki Nieminen &copy; 2024</h1>
					</GridItem>
				</Grid>
			</BrowserRouter>
		</>
	)
}

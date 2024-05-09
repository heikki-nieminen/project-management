import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ThemeConfig, extendTheme } from '@chakra-ui/react'
import { App } from './App.tsx'
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client'

const colors = {
	brand: {
		50: '#F5F5F5',
		100: '#D1C4B8',
		200: '#595553',
		300: '#2E2926',
	},
}

const config: ThemeConfig = {
	initialColorMode: 'system',
	useSystemColorMode: true,
}

const theme = extendTheme({
	colors,
	config,
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
		},
	}))

	return forward(operation)
})

export const apolloClient = new ApolloClient({
	/* uri: 'http://localhost:4000', */
	cache: new InMemoryCache(),
	link: from([authMiddleware, httpLink]),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<ApolloProvider client={apolloClient}>
				<App />
			</ApolloProvider>
		</ChakraProvider>
	</React.StrictMode>
)

// Start apollo server
// Be sure to check versions before suggesting code
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { schema } from './schema'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { IncomingHttpHeaders, IncomingMessage, OutgoingMessage } from 'http'

// Create a new server
const server = new ApolloServer({
	schema,
})

const prisma = new PrismaClient()

const context = async ({req, res}: {req: IncomingMessage, res: OutgoingMessage}) => {
	let user
	let token = (req.headers as IncomingHttpHeaders)['authorization'] || null
	if (token && token.startsWith('Bearer ')) {
		token = token.replace('Bearer ', '')
		try {
			user = jwt.verify(token, process.env.JWT_SECRET as string)
		} catch (error) {
			throw new Error('Invalid token')
		}
	}
	return {
		prisma,
		user,
	}
}

// Start the server with startStandaloneServer
export const startServer = async () => {
	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
		context: context
	})
	return url
}
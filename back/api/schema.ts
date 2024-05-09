import { makeSchema, queryType } from 'nexus'
import * as types from './graphql'
import { Project } from '../prisma/generated/nexus-prisma'

export const schema = makeSchema({
  types,
	outputs: {
		schema: __dirname + '/generated/schema.graphql',
		typegen: __dirname + '/generated/nexus.ts',
	},
})
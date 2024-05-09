import { list, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Project, Task } from '@prisma/client'

export const User = objectType({
	name: 'User',
	definition(t) {
		t.string('id')
		t.string('email')
		t.string('password')
		t.date('created_at')
		t.nonNull.list.nonNull.field('projects', {
			type: 'Project',
		})
	},
})

export const AuthPayload = objectType({
	name: 'AuthPayload',
	definition(t) {
		t.string('token')
	},
})

export const Users = queryField('users', {
	type: 'User',
	resolve: (_root, _args, ctx) => {
		return ctx.prisma.user.findMany()
	},
})

export const CreateUser = mutationField('createUser', {
	type: 'AuthPayload',
	args: {
		email: nonNull(stringArg()),
		password: nonNull(stringArg()),
	},
	resolve: async (_root, args, ctx) => {
		const password = await hash(args.password, parseInt(process.env.SALT_ROUNDS as string))
		const user = await ctx.prisma.user.create({
			data: {
				email: args.email,
				password: password,
			},
		})
		if (!user) {
			throw new Error('User not created')
		}
		const token = sign({ userId: user.id }, process.env.JWT_SECRET as string)
		return { token }
	},
})

export const LoginUser = mutationField('loginUser', {
	type: 'AuthPayload',
	args: {
		email: nonNull(stringArg()),
		password: nonNull(stringArg()),
	},
	resolve: async (_root, args, ctx) => {
		const user = await ctx.prisma.user.findUnique({ where: { email: args.email } })
		if (!user || !(await compare(args.password, user.password))) {
			throw new Error('Invalid email or password')
		}
		const token = sign({ userId: user.id }, process.env.JWT_SECRET as string)
		return { token }
	},
})

export const GetUserProjects = queryField('getUserProjects', {
	type: nonNull(list(nonNull('Project'))),
	resolve: async (_root, _args, ctx) => {
		const user = await ctx.prisma.user.findUnique({
			where: {id: ctx.user.userId},
			include: {
				projects: {
					include: {
						tasks: true
					}
				},
			},
		})
		if (!user) {
			throw new Error('User not found')
		}

		const projectsWithTaskCounts = user.projects.map((project: Project & {tasks: Task[]}) => ({
			...project,
			todoCount: project.tasks.filter((task: Task) => task.state === 'todo').length,
			inProgressCount: project.tasks.filter((task: Task) => task.state === 'in-progress').length,
			doneCount: project.tasks.filter((task: Task) => task.state === 'done').length,
		}))


		return projectsWithTaskCounts || []
	},
})

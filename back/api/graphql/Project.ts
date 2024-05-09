import { list, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'

export const Project = objectType({
	name: 'Project',
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.string('name')
		t.string('description')
		t.nonNull.date('created_at')
		t.nonNull.date('edited_at')
		t.nonNull.string('user_id')
		t.nonNull.list.nonNull.field('tasks', {
			type: 'Task',
		})
		t.nonNull.int('todoCount')
		t.nonNull.int('inProgressCount')
		t.nonNull.int('doneCount')
	},
})

export const Projects = queryField('projects', {
	type: 'Project',
	resolve: async (_root, _args, ctx) => {
		return ctx.prisma.project.findMany({
			where: {
				users: {
					some: {
						user_id: ctx.user.userId,
					},
				},
			},
		})
	},
})

export const CreateProject = mutationField('createProject', {
	type: 'Project',
	args: {
		name: nonNull(stringArg()),
		description: stringArg(),
	},
	resolve: async (_root, args, ctx) => {
		return ctx.prisma.project.create({
			data: {
				name: args.name,
				description: args.description,
				users: {
					connect: {
						id: ctx.user.userId,
					},
				},
			},
		})
	},
})


// Check user_id from token and project.user_id before updating or deleting
export const UpdateProject = mutationField('updateProject', {
	type: 'Project',
	args: {
		id: nonNull(stringArg()),
		name: stringArg(),
		description: stringArg(),
	},
	resolve: async (_root, args, ctx) => {
		const userId = ctx.user.userId
		const project = await ctx.prisma.project.findUnique({
			where: {
				id: args.id,
			},
		})
		if (!project || project.user_id !== userId) {
			throw new Error('Project not found')
		}
		return ctx.prisma.project.update({
			where: {
				id: args.id,
			},
			data: {
				name: args.name,
				description: args.description,
			},
		})
	},
})

export const DeleteProject = mutationField('deleteProject', {
	type: 'Project',
	args: {
		id: nonNull(stringArg()),
	},
	resolve: async (_root, args, ctx) => {
		const userId = ctx.user.userId
		const project = await ctx.prisma.project.findUnique({
			where: {
				id: args.id,
			},
		})
		if (!project || project.user_id !== userId) {
			throw new Error('Project not found')
		}
		return ctx.prisma.project.delete({
			where: {
				id: args.id,
			},
		})
	},
})


// Get project and related tasks

export const ProjectTasks = queryField('projectTasks', {
	type: nonNull('Project'),
	args: {
		id: nonNull(stringArg()),
	},
	resolve: async (_root, args, ctx) => {
		const userId = ctx.user.userId
		const project = await ctx.prisma.project.findUnique({
			where: {
				id: args.id,
			},
			include: {
				tasks: true,
			},
		})
		console.log("Project:", project)
		if (!project || project.user_id !== userId) {
			throw new Error('Project not found')
		}
		return project
	},
})

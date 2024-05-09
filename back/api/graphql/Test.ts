import { mutationType, objectType, queryType, stringArg, scalarType, nonNull } from 'nexus'
import { Kind } from 'graphql'

export const DateScalar = scalarType({
  name: 'Date',
  asNexusMethod: 'date',
  description: 'Date custom scalar type',
  parseValue(value: unknown) {
    return new Date(value as string)
  },
  serialize(value) {
    return (value as Date).toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  },
})

/* export const Project = objectType({
	name: 'Project',
	definition(t) {
		t.string('id')
		t.string('name')
		t.string('description')
		t.date('created_at')
		t.date('edited_at')
	},
}) */

export const Task = objectType({
	name: 'Task',
	definition(t) {
		t.string('id')
		t.string('name')
		t.string('description')
		t.int('timeSpent')
		t.string('state')
    t.date('created_at')
    t.date('edited_at')
    t.string('projectId')
	},
})

export const Query = queryType({
	definition(t) {
		t.list.field('projects', {
			type: Project,
			resolve: async (_root, _args, ctx) => {
				return ctx.prisma.project.findMany()
			},
		})
		t.list.field('tasks', {
			type: Task,
			resolve: (_root, _args, ctx) => {
				return ctx.prisma.task.findMany()
			},
		})
    t.list.field('tasksByProject', {
      type: Task,
      args: {
        projectId: nonNull(stringArg()),
      },
      resolve: (_root, args, ctx) => {
        return ctx.prisma.task.findMany({
          where: {
            projectId: args.projectId,
          },
        })
      },
    })
	},
})

export const Mutation = mutationType({
	definition(t) {
		t.field('createProject', {
			type: Project,
			args: {
				name: stringArg(),
				description: stringArg(),
			},
			resolve: (_root, args, ctx) => {
				return ctx.prisma.project.create({
					data: {
						name: args.name,
						description: args.description,
					},
				})
			},
		})
    t.field('updateProject', {
      type: Project,
      args: {
        id: stringArg(),
        name: stringArg(),
        description: stringArg(),
      },
      resolve: (_root, args, ctx) => {
        return ctx.prisma.project.update({
          where: { id: args.id },
          data: {
            name: args.name,
            description: args.description,
            edited_at: new Date(),
          },
        })
      },
    })
    t.field('deleteProject', {
      type: Project,
      args: {
        id: stringArg(),
      },
      resolve: (_root, args, ctx) => {
        return ctx.prisma.project.delete({
          where: { id: args.id },
        })
      },
    })
		t.field('createTask', {
			type: Task,
			args: {
				name: stringArg(),
				description: stringArg(),
				projectId: stringArg(),
			},
			resolve: (_root, args, ctx) => {
				return ctx.prisma.task.create({
					data: {
						name: args.name,
						description: args.description,
						project: {
							connect: { id: (args.projectId) },
						},
					},
				})
			},
		})
    t.field('updateTask', {
      type: Task,
      args: {
        id: stringArg(),
        name: stringArg(),
        description: stringArg(),
        state: stringArg(),
      },
      resolve: (_root, args, ctx) => {
        return ctx.prisma.task.update({
          where: { id: args.id },
          data: {
            name: args.name,
            description: args.description,
            state: args.state,
            edited_at: new Date(),
          },
        })
      },
    })
    t.field('deleteTask', {
      type: Task,
      args: {
        id: stringArg(),
      },
      resolve: (_root, args, ctx) => {
        return ctx.prisma.task.delete({
          where: { id: args.id },
        })
      },
    })
	},
})

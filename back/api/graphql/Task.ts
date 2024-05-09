
import { intArg, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'



export const Task = objectType({
	name: 'Task',
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.string('name')
		t.string('description')
		t.int('time_spent')
		t.string('state')
		t.date('created_at')
		t.date('edited_at')
		t.nonNull.string('project_id')
    t.int('order')
	},
})

export const Tasks = queryField('tasks', {
  type: 'Task',
  args: {
    project_id: nonNull(stringArg()),
  },
  resolve: async (_root, args, ctx) => {
    return await ctx.prisma.task.findMany({
      where: {
        project_id: args.project_id,
      },
    }) 
  },
})

/* export const TasksByProject = queryField('tasksByProject', {
  type: 'Task',
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
}) */

// Check user_id from token and project.user_id before creating, updating or deleting task

export const CreateTask = mutationField('createTask', {
  type: 'Task',
  args: {
    name: nonNull(stringArg()),
    description: stringArg(),
    project_id: nonNull(stringArg()),
    order: intArg(),
  },
  resolve: async (_root, args, ctx) => {
    const userId = ctx.user.userId
    const project = await ctx.prisma.project.findUnique({
      where: {
        id: args.project_id,
      },
    })
    console.log("Project:",project)
    console.log("USERiD:",userId)
    if (!project || project.user_id !== userId) {
      throw new Error('Not authorized')
    }
    return ctx.prisma.task.create({
      data: {
        name: args.name,
        description: args.description,
        project_id: args.project_id,
      },
    })
  },
})

export const UpdateTask = mutationField('updateTask', {
  type: 'Task',
  args: {
    id: nonNull(stringArg()),
    name: stringArg(),
    description: stringArg(),
    time_spent: intArg(),
    state: stringArg(),
    order: intArg(),
  },
  resolve: async (_root, args, ctx) => {
    const userId = ctx.user.userId
    const task = await ctx.prisma.task.findUnique({
      where: {
        id: args.id,
      },
    })
    const project = await ctx.prisma.project.findUnique({
      where: {
        id: task?.project_id,
      },
    })
    if(!task || !project) {
      throw new Error('Task or project not found')
    }

    if (project.user_id !== userId) {
      throw new Error('Not authorized')
    }
    return ctx.prisma.task.update({
      where: {
        id: args.id,
      },
      data: {
        name: args.name,
        description: args.description,
        time_spent: args.time_spent,
        state: args.state,
        order: args.order,
      },
    })
  },
})

export const DeleteTask = mutationField('deleteTask', {
  type: 'Task',
  args: {
    id: nonNull(stringArg()),
  },
  resolve: (_root, args, ctx) => {
    const userId = ctx.user.userId
    const task = ctx.prisma.task.findUnique({
      where: {
        id: args.id,
      },
    })
    if (!task || task.project.user_id !== userId) {
      throw new Error('Not authorized')
    }
    return ctx.prisma.task.delete({
      where: {
        id: args.id,
      },
    })
  },
})

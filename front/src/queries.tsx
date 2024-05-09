import { gql } from '@apollo/client'

export const GET_USER_PROJECTS = gql`
	query GetUserProjects {
		getUserProjects {
			id
			name
			description
			todoCount
			inProgressCount
			doneCount
		}
	}
`
export const LOGIN_USER = gql`
	mutation LoginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			token
		}
	}
`
export const CREATE_USER = gql`
	mutation CreateUser($email: String!, $password: String!) {
		createUser(email: $email, password: $password) {
			token
		}
	}
`

export const GET_PROJECT_TASKS = gql`
	query projectTasks($projectId: String!) {
		projectTasks(id: $projectId) {
			id
			name
			description
			tasks {
				id
				name
				description
				state
				time_spent
				project_id
				order
			}
		}
	}
`

export const CREATE_TASK = gql`
  mutation CreateTask($name: String!, $description: String, $project_id: String!) {
    createTask(name: $name, description: $description, project_id: $project_id) {
      id
      name
      description
      state
      time_spent
      project_id
    }
  }
`

export const UPDATE_TASK = gql`
	mutation UpdateTask($updateTaskId: String!, $state: String, $description: String, $name: String, $order: Int) {
  updateTask(id: $updateTaskId, state: $state, description: $description, name: $name, order: $order) {
    id
    name
    description
    state
    project_id
		order
  }
}
`
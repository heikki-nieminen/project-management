import { Project } from "./gql/graphql"

export type Task = {
  id: number
  title: string
  description: string
  timeSpent: number
  state: 'todo' | 'in-progress' | 'done'
  index: number
}

export type ProjectType = {
  id: number
  name: string
  description: string
  totalTimeSpent: number
  tasks: Task[]
}

export type ProjectProps = {

}

export type TaskProps = {
  task: Task,
  isOpen: boolean,
  onClose: () => void,
}

type SetProjects = React.Dispatch<React.SetStateAction<ProjectType[]>>;

export type NewProjectProps = {
  isOpen: boolean,
  onClose: () => void,
  setProjects: SetProjects
}

export type LoginModalProps = {
  isOpen: boolean,
  onClose: () => void,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export type NavProps = {
  isLoggedIn: boolean,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export type Tasks = Task[]

export type Projects = ProjectType[]

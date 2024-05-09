import { TaskProps } from './types'

export const Task = ({ task }: TaskProps) => {
  return (
    <div>
      <h1>Task title</h1>
      <p>Task description</p>
      <p>Time spent</p>
    </div>
  )
}

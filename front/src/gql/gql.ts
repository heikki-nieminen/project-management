/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tquery GetUserProjects {\n\t\tgetUserProjects {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\ttodoCount\n\t\t\tinProgressCount\n\t\t\tdoneCount\n\t\t}\n\t}\n": types.GetUserProjectsDocument,
    "\n\tmutation LoginUser($email: String!, $password: String!) {\n\t\tloginUser(email: $email, password: $password) {\n\t\t\ttoken\n\t\t}\n\t}\n": types.LoginUserDocument,
    "\n\tmutation CreateUser($email: String!, $password: String!) {\n\t\tcreateUser(email: $email, password: $password) {\n\t\t\ttoken\n\t\t}\n\t}\n": types.CreateUserDocument,
    "\n\tquery projectTasks($projectId: String!) {\n\t\tprojectTasks(id: $projectId) {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\ttasks {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t\tstate\n\t\t\t\ttime_spent\n\t\t\t\tproject_id\n\t\t\t\torder\n\t\t\t}\n\t\t}\n\t}\n": types.ProjectTasksDocument,
    "\n  mutation CreateTask($name: String!, $description: String, $project_id: String!) {\n    createTask(name: $name, description: $description, project_id: $project_id) {\n      id\n      name\n      description\n      state\n      time_spent\n      project_id\n    }\n  }\n": types.CreateTaskDocument,
    "\n\tmutation UpdateTask($updateTaskId: String!, $state: String, $description: String, $name: String, $order: Int) {\n  updateTask(id: $updateTaskId, state: $state, description: $description, name: $name, order: $order) {\n    id\n    name\n    description\n    state\n    project_id\n\t\torder\n  }\n}\n": types.UpdateTaskDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetUserProjects {\n\t\tgetUserProjects {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\ttodoCount\n\t\t\tinProgressCount\n\t\t\tdoneCount\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetUserProjects {\n\t\tgetUserProjects {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\ttodoCount\n\t\t\tinProgressCount\n\t\t\tdoneCount\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation LoginUser($email: String!, $password: String!) {\n\t\tloginUser(email: $email, password: $password) {\n\t\t\ttoken\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation LoginUser($email: String!, $password: String!) {\n\t\tloginUser(email: $email, password: $password) {\n\t\t\ttoken\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateUser($email: String!, $password: String!) {\n\t\tcreateUser(email: $email, password: $password) {\n\t\t\ttoken\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateUser($email: String!, $password: String!) {\n\t\tcreateUser(email: $email, password: $password) {\n\t\t\ttoken\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery projectTasks($projectId: String!) {\n\t\tprojectTasks(id: $projectId) {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\ttasks {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t\tstate\n\t\t\t\ttime_spent\n\t\t\t\tproject_id\n\t\t\t\torder\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery projectTasks($projectId: String!) {\n\t\tprojectTasks(id: $projectId) {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\ttasks {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tdescription\n\t\t\t\tstate\n\t\t\t\ttime_spent\n\t\t\t\tproject_id\n\t\t\t\torder\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTask($name: String!, $description: String, $project_id: String!) {\n    createTask(name: $name, description: $description, project_id: $project_id) {\n      id\n      name\n      description\n      state\n      time_spent\n      project_id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTask($name: String!, $description: String, $project_id: String!) {\n    createTask(name: $name, description: $description, project_id: $project_id) {\n      id\n      name\n      description\n      state\n      time_spent\n      project_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateTask($updateTaskId: String!, $state: String, $description: String, $name: String, $order: Int) {\n  updateTask(id: $updateTaskId, state: $state, description: $description, name: $name, order: $order) {\n    id\n    name\n    description\n    state\n    project_id\n\t\torder\n  }\n}\n"): (typeof documents)["\n\tmutation UpdateTask($updateTaskId: String!, $state: String, $description: String, $name: String, $order: Int) {\n  updateTask(id: $updateTaskId, state: $state, description: $description, name: $name, order: $order) {\n    id\n    name\n    description\n    state\n    project_id\n\t\torder\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
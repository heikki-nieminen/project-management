import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
	overwrite: true,
  schema: 'http://back:4000/graphql',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
      config: {},
    },
  },
}
 
export default config
import { startServer } from './server';

// Start the server
startServer().then(url => {
  console.log(`Server ready at ${url}`);
});
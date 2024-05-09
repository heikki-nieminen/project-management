"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
// Start apollo server
// Be sure to check versions before suggesting code
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
// Import schema and resolvers
const schema_1 = require("./schema");
// Create a new server
const server = new server_1.ApolloServer({
    schema: schema_1.schema,
});
// Start the server with startStandaloneServer
const startServer = async () => {
    const { url } = await (0, standalone_1.startStandaloneServer)(server, { listen: { port: 4000 } });
    return url;
};
exports.startServer = startServer;
//# sourceMappingURL=server.js.map
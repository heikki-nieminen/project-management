"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
// Start the server
(0, server_1.startServer)().then(url => {
    console.log(`Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map
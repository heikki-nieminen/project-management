"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const nexus_prisma_1 = require("nexus-prisma");
const nexus_1 = require("nexus");
exports.schema = (0, nexus_1.makeSchema)({
    types: [
        (0, nexus_1.objectType)({
            name: nexus_prisma_1.Project.$name,
            description: nexus_prisma_1.Project.$description,
            definition(t) {
                t.field(nexus_prisma_1.Project.id);
                t.field(nexus_prisma_1.Project.name);
                t.field(nexus_prisma_1.Project.description);
            },
        }),
    ]
});
//# sourceMappingURL=schema.js.map
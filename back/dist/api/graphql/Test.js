"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const nexus_1 = require("nexus");
exports.Project = (0, nexus_1.objectType)({
    name: 'Project',
    definition(t) {
        t.int('id');
        t.string('name');
        t.string('description');
        t.int('totalTimeSpent');
    },
});
//# sourceMappingURL=Test.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleHasPermission = exports.permissions = void 0;
const roles_1 = require("./roles");
exports.permissions = {
    editTeamRoles: {
        practitionerAdmin: true,
    },
    editPractices: {
        superAdmin: true,
    },
    editTeam: {
        practitionerAdmin: true,
    },
    archivePracticeWorksheets: {
        practitionerAdmin: true,
    },
    manageBilling: {
        practitionerAdmin: true,
    },
    archivePracticeContent: {
        practitionerAdmin: true,
    },
    editAnyClient: {
        practitionerAdmin: true,
    },
    deleteAnyClient: {
        practitionerAdmin: true,
    },
    deleteAnyPractitioner: {
        practitionerAdmin: true,
    },
};
const roleHasPermission = (role, permission) => {
    const permissionObj = exports.permissions[permission];
    if ('all' in permissionObj) {
        return permissionObj.all;
    }
    else {
        let hasPermission = permissionObj[role];
        while (typeof hasPermission !== 'boolean' && role) {
            role = (0, roles_1.getLowerRole)(role);
            hasPermission = permissionObj[role];
        }
        return hasPermission ?? false;
    }
};
exports.roleHasPermission = roleHasPermission;
//# sourceMappingURL=permissions.js.map
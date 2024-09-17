import { getLowerRole } from './roles';
export const permissions = {
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
export const roleHasPermission = (role, permission) => {
    const permissionObj = permissions[permission];
    if ('all' in permissionObj) {
        return permissionObj.all;
    }
    else {
        let hasPermission = permissionObj[role];
        while (typeof hasPermission !== 'boolean' && role) {
            role = getLowerRole(role);
            hasPermission = permissionObj[role];
        }
        return hasPermission ?? false;
    }
};
//# sourceMappingURL=permissions.js.map
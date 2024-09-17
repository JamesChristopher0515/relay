const client = [];
const practitioner = [
    'clients:own:read',
    'clients:own:write',
    ...client,
];
const practitionerAdmin = [
    'clients:read',
    'clients:write',
    'practitioners:own:read',
    'practitioners:own:write',
    ...practitioner,
];
const superAdmin = [
    ...practitionerAdmin,
    'practitioners:read',
    'practitioners:write',
    'practices:read',
    'practices:write',
    'users:write',
    'users:read',
];
const allRoles = {
    client,
    practitioner,
    practitionerAdmin,
    superAdmin,
};
const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));
const orderer = [
    'client',
    'practitioner',
    'practitionerAdmin',
    'superAdmin',
];
export const roleGte = (roleA, roleB) => orderer.indexOf(roleA) > orderer.indexOf(roleB);
export const getLowerRole = (roleA) => orderer[orderer.indexOf(roleA) - 1];
export { roles, roleRights };
//# sourceMappingURL=roles.js.map
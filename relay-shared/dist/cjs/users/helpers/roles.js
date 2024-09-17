"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRights = exports.roles = exports.getLowerRole = exports.roleGte = void 0;
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
exports.roles = roles;
const roleRights = new Map(Object.entries(allRoles));
exports.roleRights = roleRights;
const orderer = [
    'client',
    'practitioner',
    'practitionerAdmin',
    'superAdmin',
];
const roleGte = (roleA, roleB) => orderer.indexOf(roleA) > orderer.indexOf(roleB);
exports.roleGte = roleGte;
const getLowerRole = (roleA) => orderer[orderer.indexOf(roleA) - 1];
exports.getLowerRole = getLowerRole;
//# sourceMappingURL=roles.js.map
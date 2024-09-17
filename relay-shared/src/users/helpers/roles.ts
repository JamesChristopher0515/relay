export type Role =
  | 'client'
  | 'practitioner'
  | 'practitionerAdmin'
  | 'superAdmin'
export type Right =
  | 'practitioners:read'
  | 'practitioners:write'
  | 'practitioners:own:read'
  | 'practitioners:own:write'
  | 'clients:own:read'
  | 'clients:own:write'
  | 'clients:read'
  | 'clients:write'
  | 'practices:read'
  | 'practices:write'
  | 'users:read'
  | 'users:write'

const client: Right[] = []
const practitioner: Right[] = [
  'clients:own:read',
  'clients:own:write',
  ...client,
]
const practitionerAdmin: Right[] = [
  'clients:read',
  'clients:write',
  'practitioners:own:read',
  'practitioners:own:write',
  ...practitioner,
]
const superAdmin: Right[] = [
  ...practitionerAdmin,
  'practitioners:read',
  'practitioners:write',
  'practices:read',
  'practices:write',
  'users:write',
  'users:read',
]

const allRoles = {
  client,
  practitioner,
  practitionerAdmin,
  superAdmin,
}

const roles = Object.keys(allRoles)
const roleRights = new Map(Object.entries(allRoles))

const orderer = [
  'client',
  'practitioner',
  'practitionerAdmin',
  'superAdmin',
] as Role[]
export const roleGte = (roleA: Role, roleB: Role) =>
  orderer.indexOf(roleA) > orderer.indexOf(roleB)
export const getLowerRole = (roleA: Role) => orderer[orderer.indexOf(roleA) - 1]

export { roles, roleRights }

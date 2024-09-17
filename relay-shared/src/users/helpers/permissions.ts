import { getLowerRole, Role } from './roles'

// Mapped object type
export type PermissionsMap =
  | Partial<{
    [key in Role]: boolean
  }>
  | { all: boolean }

export type Permission =
  | 'editTeamRoles'
  | 'manageBilling'
  | 'deleteAnyClient'
  | 'editAnyClient'
  | 'deleteAnyPractitioner'
  | 'archivePracticeContent'
  | 'archivePracticeWorksheets'
  | 'editTeam'
  | 'editPractices'

export const permissions: { [key in Permission]: PermissionsMap } = {
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
} as const

export const roleHasPermission = (role: Role, permission: Permission) => {
  const permissionObj = permissions[permission]
  if ('all' in permissionObj) {
    return permissionObj.all
  } else {
    let hasPermission = permissionObj[role]
    while (typeof hasPermission !== 'boolean' && role) {
      role = getLowerRole(role)
      hasPermission = permissionObj[role]
    }
    return hasPermission ?? false
  }
}

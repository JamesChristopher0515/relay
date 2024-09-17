import { Role } from './roles';
export type PermissionsMap = Partial<{
    [key in Role]: boolean;
}> | {
    all: boolean;
};
export type Permission = 'editTeamRoles' | 'manageBilling' | 'deleteAnyClient' | 'editAnyClient' | 'deleteAnyPractitioner' | 'archivePracticeContent' | 'archivePracticeWorksheets' | 'editTeam' | 'editPractices';
export declare const permissions: {
    [key in Permission]: PermissionsMap;
};
export declare const roleHasPermission: (role: Role, permission: Permission) => boolean;
//# sourceMappingURL=permissions.d.ts.map
export type Role = 'client' | 'practitioner' | 'practitionerAdmin' | 'superAdmin';
export type Right = 'practitioners:read' | 'practitioners:write' | 'practitioners:own:read' | 'practitioners:own:write' | 'clients:own:read' | 'clients:own:write' | 'clients:read' | 'clients:write' | 'practices:read' | 'practices:write' | 'users:read' | 'users:write';
declare const roles: string[];
declare const roleRights: Map<string, Right[]>;
export declare const roleGte: (roleA: Role, roleB: Role) => boolean;
export declare const getLowerRole: (roleA: Role) => Role;
export { roles, roleRights };
//# sourceMappingURL=roles.d.ts.map
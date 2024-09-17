import { PackageDepSpec } from './TokenDepSpec';
export type PackageType<Package> = Package extends keyof CustomTypeMappings ? CustomTypeMappings[Package] : Package;
interface CustomTypeMappings {
}
export declare const packageDep: <T>(p?: T) => PackageDepSpec<T, any>;
export {};
//# sourceMappingURL=packageDep.d.ts.map
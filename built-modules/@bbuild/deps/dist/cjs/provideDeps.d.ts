import { DepContext } from './createDepContext';
import { DepMap, GetProvidedDeps } from './TokenDepSpec';
export declare const provideDeps: <Deps extends DepMap, R>(deps: Deps, extra: Partial<GetProvidedDeps<Deps>>, context?: DepContext) => GetProvidedDeps<Deps>;
export declare const provideDepsSync: <Deps extends DepMap, R>(deps: Deps, extra: Partial<GetProvidedDeps<Deps>>, context?: DepContext) => GetProvidedDeps<Deps>;
//# sourceMappingURL=provideDeps.d.ts.map
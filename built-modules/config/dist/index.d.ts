import z, { ZodObject } from "zod";
import { mergeConfigs } from "./mergeConfigs";
export interface ConfigType {
    project: string;
    env: "development" | "production";
    platform: "node" | "electron" | "react-native" | "web" | "electron-web";
    platformVersion: string;
}
export declare const isElectron: boolean;
declare const config: ConfigType;
export default config;
export declare function createConfig<T extends z.ZodObject<any, any, any>>(schema?: T, module?: string, defaults?: z.infer<T>): {
    get: () => z.infer<T>;
};
/** @deprecated Internal */
export declare function _getEntireConfig(): {
    [key: string]: string | number | boolean;
};
export declare function getConfig<T extends ZodObject<any, any, any>>(schema: T, module?: string | null, defaults?: Partial<z.infer<T>>): z.TypeOf<T>;
export declare function isDev(): boolean;
export declare function isProd(): boolean;
export { mergeConfigs };
//# sourceMappingURL=index.d.ts.map
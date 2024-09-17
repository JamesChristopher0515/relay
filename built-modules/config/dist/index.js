import * as dotenv from "dotenv-flow";
import fs from "fs-extra";
import { workspacePath } from '@bbuild/core';
import { readYamlSync } from '@bbuild/yml';
import { mergeConfigs } from "./mergeConfigs";
const silentMode = process.env.ONE_CONFIG_SILENT === "true";
/**
 * Since sometimes we evaluate stdout to parse json configs, if we log anything
 * else out, we can break the parsing. So we have an env flag to disable logging.
 */
function safeLog(...args) {
    if (!silentMode) {
        console.log(...args);
    }
}
function loadModuleConfig(moduleName) {
    const yamlPath = workspacePath("config", `${moduleName}.yml`);
    logOnce(`Checking ${yamlPath}`);
    if (fs.existsSync(yamlPath)) {
        logOnce(`Loading ${yamlPath}`);
        return readYamlSync(yamlPath);
    }
    return {};
}
const envYamlPath = workspacePath("env.yml");
let envYaml = {};
if (fs.existsSync(envYamlPath)) {
    envYaml = readYamlSync(envYamlPath);
    safeLog(`Loaded yml env from ${envYamlPath}`);
}
safeLog(`Loading environment variables from ${process.cwd()}`);
dotenv.config({
    silent: silentMode,
});
const currNodeVersion = process.versions.node;
export const isElectron = !!process.versions.electron;
const config = {
    // Somehow we want to dynamically change this for each projec that uses one
    project: "Lockpick",
    env: "development",
    platform: isElectron ? "electron" : "node",
    platformVersion: currNodeVersion,
};
export default config;
// const configsById: { [id: string]: any } = {}
let alreadyLogged = {};
const logOnce = (msg, ...rest) => {
    if (!alreadyLogged[msg]) {
        alreadyLogged[msg] = true;
        safeLog(msg, ...rest);
    }
};
const profileVarName = "ENV_PROFILE";
function getEffectiveVar(varName, profile = "", module, defaults) {
    if (!profile && varName !== profileVarName) {
        // Check if we have a profile
        profile = getEffectiveVar(profileVarName);
        logOnce(`Using profile ${profile}`);
    }
    const moduleVars = module ? loadModuleConfig(module) : {};
    let profileVars = {
        ...envYaml?.profiles?.[profile],
    };
    if (typeof profileVars !== "object") {
        profileVars = {};
    }
    const locations = [
        { name: "process.env", value: process.env[varName] },
        {
            name: `module yml (profile: ${profile})`,
            value: moduleVars?.profiles?.[profile]?.[varName],
        },
        { name: "module yml", value: moduleVars?.[varName] },
        {
            name: `workspace yml (profile: ${profile})`,
            value: profileVars[varName],
        },
        { name: "workspace yml", value: envYaml?.[varName] },
        { name: "default", value: defaults?.[varName] },
    ];
    for (const location of locations) {
        if (location.value !== undefined) {
            logOnce(`${varName} -> ${location.name}`);
            return location.value;
        }
    }
    logOnce(`${varName} -> Not found`);
    return undefined;
}
const getZodDefault = (schema, key) => {
    try {
        return schema.pick({ [key]: true }).parse({})[key];
    }
    catch (e) {
        return undefined;
    }
};
export function createConfig(schema, module, defaults) {
    return {
        get: () => {
            const out = {};
            if (schema) {
                for (const key in schema.shape) {
                    const schemaVal = schema.shape[key];
                    out[key] = getEffectiveVar(key, undefined, module, {
                        [key]: getZodDefault(schema, key),
                    });
                    if (out[key] === undefined && !schemaVal.isOptional()) {
                        throw new Error(`Missing config value for ${key}`);
                    }
                }
            }
            return out;
        },
    };
}
/** @deprecated Internal */
export function _getEntireConfig() {
    const out = {};
    for (const profile in envYaml.profiles ?? {}) {
        for (const key in envYaml.profiles[profile]) {
            out[key] = getEffectiveVar(key);
        }
    }
    for (const key in envYaml) {
        if (key !== "profiles") {
            // Overwrite any vars with those from the active profile
            out[key] = getEffectiveVar(key);
        }
    }
    return out;
}
export function getConfig(schema, module, defaults) {
    // If module not provided, try find from stack trace
    if (typeof module === "undefined") {
        const stack = new Error().stack;
        if (stack) {
            const oneModuleRegex = /(@one|built-modules)\/([a-zA-Z-_]+)/gi;
            const matches = stack.match(oneModuleRegex);
            if (matches) {
                const firstMatchNotConfig = matches.find((m) => !m.includes("/config"));
                if (firstMatchNotConfig) {
                    module = firstMatchNotConfig.split("/")[1];
                }
            }
        }
    }
    return createConfig(schema, module ?? undefined, defaults).get();
}
function getEnv() {
    return getEffectiveVar("NODE_ENV");
}
export function isDev() {
    return !isProd();
}
export function isProd() {
    return getEnv() === "production";
}
export { mergeConfigs };
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["config"]) {
    console.warn(`Duplicate module config imported. This can lead to bugs.`);
}
globalStore["config"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeConfigs = exports.isProd = exports.isDev = exports.getConfig = exports._getEntireConfig = exports.createConfig = exports.isElectron = void 0;
const dotenv = __importStar(require("dotenv-flow"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const core_1 = require('@bbuild/core');
const yml_1 = require('@bbuild/yml');
const mergeConfigs_1 = require("./mergeConfigs");
Object.defineProperty(exports, "mergeConfigs", { enumerable: true, get: function () { return mergeConfigs_1.mergeConfigs; } });
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
    const yamlPath = (0, core_1.workspacePath)("config", `${moduleName}.yml`);
    logOnce(`Checking ${yamlPath}`);
    if (fs_extra_1.default.existsSync(yamlPath)) {
        logOnce(`Loading ${yamlPath}`);
        return (0, yml_1.readYamlSync)(yamlPath);
    }
    return {};
}
const envYamlPath = (0, core_1.workspacePath)("env.yml");
let envYaml = {};
if (fs_extra_1.default.existsSync(envYamlPath)) {
    envYaml = (0, yml_1.readYamlSync)(envYamlPath);
    safeLog(`Loaded yml env from ${envYamlPath}`);
}
safeLog(`Loading environment variables from ${process.cwd()}`);
dotenv.config({
    silent: silentMode,
});
const currNodeVersion = process.versions.node;
exports.isElectron = !!process.versions.electron;
const config = {
    // Somehow we want to dynamically change this for each projec that uses one
    project: "Lockpick",
    env: "development",
    platform: exports.isElectron ? "electron" : "node",
    platformVersion: currNodeVersion,
};
exports.default = config;
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
function createConfig(schema, module, defaults) {
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
exports.createConfig = createConfig;
/** @deprecated Internal */
function _getEntireConfig() {
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
exports._getEntireConfig = _getEntireConfig;
function getConfig(schema, module, defaults) {
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
exports.getConfig = getConfig;
function getEnv() {
    return getEffectiveVar("NODE_ENV");
}
function isDev() {
    return !isProd();
}
exports.isDev = isDev;
function isProd() {
    return getEnv() === "production";
}
exports.isProd = isProd;
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
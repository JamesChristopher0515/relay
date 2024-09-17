"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.machineDep = exports.actorIDep = exports.interfaceDep = void 0;
const interfaceDep = () => {
    return { interface: null };
};
exports.interfaceDep = interfaceDep;
const actorIDep = () => {
    return { interface: null, isActor: true };
};
exports.actorIDep = actorIDep;
const machineDep = (machine) => {
    return { machine, isActor: true };
};
exports.machineDep = machineDep;
//# sourceMappingURL=interfaceDep.js.map
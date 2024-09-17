export default function baseDep(dep) {
    return { ...dep, __baseDep: true };
}
export function isDep(dep) {
    return typeof dep === 'object' && !!dep && dep.__baseDep === true;
}
//# sourceMappingURL=baseDep.js.map
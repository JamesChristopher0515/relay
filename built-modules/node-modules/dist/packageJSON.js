import { uniq } from '@bbuild/dash';
function mergeDeps(source, destination, key) {
    if (key in source) {
        if (!destination[key]) {
            destination[key] = {};
        }
        for (const depKey of Object.keys(source[key])) {
            destination[key][depKey] = source[key][depKey];
        }
    }
}
export function mergePackageJSON(destination, source) {
    for (const key of Object.keys(source)) {
        if (/dependencies/i.test(key)) {
            mergeDeps(source, destination, key);
        }
        else if (key === 'workspaces') {
            // Ensure a unique array
            destination[key] = uniq([
                ...(destination[key] ?? []),
                ...(source[key] ?? []),
            ]);
        }
        else {
            destination[key] = source[key];
        }
    }
    return destination;
}
//# sourceMappingURL=packageJSON.js.map
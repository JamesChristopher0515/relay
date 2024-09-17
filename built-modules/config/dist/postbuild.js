import createHardConfigs from './createHardConfigs';
import { getApps } from '@bbuild/core';
async function main() {
    for (const app of getApps()) {
        await createHardConfigs(app);
    }
}
main();
//# sourceMappingURL=postbuild.js.map
import { workspacePath } from '@bbuild/core/index';
import { getNodeModulesWithConfigForApp, tryAssignConfig, } from './tryLoadConfig';
import { makeCJSNodeModule } from '@bbuild/node-modules';
import path from 'path';
export default async function createHardConfigs(app) {
    const modules = await getNodeModulesWithConfigForApp(app);
    for (const config of modules.withConfig) {
        const appFolder = workspacePath('apps', app);
        // TODO need to make sure private config values are not exposed to public-facing client codez
        const confValues = tryAssignConfig(config, appFolder);
        const { path: thePath } = config;
        const name = path.dirname(thePath);
        await makeCJSNodeModule({
            module: {
                name: `@one/hard-config/${name}`,
                exports: {
                    'index.js': {
                        contents: `module.exports = ${JSON.stringify(confValues, null, 2)}`,
                    },
                },
                version: '1.0.0',
            },
            saveTo: 'workspace',
        });
    }
}
//# sourceMappingURL=createHardConfigs.js.map
import path from 'path';
import helpers, { result } from 'yeoman-test';
import child_process from 'child_process';
import {describe, before, beforeEach, it} from 'node:test';

const __dirname = import.meta.dirname;

describe('result-batch webplugin project in TypeScript', () => {
    const dir = path.join(__dirname, '..');

    before(() => helpers.prepareTemporaryDir());

    beforeEach(async () => {
        await result
            .create(dir)
            .withAnswers({
                appname: "plugin3",
                description: "A test plugin (#3)",
                slotId: "result-batch",
                caption: "Test3",
                minimumVersion: "3.3.2",
                projectType: "typescript",
                license: "MIT",
                authorName: "John Doe",
                authorEmail: "doe.j@nowhere",
                authorGithub: "",
            })
            .run();
    });

    it('generates correctly', () => {
        // contains package.json
        result.assertJsonFileContent('package.json', {
            name: "plugin3",
            description: "A test plugin (#3)",
            license: "MIT",
            scripts: {
                "build": /.+/,
            },
            dicoogle: {
                "slot-id": "result-batch",
                "caption": "Test3",
                "module-file": "module.js"
            },
            devDependencies: {
                parcel: /.+/,
            }
        });

        // has source files and build files
        result.assertFile([
            'src/index.ts',
            'build-package-json.js',
            '.gitignore',
            'README.md',
        ]);

        result.assertFileContent('src/index.ts', 'export default class MyPlugin');
        result.assertFileContent('src/index.ts', "slot.addEventListener('result-selection-ready', (ev) => {");

        // force running npm install on target directory
        child_process.execSync('npm install --no-audit', {cwd: result.cwd});

        // has the output file module.js via `prepare`
        result.assertFileContent('dist/module.js', 'module.exports');
        // has the simplified output file package.json
        result.assertJsonFileContent('dist/package.json', {
            name: "plugin3",
            description: "A test plugin (#3)",
            license: "MIT",
            dicoogle: {
                "slot-id": "result-batch",
                "caption": "Test3",
                "module-file": "module.js"
            }
        });
    });
});

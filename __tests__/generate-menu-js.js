import path from 'path';
import helpers, { result } from 'yeoman-test';
import child_process from 'child_process';
import {describe, before, beforeEach, it} from 'node:test';

const __dirname = import.meta.dirname;

describe('menu webplugin project in JavaScript', () => {
    const dir = path.join(__dirname, '..');

    before(() => helpers.prepareTemporaryDir());

    beforeEach(async () => {
        await result
            .create(dir)
            .withAnswers({
                appname: "plugin1",
                description: "A test plugin (#1)",
                slotId: "menu",
                caption: "Test1",
                minimumVersion: "3.5.1",
                projectType: "javascript",
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
            name: "plugin1",
            description: "A test plugin (#1)",
            license: "MIT",
            scripts: {
                "build": /.+/,
            },
            dicoogle: {
                "slot-id": "menu",
                "caption": "Test1",
                "module-file": "module.js"
            },
            devDependencies: {
                parcel: /.+/,
            }
        });

        // has source files and build files
        result.assertFile([
            'src/index.js',
            'build-package-json.js',
            '.gitignore',
            'README.md',
        ]);

        result.assertFileContent('src/index.js', 'export default class MyPlugin');

        // force running npm install on target directory
        child_process.execSync('npm install --no-audit', {cwd: result.cwd});

        // has the output file module.js via `prepare`
        result.assertFileContent('dist/module.js', 'module.exports');
        // has the simplified output file package.json
        result.assertJsonFileContent('dist/package.json', {
            name: "plugin1",
            description: "A test plugin (#1)",
            license: "MIT",
            dicoogle: {
                "slot-id": "menu",
                "caption": "Test1",
                "module-file": "module.js"
            }
        });
    });
});

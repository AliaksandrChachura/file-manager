import { createInterface } from 'node:readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'node:process';

import { username } from './src/helpers/getUsername.mjs';
import { homeDirectory } from './src/helpers/getHomeDirectory.mjs';
import { __dirname } from './src/helpers/getCurrentDirectory.mjs';
import { listFilesAndFolders } from './src/modules/createListFilesAndFolders.mjs';

let currentDirectory = homeDirectory;

const rl = createInterface({ input, output });

// const currentFolder = process.cwd();
// console.log(currentFolder);
// const homeDirectory = os.homedir();


rl.on('line', (input) => {
    if (input.trim() === 'ls') {    
        listFilesAndFolders(__dirname);
    } else if (input.trim() === '.exit') {
        console.log('Exiting File Manager. Goodbye!');
        process.exit();
    } else {
        console.log(`Unknown command: ${input}`);
    }
});

// const args = process.argv.slice(2);

// const usernameArgIndex = args.indexOf('--username');
// const currentUsername = usernameArgIndex ? username : null;
// console.tab(args[usernameArgIndex + 1]);

console.log(`Welcome to the File Manager, ${ username || 'Guest' }!`);
console.log(`You are currently in ${ currentDirectory }`);
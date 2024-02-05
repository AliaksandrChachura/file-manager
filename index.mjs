import { createInterface } from 'node:readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'node:process';

import { username } from './src/helpers/getUsername.mjs';
import { homeDirectory } from './src/helpers/getHomeDirectory.mjs';
import { changeDirectory } from './src/modules/changeDirectory.mjs';
import { upperDirectory } from './src/modules/upperDirectory.mjs';
import { listFilesAndFolders } from './src/modules/createListFilesAndFolders.mjs';
import { readFile } from './src/modules/catFile.mjs';
import { addFile } from './src/modules/addFile.mjs';
import { renameFile } from './src/modules/renameFile.mjs';
import { copyFile } from './src/modules/copyFile.mjs';
import { moveFile } from './src/modules/moveFile.mjs';
import { removeFile } from './src/modules/removeFile.mjs';

let currentDirectory = homeDirectory;

const rl = createInterface({ input, output });

rl.on('line', async (input) => {
    const command = input.trim().split(' ');

    if (command[0].trim() === 'ls') {  
        listFilesAndFolders(currentDirectory);
    } else if (command[0].trim() === 'cd') {
        currentDirectory = await changeDirectory(currentDirectory, command[1]);
    } else if (command[0].trim() === 'up') {
        currentDirectory = await upperDirectory(currentDirectory);
    } else if (command[0].trim() === 'cat') {
        readFile(currentDirectory, command[1]);
    } else if (command[0].trim() === 'add') {
        addFile(currentDirectory, command[1]);
    } else if (command[0].trim() === 'rn') {
        renameFile(currentDirectory, command[1], command[2]);
    } else if (command[0].trim() === 'cp') {
        copyFile(currentDirectory, command[1], command[2]);
    } else if (command[0].trim() === 'mv') {
        moveFile(currentDirectory, command[1], command[2]);
    } else if (command[0].trim() === 'rm') {
        removeFile(currentDirectory, command[1]);
    } else if (command[0].trim() === '.exit') {
        console.log('Exiting File Manager. Goodbye!');
        process.exit();
    } else {
        console.log(`Unknown command: ${ command[0] }`);
    }
});

console.log(`Welcome to the File Manager, ${ username || 'Guest' }!`);
console.log('');
console.log(`You are currently in ${ currentDirectory }`);
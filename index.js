import { createInterface } from 'node:readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'node:process';
import {
    fsHandler,
    osHandler,
    hashHandler,
    zipHandler,
    errorHandler
} from './src/handlers/index.js';

import { parseArguments } from './src/helpers/getArguments.js';
import { homeDirectory } from './src/helpers/getHomeDirectory.js';

const username = parseArguments(process.argv).username;

let currentDirectory = homeDirectory;

const rl = createInterface({ input, output });

rl.on('line', async input => {

    if (input.trim() === ".exit") {
        rl.close();
        return;
    }

    await parseLine(input);
});

console.log(`Welcome to the File Manager, ${ username || 'Guest' }!`);
console.log('');
console.log(`You are currently in ${ currentDirectory }`);

async function parseLine(input) {
    const command = input.trim().split(' ');
    try {
        if (command[0].trim() === 'ls') {  
            await fsHandler.listFilesAndFolders(currentDirectory);
        } else if (command[0].trim() === 'cd') {
            currentDirectory = await fsHandler.changeDirectory(currentDirectory, command[1]);
        } else if (command[0].trim() === 'up') {
            currentDirectory = await fsHandler.upperDirectory(currentDirectory);
        } else if (command[0].trim() === 'cat') {
            fsHandler.readFile(currentDirectory, command[1]);
        } else if (command[0].trim() === 'add') {
            await fsHandler.addFile(currentDirectory, command[1]);
        } else if (command[0].trim() === 'rn') {
            await fsHandler.renameFile(currentDirectory, command[1], command[2]);
        } else if (command[0].trim() === 'cp') {
            await fsHandler.copyFile(currentDirectory, command[1], command[2]);
        } else if (command[0].trim() === 'mv') {
            await  fsHandler.moveFile(currentDirectory, command[1], command[2]);
        } else if (command[0].trim() === 'rm') {
            await fsHandler.removeFile(currentDirectory, command[1]);
        } else if (`${command[0].trim()} ${command[1].trim()}` === 'os --EOL') {
            osHandler.osEOL();
        } else if (`${command[0].trim()} ${command[1].trim()}` === 'os --cpus') {
            osHandler.osCpus();
        } else if (`${command[0].trim()} ${command[1].trim()}` === 'os --homedir') {
            osHandler.osHomedir();
        } else if (`${command[0].trim()} ${command[1].trim()}` === 'os --username') {
            osHandler.osUsername();
        } else if (`${command[0].trim()} ${command[1].trim()}` === 'os --architecture') {
            osHandler.osArchitecture();
        } else if (command[0].trim() === 'hash') {
            hashHandler.hash(command[1].trim());
        } else if (command[0].trim() === 'compress') {
            zipHandler.compress(command[1].trim(), command[2].trim());
        } else if (command[0].trim() === 'decompress') {
            zipHandler.decompress(command[1].trim(), command[2].trim());
        } else if (command[0].trim() === '.exit') {
            console.log('Exiting File Manager. Goodbye!');
            process.exit();
        } else {
            console.log(`Unknown command: ${ command[0] }`);
        }
    } catch (e) {
        console.log(e.message);
    }
    
}
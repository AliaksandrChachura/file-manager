import { readdir } from 'node:fs/promises';
import { statSync } from 'node:fs';

const listFilesAndFolders = async (currentDirectory) => {
	try {
		const contents = await readdir(currentDirectory);
		let data = [];

		contents
			.filter(item => {
				return statSync(`${currentDirectory}/${item}`).isDirectory();
			})
			.sort()
			.forEach(folder => {
				data.push({ Name: folder, Type: 'Directory'});
			});

		contents
			.filter(item => {
				return statSync(`${currentDirectory}/${item}`).isFile();
			})
			.sort()
			.forEach(file => {
				data.push({ Name: file, Type: 'File'});
			});

		console.table(data);
		console.log('');
		console.log(`You are currently in ${ currentDirectory }`);
	} catch(error) {
		throw Error(error, 'Incorrect command. Please, try another one.')
	}
	}

export { listFilesAndFolders }
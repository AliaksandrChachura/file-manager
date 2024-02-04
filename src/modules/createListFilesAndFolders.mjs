import { readdir, stat } from 'node:fs/promises';

const listFilesAndFolders = async (currentDirectory) => {
	try {
		const contents = await readdir(currentDirectory);
		console.log(currentDirectory);
		console.log(contents);

		const files = contents.filter(item => stat(item).isFile());
		const folders = contents.filter(item => stat(item).isDirectory());

		files.sort();
		folders.sort();

		console.log('Type\tName');
		folders.forEach(folder => console.log('Folder\t' + folder));
		files.forEach(file => console.log('File\t' + file));
	} catch(error) {
		throw Error(error, 'Incorrect command. Please, try another one.')
	}
	}

export { listFilesAndFolders }
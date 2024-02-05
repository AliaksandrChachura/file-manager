import { access } from 'node:fs/promises'

const changeDirectory = async (currentDirectory, targetDirectory) => {
	if (!targetDirectory) {
			console.log('Usage: cd <directory>');
			return;
	}

	const newDirectory = `${currentDirectory}/${targetDirectory}`;

	try {
			await access(newDirectory);
			console.log('');
			console.log(`You are currently in ${ newDirectory }`);
			return newDirectory;
	} catch (error) {
			console.error(`Error changing directory: ${error.message}`);
			return currentDirectory;
	}
}

export { changeDirectory }
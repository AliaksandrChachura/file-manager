import { access, rename, constants } from 'node:fs/promises';

const renameFile = async ( currentDirectory, fileName, newFileName ) => {

	const oldName = `${currentDirectory}/${fileName}`;
	const newName = `${currentDirectory}/${newFileName}`;

	try {
		await access(oldName, constants.F_OK);

		try {
				await access(newName, constants.F_OK);
				console.error(`The file "${newFileName}" already exists`);
				console.log('');
				console.log(`You are currently in ${ currentDirectory }`);
		} catch (newNameAccessError) {
				if (newNameAccessError.code === 'ENOENT') {
						await rename(oldName, newName);
						console.log('');
						console.log(`You are currently in ${ currentDirectory }`);
				} else {
						console.error(`Error accessing the new file: ${newNameAccessError.message}`);
				}
		}
	} catch (oldNameAccessError) {
			if (oldNameAccessError.code === 'ENOENT') {
					console.error(`There is no such file`);
			} else {
					console.error(`Error accessing the old file: ${oldNameAccessError.message}`);
			}
	}

	process.stdin.resume();

	process.on('SIGINT', () => {
			console.log('Received interrupt signal. Exiting...');
			process.exit();
	});
}

export { renameFile };
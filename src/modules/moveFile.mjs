import { access, constants, unlink } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';

const moveFile = async ( currentDirectory, fileName, newFileName ) => {
	const sourcePath = `${currentDirectory}/${fileName}`;
	const destinationPath = `${currentDirectory}/${newFileName}`;

	try {
			await access(sourcePath, constants.F_OK);

			try {
					await access(destinationPath, constants.F_OK);
					console.error(`The destination file "${newFileName}" already exists`);
			} catch (destinationAccessError) {
					if (destinationAccessError.code === 'ENOENT') {
							const readStream = createReadStream(sourcePath);
							const writeStream = createWriteStream(destinationPath);

							readStream.pipe(writeStream);
							readStream.on('end', async () => {
									console.log(`File "${fileName}" moved to "${newFileName}" successfully.`);
									console.log('');
									console.log(`You are currently in ${ currentDirectory }`);

									try {
										await unlink(sourcePath);
										console.log(`Original file "${fileName}" deleted.`);
										console.log('');
										console.log(`You are currently in ${ currentDirectory }`);
									} catch (unlinkError) {
											console.error(`Error deleting the original file: ${unlinkError.message}`);
											console.log('');
											console.log(`You are currently in ${ currentDirectory }`);
									}
							});

							readStream.on('error', (error) => {
								console.error(`Error reading file: ${error.message}`);
								console.log('');
								console.log(`You are currently in ${ currentDirectory }`);
							});

							writeStream.on('error', (error) => {
								console.error(`Error writing file: ${error.message}`);
							});
					} else {
							console.error(`Error accessing the destination file: ${destinationAccessError.message}`);
					}
			}
	} catch (sourceAccessError) {
			if (sourceAccessError.code === 'ENOENT') {
					console.error(`The source file "${fileName}" does not exist`);
			} else {
					console.error(`Error accessing the source file: ${sourceAccessError.message}`);
			}
	}
};

export { moveFile };
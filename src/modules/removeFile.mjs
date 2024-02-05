import { access, constants, unlink } from 'node:fs/promises';

const removeFile = async ( currentDirectory, fileName ) => {
		const filePath = `${currentDirectory}/${fileName}`;

    try {
        await access(filePath, constants.F_OK);

        await unlink(filePath);
        console.log(`File "${fileName}" deleted successfully.`);
				console.log('');
				console.log(`You are currently in ${ currentDirectory }`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`The file "${filePath}" does not exist`);
						console.log('');
						console.log(`You are currently in ${ currentDirectory }`);
        } else {
            console.error(`Error deleting the file: ${error.message}`);
						console.log('');
						console.log(`You are currently in ${ currentDirectory }`);
        }
    }

		process.stdin.resume();

		process.on('SIGINT', () => {
				console.log('Received interrupt signal. Exiting...');
				process.exit();
		});
};

export { removeFile };
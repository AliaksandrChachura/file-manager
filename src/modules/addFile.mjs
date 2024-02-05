import { writeFile} from 'node:fs/promises';

const addFile = async ( currentDirectory, file ) => {

	const writeFilePath = `${currentDirectory}/${file}`;

	try {
		await writeFile(writeFilePath, '', { encoding: 'utf-8' });
		console.log('');
		console.log(`You are currently in ${ currentDirectory }`);
	} catch (err) {
		console.error(`Error creating the file: ${err.message}`);
	}

	process.stdin.resume();

	process.on('SIGINT', () => {
		console.log('Received interrupt signal. Exiting...');
		process.exit();
	});
}

export { addFile };
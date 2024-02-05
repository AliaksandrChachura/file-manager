import { createReadStream } from 'node:fs';

const readFile = (currentDirectory, file) => {
	const readFilePath = `${currentDirectory}/${file}`;

	const readableStream = createReadStream(readFilePath, { encoding: 'utf-8' });

	readableStream.on('data', (chunk) => {
			console.log(chunk);
	});

	readableStream.on('end', () => {
		console.log('');
		console.log(`You are currently in ${ currentDirectory }`);
	});

	readableStream.on('error', (error) => {
			console.error(`Error reading the file: ${error.message}`);
	});

	process.stdin.resume();

	process.on('SIGINT', () => {
			console.log('Received interrupt signal. Exiting...');
			process.exit();
	});
}



// const cat = async (currentDirectory, file) => {

//     const readFilePath = `${currentDirectory}/${file}`;

//     try {
//         await fs.access(readFilePath);
//         const contents = await readFile(readFilePath, { encoding: 'utf8' });
//         console.log(contents);
//         console.log('');
// 				console.log(`You are currently in ${ newDirectory }`);
//     } catch {
//         throw new Error(`FS operation failed: the file is not exist`);
//     }
// };

export { readFile };
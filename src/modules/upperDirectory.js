import { access } from 'node:fs/promises'

const upperDirectory = async (currentDirectory) => {
 	const upperDirectory = currentDirectory
		.split('/')
		.slice(0, -1)
		.join('/')
		.trim();

		try {
			await access(upperDirectory);
			console.log('');
			console.log(`You are currently in ${ upperDirectory }`);
			return upperDirectory;
		} catch (error) {
			console.error(`Error changing directory: ${error.message}`);
			return currentDirectory;
		}
}

export { upperDirectory }
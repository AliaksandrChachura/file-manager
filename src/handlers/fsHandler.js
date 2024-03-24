import {
 readdir,
 access,
 rename,
 constants,
 unlink
} from 'node:fs/promises';
import {
 statSync,
 createReadStream,
 createWriteStream
} from 'node:fs';

class fsHandler {

 static async listFilesAndFolders(currentDirectory) {
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

 static async upperDirectory(currentDirectory) {
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

 static async changeDirectory(currentDirectory, targetDirectory) {
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

 static readFile(currentDirectory, file) {
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

 static async addFile( currentDirectory, file ) {

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

 static async renameFile( currentDirectory, fileName, newFileName ) {

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

 static async copyFile( currentDirectory, fileName, newFileName ) {

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
 
           readStream.on('end', () => {
       console.log(`File "${fileName}" copied to "${newFileName}" successfully.`);
       console.log('');
       console.log(`You are currently in ${ currentDirectory }`);
           });
 
           readStream.on('error', (error) => {
       console.error(`Error reading file: ${error.message}`);
       console.log('');
       console.log(`You are currently in ${ currentDirectory }`);
           });
 
           writeStream.on('error', (error) => {
       console.error(`Error writing file: ${error.message}`);
       console.log('');
       console.log(`You are currently in ${ currentDirectory }`);
           });
       } else {
           console.error(`Error accessing the destination file: ${destinationAccessError.message}`);
      console.log('');
      console.log(`You are currently in ${ currentDirectory }`);
       }
    }
 } catch (sourceAccessError) {
   if (sourceAccessError.code === 'ENOENT') {
       console.error(`The source file "${sourcePath}" does not exist`);
   } else {
       console.error(`Error accessing the source file: ${sourceAccessError.message}`);
   }
 }
 
  process.stdin.resume();
 
  process.on('SIGINT', () => {
    console.log('Received interrupt signal. Exiting...');
    process.exit();
  });
 }

 static async mv( currentDirectory, fileName, newFileName ) {
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
 }

 static async rm( currentDirectory, fileName ) {
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
 }

 static async hash() {}

 static async compress() {}

 static async decompress() {}
};

export { fsHandler };
function parseArguments(argv) {
 const args = {};
 argv.slice(2).forEach(arg => {
   if (arg.startsWith('--')) {
     const [key, value] = arg.split('=');
     args[key.substring(2)] = value;
   }
 });
 return args;
};

export { parseArguments };
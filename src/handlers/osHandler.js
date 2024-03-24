import os from 'node:os';

const osHandler = {

 osEOL: () => {
  console.log(os.EOL);
 },

 osCpus: () => {
  console.table(
   os.cpus().map(cpu => {
     return {
       "CPU model": cpu.model,
       "Speed, GHz": process.platform === "win32" ? cpu.speed / 1000 : cpu.speed // translate MHz to GHz
     };
   })
 );
 console.log(`${os.cpus().length} logical cores totally`);
 console.log(`Available parallelism for applications is ${os.availableParallelism()}`);
 },

 osHomedir: () => {
  console.log(os.userInfo().homedir);
 },

 osUsername: () => {
  console.log(os.userInfo().username);
 },

 async osArchitecture() {
  console.log(os.arch());
 }
};

export { osHandler };

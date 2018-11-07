//related tutorial URL:
//https://www.youtube.com/watch?v=s6SH72uAn3Q
//https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee

let cleanRoom = function() {
    return new Promise(function(resolve, reject) {
      resolve('Cleaned The Room');
    });
  };
  
  let removeGarbage = function(message) {
    return new Promise(function(resolve, reject) {
      resolve(message + ' remove Garbage');
    });
  };
  
  let winIcecream = function(message) {
    return new Promise(function(resolve, reject) {
      resolve( message + ' won Icecream');
    });
  };
  
//   cleanRoom().then(function(result){
//       return removeGarbage(result);
//   }).then(function(result){
//       return winIcecream(result);
//   }).then(function(result){
//       console.log('finished ' + result);
//   })
  
// Promise.all([cleanRoom(), removeGarbage(), winIcecream()]).then(function() {
//     console.log(`all finished`);
// });


// Promise.race([cleanRoom(), removeGarbage(), winIcecream()]).then(function() {
//     console.log(`one of them is finished`);
// });


//node.js syntax

// const { promisify } = require(‘util’);
// const getAsyncData = promisify(getData);
// getAsyncData(“someValue”)
// .then(function(result){
//     // Do stuff
// })
// .catch(function(error){
//     // Handle error
// });
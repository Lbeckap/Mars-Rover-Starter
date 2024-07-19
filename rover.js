const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position, mode = 'NORMAL', generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
      
   }
   receiveMessage(message) {
      let results = [];
      for (let item in message.commands) { 
         results.push(message.commands[item]);
      }
      const returnedMessage = {
         name: message.name, 
         results: results,
      };
      return returnedMessage;
   }
}


module.exports = Rover;
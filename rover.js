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
         results.push({ completed: true });

         if (message.commands[item]['commandType'] === 'MODE_CHANGE') {
            this.mode = message.commands[item]['value'];
         }

         if (message.commands[item]['commandType'] === 'STATUS_CHECK') {
            results[item].mode = this.mode;
            results[item].generatorWatts = this.generatorWatts;
            results[item].position = this.position;
         }

         if (message.commands[item]['commandType'] === 'MOVE' && this.mode === 'LOW_POWER') {
            results.splice(item, 1, { completed: false })

         } else if (message.commands[item]['commandType'] === 'MOVE' && this.mode === 'NORMAL') {
            this.position = message.commands[item]['value'];
         }
      }

      const returnedMessage = {
         name: message.name,
         results: results,
      };
      return returnedMessage;
   }
}

module.exports = Rover;
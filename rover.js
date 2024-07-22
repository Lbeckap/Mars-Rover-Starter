const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let results = [];
      for (let item in message.commands) {
         results.push({ completed: true });
         if (message.commands[item]['commandType'] === 'MODE_CHANGE') {
            this.mode = message.commands[item]['value'];
         }

         if (message.commands[item]['commandType'] === 'STATUS_CHECK') {
            let update = {
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position,
               },
            }
            results.splice(item, 1, update);
         }

         if (message.commands[item]['commandType'] === 'MOVE' && this.mode === 'LOW_POWER') {
            results.splice(item, 1, { completed: false })

         } else if (message.commands[item]['commandType'] === 'MOVE' && this.mode === 'NORMAL') {
            this.position = message.commands[item]['value'];
         }
      }
      const returnedMessage = {
         message: message.name,
         results: results,
      };
      return returnedMessage;
   }
}

module.exports = Rover;
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
      // let status = true;

      for (let item in message.commands) {
        console.log(`current command ${message.commands[item]['commandType']}\ncurrent mode ${this.mode}`); //DEBUGGING  
        results.push({ completed: true});

         if(message.commands[item]['commandType'] === 'MODE_CHANGE') {
           this.mode = message.commands[item]['value'];
         }

         if (message.commands[item]['commandType'] === 'STATUS_CHECK') {
            results[item].mode = this.mode;
            results[item].generatorWatts = this.generatorWatts;
            results[item].position = this.position;
         }

         if(message.commands[item]['commandType'] === 'MOVE' && this.mode === 'LOW_POWER'){
            // status = false;
            results.splice(item, 1, {completed: false})
                    
         } else if (message.commands[item]['commandType'] === 'MOVE' && this.mode === 'NORMAL'){
            this.position = message.commands[item]['value'];
         }
         console.log(`new mode: ${this.mode}`); //DEBUGGING  
      }

      const returnedMessage = {
         name: message.name,
         results: results,
      };
      return returnedMessage;
   }
}

// let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
// let message = new Message('Test message with two commands', commands);
// let rover = new Rover(98382);    // Passes 98382 as the rover's position.
// let response = rover.receiveMessage(message);

// console.log(response);

module.exports = Rover;
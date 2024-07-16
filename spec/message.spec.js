const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    test('constructor sets the name of the message as the first parameter', () => {
      expect(new Message('MODE_CHANGE','commands')).toHaveProperty('name', 'MODE_CHANGE');
    });
    
    test('constructor sets the command of the message as the 2nd parameter', () => {
        expect(new Message('name','Test message')).toHaveProperty('commands', 'Test message');
      });

    test('parameter commands is an array of objects', () => {
        expect(new Message('name', [{1:'1'},{2:'2'},{3:'3'}])).toHaveProperty('commands', expect.arrayContaining([{1:'1'},{2:'2'},{3:'3'}]));
    })

    it("throws error if name is NOT passed into constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('name required'));
      });
    
});

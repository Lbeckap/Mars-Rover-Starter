const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function () {
  //* TEST 7
  test('constructor sets position and default values for mode and generatorWatts', function () {
    expect(new Rover('position', `mode = 'NORMAL'`, `generatorWatts = 110`)).toHaveProperty('position', 'position');
    expect(new Rover('position', `NORMAL`, `generatorWatts = 110`)).toHaveProperty('mode', 'NORMAL');
    expect(new Rover('position', `mode = 'NORMAL'`, 110)).toHaveProperty('generatorWatts', 110);
  });

  //* TEST 8
  test('response returned by receiveMessage contains the name of the message', function () {
    let messageTest = {
      name: 'Test message with two commands',
    };
    expect((new Rover()).receiveMessage(messageTest)).toEqual(
      expect.objectContaining({
        name: messageTest.name,
      }),);
  });

  //* TEST 9
  test('response returned by receiveMessage includes two results if two commands are sent in the message', function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let newMessage = new Message('Test message with two commands', commands);

    expect((new Rover()).receiveMessage(newMessage)).toEqual(
      expect.objectContaining({
        results: (new Rover()).receiveMessage(newMessage).results,
      }),);
  });

  //* TEST 10
  test('responds correctly to the status check command', function () {
    let commands = [new Command('STATUS_CHECK')];
    let newMessage = new Message('Test for status check command', commands);
    let rover = (new Rover(98382, mode = 'NORMAL', generatorWatts = 110));
    let results = rover.receiveMessage(newMessage).results;
    expect(results[0]).toEqual(expect.objectContaining({
      completed: true,
      generatorWatts: 110,
      mode: 'NORMAL',
      position: 98382,
    }),);
  });

  //* TEST 11
  test('responds correctly to the mode change command', function () {

    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let newMessage = new Message('Test for mode change command', commands);
    let rover = (new Rover(98382, mode = 'NORMAL', generatorWatts = 110));
    let results = rover.receiveMessage(newMessage).results;
    let output = rover.mode;
    expect(results[0]).toEqual(expect.objectContaining({
      completed: true,
    }),);
    expect(output).toEqual('LOW_POWER');
  });



  //* TEST 12

  //* TEST 13

});

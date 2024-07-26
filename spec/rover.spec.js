const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function () {
  test('constructor sets position and default values for mode and generatorWatts', function () {
    expect(new Rover(98382)).toHaveProperty('position', 98382);
    expect(new Rover(98382)).toHaveProperty('mode', 'NORMAL');
    expect(new Rover(98382)).toHaveProperty('generatorWatts', 110);
  });

  test('response returned by receiveMessage contains the name of the message', function () {
    let message = new Message('TA power');
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response).toEqual(
      expect.objectContaining({
        message: message.name,
      }),);
  });

  test('response returned by receiveMessage includes two results if two commands are sent in the message', function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });

  test('responds correctly to the status check command', function () {
    let commands = [new Command('STATUS_CHECK')];
    let newMessage = new Message('Test for status check command', commands);
    let rover = new Rover(98382);
    let results = rover.receiveMessage(newMessage).results;
    expect(results[0]).toEqual(expect.objectContaining({
      completed: true,
      roverStatus: {
        mode: 'NORMAL',
        generatorWatts: 110,
        position: 98382,
      },
    }),);
  });

  test('responds correctly to the mode change command', function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let newMessage = new Message('Test for mode change command', commands);
    let rover = new Rover(98382);
    let results = rover.receiveMessage(newMessage).results;
    let output = rover.mode;
    expect(results[0]).toEqual(expect.objectContaining({
      completed: true,
    }),);
    expect(output).toEqual('LOW_POWER');
  });

  test('responds with a false completed value when attempting to move in LOW_POWER mode', function () {
    let commands = [new Command('MOVE', 98400)];
    let newMessage = new Message('Test for MOVE command', commands);
    let rover = (new Rover(98382));
    rover.mode = 'LOW_POWER';
    let results = rover.receiveMessage(newMessage).results;
    let output = rover.position;
    expect(results[0]).toEqual(expect.objectContaining({
      completed: false,
    }),);
    expect(output).toEqual(98382);
  });

  test('responds with the position for the move command', function () {
    let commands = [new Command('MOVE', 98400)];
    let newMessage = new Message('Test for MOVE command', commands);
    let rover = (new Rover(98382));
    rover.receiveMessage(newMessage);
    let output = rover.position;
    expect(output).toEqual(98400);
  });
});

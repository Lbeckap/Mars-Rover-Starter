class Command {
  constructor(commandType, value) {
    this.commandType = commandType; // MODE_CHANGE, MOVE or STATUS_CHECK
    if (!commandType) {
      throw Error("Command type required.");
    }
    this.value = value;
  }

}


module.exports = Command;


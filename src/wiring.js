
const Signal = require('./signal');
const Slot = require('./slots');


class Wiring {
    constructor(){

    }

    static Connect(signal, slot, channelID){
      signal._AddListener(slot.GetAction(channelID));
      slot._MarkChannel(channelID);
    }

    static Disconnect(signal, slot, channelID){
      signal._RemoveListeners(slot.GetAction(channelID));
      slot._UnmarkChannel(channelID);
    }

    static Signal (maxListeners){
      return new Signal(maxListeners);
    }

    static Slot (context){
      return new Slot(context);
    }

  }



module.exports = Wiring;

/**
* browser version.
*/

(function() {


class Signal {
  /**
  * Create a Signal.
  * @param {number} maxListeners. Defaul 10
  */
  constructor(maxListeners = 10){
    /**
    * Max listeners for the signal
    * @type {number}
    */
    this.maxListeners = parseInt(maxListeners, 10);

    /**
    * stack of functions to execute when signal trips
    * @type {number}
    */
    this._callbackStack = [];
  }

  /**
  * Trip the Signal.
  */
  Emit(){

        const callbacks = this._callbackStack;
        let args = Array.prototype.slice.call(arguments);

        // Number of callbacks.
        callbacks.forEach(function(element){
          element.apply(this, args);          
        })
    }

  /**
  * Add a listener to the callback stack.
  * @param {function} callback
  * @throws {TypeError} If callback is not a function.
  * @throws {RangeError} If max listeners are reached
  */
  _AddListener(callback){
      if (typeof callback !== 'function') {
      throw new TypeError(`${callback} is not a function`);
      }

      if(this._callbackStack.length <= this.maxListeners){
        this._callbackStack.push(callback)
      }
      else{
        throw new RangeError("Max listeners reached");
      }
    }

  /**
  *Remove a listener from listeners stack.
  */
  _RemoveListeners(callback){
      let pos = this._callbackStack.indexOf(callback);
      if (pos >= 0) {
        this._callbackStack.splice(pos, 1);
      }
    }
}

class Slot {
  /**
  * Create a Signal.
  * @param {object} context.
  */
  constructor(context){

    /**
    * One slot object can have several channels and one channel have asociete one function
    * @type {map}
    */
    this._channelsStack = new Map();

    /**
    * Set of channels connected to a signal
    * @type {set}
    */
    this._channelsUsed = new Set();

    /**
    * Context or object thats own the slot.
    * @type {object}
    */
    this._context = context;

    Object.defineProperty(this,'_context', {
      enumerable: false,
      configurable: false,
      writable: false
    })

  }

  /**
  * Configure a channnel in the slot asigning a function to call when signal connected is received.
  * @param {string} channelID
  * @param {function} acction
  * @throws {TypeError} If acctionis not a function.
  */
  SetChannel(channelID, acction){
    if (typeof acction !== 'function') {
    throw new TypeError(`${callback} is not a function`);
    }
    else{
      let callback = acction.bind(this._context);
      this._channelsStack.set(channelID, callback);
    }
  }

  /**
  * Mark a channel as Used.
  * @param {string} channelID
  */
  _MarkChannel(channelID){
    this._channelsUsed.add(channelID);
  }

  /**
  * Unmark a channel as Used.
  * @param {string} channelID
  */
  _UnmarkChannel(channelID){
    this._channelsUsed.delete(channelID);
  }

  /**
  * Get a channel asociete function.
  * @param {string} channelID
  * @return {function}
  */
  GetAction(channelID){
    return this._channelsStack.get(channelID);
  }

  /**
  * Delete a channel from channel Stack.
  * @param {string} channelID
  * @throws {Error} If channel is in use.
  */
  ResetChannel(channelID){
    if(this._channelsUsed.has(channelID)){
      throw new Error('unable to delete a chanel in use');
    }
    else{
      this._channelsStack.delete(channelID);
    }
  }
}

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
  return Wiring;
})()

/**
** Slot module.
* @module signal.js
* @author Hector E. Socarras.
* @version 0.2.0
*/

/**
 * Class representing a signal object.
*/
module.exports = class Slot {
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

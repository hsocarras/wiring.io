/**
** Signal module.
* @module signal.js
* @author Hector E. Socarras.
* @version 0.2.0
*/

/**
 * Class representing a signal object.
*/
module.exports = class Signal {
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

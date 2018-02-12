# wiring.io
A javascript library for Qt signals and slot pattern.

## Getting Started
* ### Install
#### installing nodbus-plus as a node package
    $ npm install wiring.io
#### installing nodbus from source

* ### Usage:


      const Wiring = require('wiring.io')


  Creating a signal.

      class Valve {
        constructor(name){
          this.name = name;
          //1 valve open, 0 valve closed,
          this.valveStatus = Wiring.Signal();
        }
      }


Creating a slot.

    class Controler {
      constructor(){
        this.slot1 = Wiring.Slot(this);
      }
    }



Configuring the slot.

    controler1.slot1.SetChannel('0', function(PV){
      if(PV == 0){
        console.log('valve closed')
      }
      else{
        console.log('valve open' + PV);
      }
    })

Connecting:

      Wiring.Connect(valve1.valveStatus, controler1.slot1, '0');

Disconecting

    Wiring.Disconnect(valve1.valveStatus, controler1.slot1, '0');

## Documentation and Tutorials
See: https://github.com/hsocarras/wirin.io/wiki
## Contributing

If you have a suggestion or found a issue, let us known and [create an issue](https://github.com/hsocarras/wiring.io/issues)



## License

This project is licensed under the MIT License - see the LICENSE.md file for details

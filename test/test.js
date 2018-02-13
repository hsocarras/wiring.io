const Wiring = require('../')

class Valve {
  constructor(name){
    this.name = name;
    //1 valve open, 0 valve closed,
    this.valveStatus = Wiring.Signal();
    //two arguments Signal
    //Send Flow and eng Unit
    this.valveData = Wiring.Signal();
  }
}

class Controler {
  constructor(){
    this.slot1 = Wiring.Slot(this);
  }
}

let valve1 = new Valve('xv01001');
let controler1 = new Controler();

controler1.slot1.SetChannel('0', function(PV){
  if(PV == 0){
    console.log('valve closed')
  }
  else{
    console.log('valve open');
  }
})
controler1.slot1.SetChannel('1', function(PV, engUnit){
  console.log('Actul flow is:' + ' ' +PV + ' ' + engUnit)
})

Wiring.Connect(valve1.valveStatus, controler1.slot1, '0');
Wiring.Connect(valve1.valveData, controler1.slot1, '1');

valve1.valveStatus.Emit(1);
valve1.valveStatus.Emit(0);
valve1.valveData.Emit(12, 'l/h');

Wiring.Disconnect(valve1.valveStatus, controler1.slot1, '0');

valve1.valveStatus.Emit(1);

const Wiring = require('../')

class Valve {
  constructor(name){
    this.name = name;
    //1 valve open, 0 valve closed,
    this.valveStatus = Wiring.Signal();
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
    console.log('valve open' + PV);
  }
})

Wiring.Connect(valve1.valveStatus, controler1.slot1, '0');

valve1.valveStatus.Emit(1);
valve1.valveStatus.Emit(0);

Wiring.Disconnect(valve1.valveStatus, controler1.slot1, '0');

valve1.valveStatus.Emit(1);

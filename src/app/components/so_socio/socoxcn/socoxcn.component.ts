import { Component, OnInit } from '@angular/core';
//components
import {AlertComponent} from '../../alert/alert.component';

@Component({
  selector: 'app-socoxcn',
  templateUrl: './socoxcn.component.html',
  styleUrls: ['./socoxcn.component.css']
})
export class SocoxcnComponent implements OnInit {
  par_busq:any={};
  constructor(private _alert:AlertComponent) { }
 message:string;
  ngOnInit() {

  	this.showMessage("Error conectando con el servidor: error TS2307: Cannot find module './so_socio/socoxcn/socoxcn.component'");
  }

  showMessage(msg:string){
  	this.message = msg;
  	this._alert.showMessage();
  }

}

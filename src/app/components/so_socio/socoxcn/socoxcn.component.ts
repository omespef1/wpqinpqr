import { Component, OnInit } from '@angular/core';
//components
import {AlertComponent} from '../../alert/alert.component';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
//providers
import {ComunicationsService} from '../../../../services/comunications.service';
//Models
import {ToTransaction} from '../../../../classes/models';
@Component({
  selector: 'app-socoxcn',
  templateUrl: './socoxcn.component.html',
  styleUrls: ['./socoxcn.component.css']
})
export class SocoxcnComponent implements OnInit {
      par_busq:any = {
      ter_coda:"88284896",
      ter_noco:"RIXON AMAYA",
      fec_ffin: "",
    };
     submitted:boolean= false;
    cuentasxcobrar : any[];
  constructor(private _alert:AlertComponent,private _comu:ComunicationsService) { }
 message:string;
  ngOnInit() {

  }

  consultarcartera(){
    console.log(moment(this.par_busq.fec_ffin).format("YYYY-MM-DD"));
     this._comu.Get(`api/cacxcob?cli_coda=${this.par_busq.fec_ffin}&fcxc_fech=${this.par_busq.fec_ffin}`).subscribe((resp:ToTransaction)=>{
         if(resp.Retorno==0){
             this.cuentasxcobrar = resp.ObjTransaction;
         }
         else{
           this.showMessage(resp.TxtError);
         }

     },err=>{
       this.showMessage("Error conectando con el servidor");
     })
  }

  showMessage(msg:string){
  	this.message = msg;
  	this._alert.showMessage();
  }

}

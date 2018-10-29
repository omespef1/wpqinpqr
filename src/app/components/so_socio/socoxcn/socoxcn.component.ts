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
    misproductos:any[];
  constructor(private _alert:AlertComponent,private _comu:ComunicationsService) { }
 message:string;
  ngOnInit() {

  }

  consultarcartera(){
    let fec_ffin =moment(this.par_busq.fec_ffin).format("YYYY-MM-DD");
    this.submitted = true;
     this._comu.Get(`api/cacxcob?cli_coda=${this.par_busq.ter_coda}&cxc_fech=${fec_ffin}`).subscribe((resp:ToTransaction)=>{
         if(resp.Retorno==0){
             this.cuentasxcobrar = resp.ObjTransaction;
         }
         else{
           this.showMessage(resp.TxtError);
         }

     },err=>{
       this.showMessage("Error conectando con el servidor");
     })

     this._comu.Get(`api/socoxcn?soc_codi=${this.par_busq.ter_coda}&cox_fech=${this.par_busq.fec_ffin}`).subscribe((resp:ToTransaction)=>{
       if(resp.Retorno==0){
             this.misproductos = resp.ObjTransaction;
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

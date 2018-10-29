import { Component, OnInit } from '@angular/core';
//components
import {AlertComponent} from '../../alert/alert.component';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from "@angular/router";
//providers
import {ComunicationsService} from '../../../../services/comunications.service';
//Models
import {ToTransaction} from '../../../../classes/models';
//pipes
import {TarjetasPipe} from '../../../pipes/socoxcn/tarjetas.pipe';
@Component({
  selector: 'app-socoxcn',
  templateUrl: './socoxcn.component.html',
  styleUrls: ['./socoxcn.component.css']
})
export class SocoxcnComponent implements OnInit {
      par_busq:any = {
      ter_coda:"",
      ter_noco:"",
      fec_ffin: "",
      usu_codi:"",
    };
     submitted:boolean= false;
    cuentasxcobrar : any[]=[];
    misproductos:any[]=[];
  constructor(private _alert:AlertComponent,private _comu:ComunicationsService,private spinner: NgxSpinnerService, private route: ActivatedRoute) { }
 message:string;
  ngOnInit() {

  }

  async consultarcartera(){
  this.spinner.show();
    let fec_ffin =moment(this.par_busq.fec_ffin).format("YYYY-MM-DD");
    this.submitted = true;
   await  this._comu.Get(`api/cacxcob?cli_coda=${this.par_busq.ter_coda}&cxc_fech=${fec_ffin}`).subscribe((resp:ToTransaction)=>{
         if(resp.Retorno==0){
             this.cuentasxcobrar = resp.ObjTransaction;
         }
         else{
           this.showMessage(resp.TxtError);
         }

     },err=>{
       this.showMessage("Error conectando con el servidor");
     })

    await this._comu.Get(`api/socoxcn?soc_codi=${this.par_busq.ter_coda}&cox_fech=${fec_ffin}`).subscribe((resp:ToTransaction)=>{
       if(resp.Retorno==0){
             this.misproductos = resp.ObjTransaction;
       }
       else{
         this.showMessage(resp.TxtError);
       }
     },err=>{
       this.showMessage("Error conectando con el servidor");
     })
    this.spinner.hide();

  }
  getGnterce(){
      this.route.queryParamMap.subscribe(queryParams => {

   this.par_busq.usu_codi =   atob(queryParams.get("usu_codi")) ;
   if(this.par_busq.usu_codi!=null)  {
     this.spinner.show();
       this._comu.Get(`api/gnterce?usu_codi=${this.par_busq.usu_codi}`).toPromise().then((resp:ToTransaction)=>{
         this.spinner.hide();
         if(resp.Retorno==0){
           this.par_busq.ter_coda = resp.ObjTransaction.ter_coda;
           this.par_busq.ter_noco = resp.ObjTransaction.ter_noco;
         }
       },err=>{
      
         this.spinner.hide();
         this.showMessage("Error conectando con el servidor");
       })
   }
   else {
     this.message = "No se ha especificado ningún usuario seven";
     this._alert.showMessage();
   }
 });
  }

  showMessage(msg:string){
  	this.message = msg;
  	this._alert.showMessage();
  }

}

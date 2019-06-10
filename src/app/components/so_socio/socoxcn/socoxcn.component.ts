import { Component, OnInit,ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
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
  @ViewChild(AlertComponent) _alert : AlertComponent;
      par_busq:any = {
      ter_coda:"",
      ter_noco:"",
      fec_ffin: new Date(),
      usu_codi:"",
    };
     submitted:boolean= false;
    cuentasxcobrar : any[]=[];
    misproductos:any[]=[];
    pasarela:string;
  constructor(private _comu:ComunicationsService,private spinner: NgxSpinnerService, private route: ActivatedRoute,private titleService: Title ) { }
 message:string;
  ngOnInit() {
    this.setTitle("Mis productos y servicios");
  this.getGnterce();
  this.getPasarela();
  }
 public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  async consultarcartera(){
  this.spinner.show();
    let fec_ffin =moment(this.par_busq.fec_ffin).format("YYYY-MM-DD");
    this.submitted = true;
   await  this._comu.Get(`api/cacxcob?cli_coda=${this.par_busq.ter_coda}&cxc_fech=${fec_ffin}`).subscribe((resp:ToTransaction)=>{
     this.spinner.hide();
     
         if(resp.Retorno==0){
             this.cuentasxcobrar = resp.ObjTransaction;
         }
         else{
           this.showMessage(resp.TxtError);
         }

     },err=>{
       this.showMessage("Error conectando con el servidor");
     })

this.spinner.show();
    await this._comu.Get(`api/socoxcn?soc_codi=${this.par_busq.ter_coda}&cox_fech=${fec_ffin}`).subscribe((resp:ToTransaction)=>{
      this.spinner.hide();
     
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
     this._alert.showMessage("No se ha especificado ningún usuario seven");
   }
 });
  }

  showMessage(msg:string){
    console.log(msg);
  	this._alert.showMessage(msg);
  }

  getPasarela(){
    this._comu.Get("api/papagos").subscribe((resp:string)=>{
      
     
        this.pasarela = resp;
      

    })
  }
  pagar(){
    if(this.pasarela=="1")
      this.showMessage("Pasarela de pago no definida en api");
    else {
      if(this.pasarela.indexOf("http")>0)
          window.open(this.pasarela);
        else
           window.open(`http://${this.pasarela}`);
    }
  }

}

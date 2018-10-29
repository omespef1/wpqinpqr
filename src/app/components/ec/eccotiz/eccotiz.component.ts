import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ComunicationsService} from '../../../../services/comunications.service'
import { Title }     from '@angular/platform-browser';
//components
import {AlertComponent} from '../../alert/alert.component';

//models
import {eccotiz,TOEcDespa} from '../../../../classes/ec/eccotiz';
import {ToTransaction} from '../../../../classes/models';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-eccotiz',
  templateUrl: './eccotiz.component.html',
  styleUrls: ['./eccotiz.component.css']
})

export class EccotizComponent implements OnInit {
  message:string;
   cotizaciones : eccotiz[];
   cotizacion:any={};
   conceptos:any[]=[];
   detalleEspacio:any={};
   detalles:TOEcDespa[];
   submitted:boolean= false;
    par_busq:any = {
      ter_coda:"",
      ter_noco:"",
      fec_fini: "",
      fec_ffin: "",
      usu_codi:"",

    };
  constructor(private _comu:ComunicationsService, private route: ActivatedRoute, private _alert:AlertComponent,private spinner: NgxSpinnerService,private titleService: Title ) { }

  ngOnInit() {
       this.setTitle("Cotizaciones");
    //Busca el tercero desde la url y lo carga
     this.getGnTerce();
  }
   public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
async getGnTerce(){
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
//Realiza la búsqueda
  search(){
  this.submitted = true;
  this.spinner.show();
    let fini = moment(this.par_busq.fec_fini).format('YYYYMMDD');
    let ffin = moment(this.par_busq.fec_ffin).format('YYYYMMDD');

    this._comu.Get(`api/eccotiz?ter_coda=${this.par_busq.ter_coda}&usu_codi=${this.par_busq.usu_codi}&fec_fini=${fini}&fec_ffin=${ffin}`).subscribe((resp:ToTransaction)=>{
      console.log(resp);
      this.spinner.hide();
        if(resp.Retorno==0){
          this.cotizaciones = resp.ObjTransaction;
        }
        else{
          this.showMessage(resp.TxtError);
        }
   },err=>{
     this.spinner.hide();
     this.showMessage("Error conectando con el servidor");
   })
  }
  setCotizacion(cotizacion:eccotiz){
    console.log(cotizacion);
    this.cotizacion = cotizacion;
    this.showModales("detalles");
  }
//Despliega los modales
  showModales(tipo:string){
    switch(tipo){
      case "detalles":
      document.getElementById("btnModalDetalles").click();
      break;
      case "Productos":
        document.getElementById("btnModalDetalles").click();
      document.getElementById("btnModalProductos").click();
      break;
    }
  }
  //Selecciona el detalle de espacio

  showProductos(detalleEspacio: any){
    this.detalleEspacio = detalleEspacio;
    this.showModales("Productos");
  }
  showMessage(msg:string){
    this.message = msg;
    this._alert.showMessage();
  }

}

import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ComunicationsService} from '../../../../services/comunications.service'

//models
import {eccotiz,TOEcDespa} from '../../../../classes/ec/eccotiz';
import {ToTransaction} from '../../../../classes/models';
@Component({
  selector: 'app-eccotiz',
  templateUrl: './eccotiz.component.html',
  styleUrls: ['./eccotiz.component.css']
})

export class EccotizComponent implements OnInit {
  myDatepicker:any;
  par_busq:search;
   cotizaciones : eccotiz[];
   cotizacion:any={};
   conceptos:any[]=[];
   detalleEspacio:any={};
   cotizacionesObj:any[] = [];
   detalles:TOEcDespa[];
    par_busq:any = {
      ter_coda:"";
      ter_nomb:"";
      fec_fini: new Date();
      fec_ffin: new Date();
      usu_codi:""
    };
  constructor(private _comu:ComunicationsService) { }

  ngOnInit() {
    this.cotizaciones =this.cotizacionesObj;

    console.log(this.cotizaciones);
  }

  search(){
    let fec_fini = this.par_busq.fec_fini.getFullYear().toString() + this.par_busq.fec_fini.getMonth().toString() + this.par_busq.fec_fini.getDay().toString();
        let fec_ffin = this.par_busq.fec_ffin.getFullYear().toString() + this.par_busq.fec_ffin.getMonth().toString() + this.par_busq.fec_ffin.getDay().toString();
        console.log(fec_ffin);
    this._comu.Get(`api/eecotiz?ter_coda=${this.par_busq.ter_coda}&usu_codi=${this.par_busq.usu_codi}&fec_fini=${fec_fini}&fec_ffin=${fec_ffin}`).subscribe((resp:ToTransaction)=>{
        if(resp.Retorno==0){
          this.cotizaciones = resp.ObjTransaction;
        }
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

}

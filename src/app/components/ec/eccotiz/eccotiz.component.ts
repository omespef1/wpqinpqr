import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ComunicationsService} from '../../../../services/comunications.service'

//models
import {eccotiz,TOEcDespa} from '../../../../classes/ec/eccotiz';
@Component({
  selector: 'app-eccotiz',
  templateUrl: './eccotiz.component.html',
  styleUrls: ['./eccotiz.component.css']
})
export class EccotizComponent implements OnInit {
  myDatepicker:any;
   par_busq: any= {
     ter_coda:"",
     ter_nomb:"",
     fec_fini:"",
     fec_ffin:""
   }
   cotizaciones:eccotiz[];
   detalles:TOEcDespa[];
  constructor(private _comu:ComunicationsService) { }

  ngOnInit() {

  }

  initSearch(){
   // this.cotizaciones =   this._comu.getAsync('');
  }
  showDetalle(cotizacion:eccotiz){
    this.detalles = cotizacion.detalle;
  }

}

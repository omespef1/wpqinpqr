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
   cotizaciones : eccotiz[];
   cotizacion:any={};
   conceptos:any[]=[];
   detalleEspacio:any={};
   cotizacionesObj:any[] = [

     {
        top_codi:"1",
        top_nomb:"Tipo de prueba",
        cot_nume:"34",
          cot_fech: "01/05/1995",
          cot_ncoo:"Juan Morales",
          cot_coor:"342342",
          ter_coda_ej:"1031169208",
          ter_noco_ej:"Omar Pérez",
          cot_tcoo:"test",
          cot_mail:"omespef1@hotmail.com",
          cot_obse:"Observaciones",
          cot_cont :1,
          detalles : [
            {
              emp_codi:102,
             cot_cont:1,
             des_fing: "01/05/1995 8:45",
             des_fsal:"01/05/1995 9:45",
             cla_codi:"1",
             cla_nomb:"Piscina",
             esp_codi:"1",
             esp_nomb:"espacio",
             des_capa:"4"
           },
           {
            emp_codi:102,
            cot_cont:1,
            des_fing: "01/05/1995 8:45",
            des_fsal:"01/05/1995 9:45",
            cla_codi:"2",
            cla_nomb:"Bosque",
            esp_codi:"2",
            esp_nomb:"espacio 2",
            des_capa:"4"
          },
        ],
        anticipos: [
          {
            tip_codi:"4",
            fac_nume:56,
            fac_fech:"01/05/1996",
            det_vant:"44555",
            det_sald:"78"
          },
          {
            tip_codi:"4",
            fac_nume:57,
            fac_fech:"01/05/1996",
            det_vant:"44555",
            det_sald:"79"
          }
        ],
        liquidacion : [
          {
            liq_cons:"1",
            liq_valo:"456",
            liq_base:"44"
          }
        ]


     }
   ]
   detalles:TOEcDespa[];
  constructor(private _comu:ComunicationsService) { }

  ngOnInit() {
    this.cotizaciones =this.cotizacionesObj;
    this.coti
    console.log(this.cotizaciones);
  }

  initSearch(){
   // this.cotizaciones =   this._comu.getAsync('');
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

import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ComunicationsService} from '../../../../services/comunications.service'
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
  constructor(private _comu:ComunicationsService) { }

  ngOnInit() {

  }

  initSearch(){

  }

}

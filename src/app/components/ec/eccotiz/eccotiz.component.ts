import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
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
  constructor() { }

  ngOnInit() {
  }

}

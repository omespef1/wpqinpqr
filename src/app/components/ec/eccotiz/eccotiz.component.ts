import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eccotiz',
  templateUrl: './eccotiz.component.html',
  styleUrls: ['./eccotiz.component.css']
})
export class EccotizComponent implements OnInit {
   par_busq: any= {
     ter_coda:string,
     ter_nomb:string,
     fec_fini:Date,
     fec_fina:Date
   }
  constructor() { }

  ngOnInit() {
  }

}

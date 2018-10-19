import { Component, Input ,OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
    pqr:any = {
      inp_radi :'',
      inp_pass:''
    }
  constructor() {

  }
ngOnInit(){

}



}

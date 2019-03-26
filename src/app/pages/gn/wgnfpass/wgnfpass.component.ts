import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//services
import {WgnfpassService} from '../../../../services/gn/wgnfpass.service';

@Component({
  selector: 'app-wgnfpass',
  templateUrl: './wgnfpass.component.html',
  styleUrls: ['./wgnfpass.component.css']
})
export class WgnfpassComponent implements OnInit {
  loading=false;
   user: any = { usu_idpk:'',usu_idpc:''}
   usu_idpkc:string;
   success=false;
  constructor(private _fpass:WgnfpassService) { }

  ngOnInit() {
  }
  setPassword(form:NgForm){
    this.loading=true;
    this._fpass.GetUserWithCodeLink().then(()=>{
      this.loading = false;
      console.log('resuelto');
      this.success=true;
      form.reset();
    })
  }


}

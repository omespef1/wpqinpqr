import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '../../../components/alert/alert.component';

//services
import { WgnfpassService } from '../../../../services/gn/wgnfpass.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-wgnfpass',
  templateUrl: './wgnfpass.component.html',
  styleUrls: ['./wgnfpass.component.css']
})
export class WgnfpassComponent implements OnInit {
  @ViewChild(AlertComponent) alert: AlertComponent;
  loading = false;
  user: any = { usu_idpk: '', usu_idpc: '' }
  usu_idpkc: string;
  success = false;
  token: string;
  error=false;
  strError:string;
  message:string;
  constructor(private _fpass: WgnfpassService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.loadParams();
  }

  loadParams() {
    try {
      this.route.queryParamMap.subscribe((queryParams) => {
        if (queryParams.get("token") == null || queryParams.get("token") == undefined){
          this.message="Acceso no autorizado";
          this.alert.showMessage("Acceso no autorizado");
        }
         
        this.token = queryParams.get("token");
      })

    } catch (error) {
      console.log('error ejecuta');

    }

  }
  setPassword(form: NgForm) {
    this.success=false;
    this.error=false;
    this.loading = true;
    this._fpass.SetPasswordWithToken(btoa(this.user.usu_idpk), this.token).subscribe((resp:any) => {
      this.loading = false;
     
      if(resp.Retorno == 0)
       this.success = true;
       if(resp.Retorno == 1){
         this.error=true;
         this.strError= resp.TxtError;
       }
       
      form.reset();
    }, (err: HttpErrorResponse) => {
      this.loading = false;
     
      this.error=true;
      this.strError="Su token ya ha caducado o no tiene acceso para realizar esta solicitud";
      form.reset();
    })
  }


}

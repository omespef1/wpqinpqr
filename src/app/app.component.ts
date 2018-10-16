import { Component } from '@angular/core';
import { pqinpqr } from '../classes/pqinpqr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgForm } from '@angular/forms';
import {ComunicationsService} from '../services/comunications.service';
//Services


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pqr: pqinpqr = new pqinpqr();
  GnItemsItePqr: any[];
  GnItemsIteTipi: any[];
  GnItemsInp_tido: any[];
  gnpaise: any[];
  pqdpara: any[];
  adj_file: FileList;
  message: string = "";
  constructor(private spinnerService: Ng4LoadingSpinnerService,private _comu:ComunicationsService) {
this.Load();
    // this.GnItemsIteTipi = [
    //   {
    //     ite_cont: 1,
    //     ite_nomb: 'Nueva petición'
    //   },
    //   {
    //     ite_cont: 2,
    //     ite_nomb: 'Otra petición'
    //   }
    // ];
    // this.GnItemsInp_tido = [
    //   { ite_cont: 1, ite_nomb: 'Cèdula' },
    //   { ite_cont: 2, ite_nomb: 'Registro civil' }
    // ];
    // this.gnpaise = [
    //   { pai_codi: 169, pai_nomb: 'Colombia' }
    // ];
    // this.pqdpara = [
    //   { dpa_codi: 1, dpa_nomb: 'Negros' }
    // ];


  }
  onSubmit(form: NgForm) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
     this.showAlertMesssage("PQR CREADA EXITOSAMENTE");
      form.onReset();

    }, 5000)


  }
  handleFileInput(files: FileList) {
    this.adj_file = files;
    console.log(files);
  }
  showAlertMesssage(msg:string){
      this.message = msg;
        document.getElementById("btnModal").click();
  }

  Load(){
    this.spinnerService.show();
     this._comu.Get('PqrTransactionLoad').subscribe((resp:any)=>{
       this.spinnerService.hide();
       if(resp.retorno==0){
         console.log(resp);
         this.GnItemsIteTipi = resp.objTransaction.pqrSubject;
       }
     })
  }
}

import { Component } from '@angular/core';
import { pqinpqr } from '../classes/pqinpqr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pqr: pqinpqr = new pqinpqr();
  GnItemsItePqr: any[];
  GnItemsIteTipi: any[];
  GnItemsInp_tido:any[];
  gnpaise:any[];
  pqdpara:any[];
  adj_file:FileList;
  message:string="";
  constructor(private spinnerService: Ng4LoadingSpinnerService) {
    this.GnItemsItePqr = [
      { ite_cont: 1, ite_nomb: 'Test' },
      {
        ite_cont: 2,
        ite_nomb: 'Petición página'
      }];
    this.GnItemsIteTipi = [
      {
        ite_cont: 1,
        ite_nomb: 'Nueva petición'
      },
      {
        ite_cont: 2,
        ite_nomb: 'Otra petición'
      }
    ];
    this.GnItemsInp_tido = [
      { ite_cont:1,ite_nomb:'Cèdula'},
      { ite_cont:2,ite_nomb:'Registro civil'}
    ];
this.gnpaise = [
  {pai_codi:169:pai_nomb:'Colombia'}
];
this.pqdpara = [
  {dpa_codi:1,dpa_nomb:'Negros'}
];


  }
  onSubmit(form:NgForm) {
    this.spinnerService.show();
setTimeout(()=>{
  this.spinnerService.hide();
  this.message = "PQR CREADA EXITOSAMENTE";
  document.getElementById("btnModal").click();
  form.onReset();

},5000)


  }
  handleFileInput(files: FileList){
    this.adj_file = files;
    console.log(files);
  }
}

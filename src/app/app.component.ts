import { Component, Input } from '@angular/core';
import { pqinpqr } from '../classes/pqinpqr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgForm } from '@angular/forms';
import { ComunicationsService } from '../services/comunications.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
//Models
import { gnItem } from '../classes/models';
//Services


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pqr: pqinpqr = new pqinpqr();
  @Input() GnItemsItePqr: gnItem[];
  @Input() GnItemsIteTipi: gnItem[];
  @Input() GnItemsIte_stip: gnItem[];
  @Input() gnpaise: any[];
  @Input() gndepar: any[];
  gnmunic: any[];
  @Input() gnmunicF: any[];
  @Input() pqdpara: any[];
  gndigfl: any;
  adj_file: FileList;
  message: string = "";
  inscription:number=0;
  safeHtml: SafeHtml;
  constructor(private spinnerService: Ng4LoadingSpinnerService, private _comu: ComunicationsService,private sanitizer: DomSanitizer) {
    //this.Load();

  }


  //Envío de pqr
  PostPqr(form: NgForm) {
   this.spinnerService.show();
    this._comu.Post('PqInpqr', this.pqr).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.retorno!=undefined){
        if(resp.retorno==0)
        this.safeHtml =  this.sanitizer.bypassSecurityTrustHtml(resp.objTransaction.msg);
        if(resp.retorno==1)
        this.safeHtml =  this.sanitizer.bypassSecurityTrustHtml(resp.txtRetorno);
        if(resp.retorno==0)
        form.reset();
          this.showAlertMesssage()
      }
    })
  }
  handleFileInput(files: FileList) {
    this.adj_file = files;
    console.log(files);
  }
  showAlertMesssage() {
    document.getElementById("btnModal").click();
  }

//Carga inicial de datos necesarios
  Load() {
    this.spinnerService.show();
    this._comu.Get('PqrTransactionLoad').subscribe((resp: any) => {

      if (resp.retorno == 0) {
        console.log(resp);
        this.GnItemsIteTipi = resp.objTransaction.pqrSubject.objTransaction;
        this.GnItemsItePqr = resp.objTransaction.pqrType.objTransaction;
        this.GnItemsIteTipi = resp.objTransaction.pqrSubject.objTransaction;
        this.gnpaise = resp.objTransaction.countries.objTransaction;
        this.gndepar = resp.objTransaction.states.objTransaction;
        this.gnmunic = resp.objTransaction.cities.objTransaction;
        this.pqdpara = resp.objTransaction.pqrGroup.objTransaction;
        this.gndigfl = resp.objTransaction.digiflag.objTransaction;
        //Si el valor seleccionado coincide con el del digiflag se muestra el desplegable de area de inscripción
        this.inscription = this.GnItemsItePqr.filter((t)=>t.ite_codi == this.gndigfl.dig_valo)[0].ite_cont;
        this.spinnerService.hide();
      }
    })
  }
  //Filtrado de ciudades
  filterCities() {
    console.log(this.pqr.dep_codi);
    this.gnmunicF = this.gnmunic.filter((v) => v.dep_codi == this.pqr.dep_codi)
  }



}

import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
//Services
import { ComunicationsService } from '../../../services/comunications.service';
//Models
import { gnItem, pqinpqr, ask } from '../../../classes/models'
//components
import { AlertComponent } from '../alert/alert.component'
//Pipes
import { EstadosPipe } from '../../pipes/estados.pipe';
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  GnItemsItePqr: gnItem[];
  pqr: pqinpqr = new pqinpqr();

  gnAdjunt: any[];
  pqrIn: any = {

  }
  encuesta: ask[];
  constructor(private _conmu: ComunicationsService, private spinner: NgxSpinnerService, private alert: AlertComponent) {


    this.encuesta =
      [
        new ask('¿Su requerimiento fue atendido dentro de los términos establecidos?', ["Si", "No"]),
        new ask('¿La calidad en la atención de su requerimiento fue?', ["Buena", "Mala"]),
        new ask('¿El servidor brindó una respuesta clara y oportuna?', ["Si", "No"]),
      ]
  }
  ngOnInit() {

    //this.alert.showMessage('Esto es una prueba');
    this.LoadPqrFormBasicData();
  }
  async postPqr() {
    await this.GetInfoPqr();
    this.GetAttchment();
  }

  async GetInfoPqr() {
    const info: any = <any>await this._conmu.Get(`api/PqInpqr?inp_cont=${this.pqrIn.inp_cont}&inp_pass=${this.pqrIn.inp_pass}`).toPromise();
    console.log(info);
    if (info.retorno == 0) {
      console.log(info.objTransaction);
      this.pqr = info.objTransaction;
    }
  }

  LoadPqrFormBasicData() {
    this._conmu.Get(`api/GnItems?tit_cont=327`).subscribe((resp: any) => {
      if (resp.retorno == 0) {
        console.log(resp);
        this.GnItemsItePqr = resp.objTransaction;
      }
    }, err => {
      this.alert.showMessage('Error conectando con el servidor');
      this.spinner.hide();
      // this.showAlertMesssage(`Error conectado con el servidor, verfique que la dirección ${ServiceUrl} sea correcta`);
    })

  }

  GetAttchment() {
    let url = `api/download?consecutivo=${this.pqr.inp_cont}&pro_codi=SPQINPQR&tableName=PQ_INPQR`;
    console.log(url);
    this._conmu.Get(url).subscribe((resp: any) => {
      if (resp.retorno == 0) {
        this.gnAdjunt = resp.objTransaction;
      }
    })
  }
  download(fileName: string) {
    this._conmu.open(`download/${fileName}`);
  }

}

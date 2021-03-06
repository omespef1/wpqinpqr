import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';
// Services
import { ComunicationsService } from '../../../services/comunications.service';
// Models
import { gnItem, pqinpqr, pqEncue } from '../../../classes/models';
// components
import { AlertComponent } from '../alert/alert.component';


import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  @ViewChild(AlertComponent) _alert: AlertComponent;
  GnItemsItePqr: gnItem[];
  pqr: pqinpqr = new pqinpqr();
  encuesta: pqEncue[] = [];
  gnAdjunt: any[];
  gnAllAdjunt: any[];
  ocultarEncuesta = false;
  pqrIn: any = {};
  preguntas: string[] = [];
  respuestas: string[] = [];
  submitted = false;
  queryInp_Cont = '0';
  queryInp_Pass = '';
  submittedEncue = false;
  logo: string;
  message: string;
  
  constructor(private _conmu: ComunicationsService, private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private titleService: Title) {
    this.preguntas.push('¿Su requerimiento fue atendido dentro de los términos establecidos?');
    this.preguntas.push('¿La calidad en la atención de su requerimiento fue?');
    this.preguntas.push('¿El servidor brindó una respuesta clara y oportuna?');
  }
  async ngOnInit() {
    this.setTitle('Consulta de PQR');
    this.route.queryParamMap.subscribe(queryParams => {
      this.queryInp_Cont = queryParams.get('pqr');
      this.queryInp_Pass = queryParams.get('psw');

      if (this.queryInp_Cont != null && this.queryInp_Pass != null) {
        this.pqrIn.inp_cont = Number(this.queryInp_Cont);
        this.pqrIn.inp_pass = this.queryInp_Pass;
        this.postPqr();
      }
    });

    await this.GetLogo();
    this.LoadPqrFormBasicData();
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  async postPqr() {
    this.spinner.show();
    const pqr = <any>await this.GetInfoPqr();

    if (pqr.retorno === 0) {
      // this.GetAttchment();
      this.GetAttchmentRadju();
      this.GetInfoEncuesta();
      this.submitted = true;
    } else {
      this.showAlertMesssage(pqr.txtRetorno);
    }
    this.spinner.hide();
  }

  async GetInfoPqr() {
    // Obtiene todos los datos de la qpr
    const info: any = <any>await this._conmu.Get(`api/PqInpqr?inp_cont=${this.pqrIn.inp_cont}&inp_pass=${this.pqrIn.inp_pass}`).toPromise();

    if (info.retorno === 0) {
      this.pqr = info.objTransaction;

      if (this.pqr.dig_valo === 'S')
        this.ocultarEncuesta = true;
    }
    return info;
  }

  async LoadPqrFormBasicData() {
    // Carga el desplegable de tipo de solicitud
    this.spinner.show();
    await this._conmu.Get(`api/GnItems?tit_cont=327`).subscribe((resp: any) => {
      this.GnItemsItePqr = resp.ObjTransaction;
    }, err => {
      this.showAlertMesssage('Error conectando con el servidor');
    });
    this.spinner.hide();
  }

  showAlertMesssage(msg: string) {
    this.message = msg;
    this._alert.show();
  }

  GetAttchment() {

    this.gnAllAdjunt = [];

    // Descarga los adjuntos asociados a la pqr
    this.spinner.show();
    const url = `api/download?consecutivo=${this.pqr.cas_cont}&pro_codi=SPQINPQR&tableName=PQ_INPQR&emp_codi=${this.pqr.emp_codi}`;

    this._conmu.Get(url).subscribe((resp: any) => {
      if (resp.retorno === 0) {
        this.gnAdjunt = resp.objTransaction;
      }

      for (let i = 0; i < this.gnAdjunt.length; i++) {
        this.gnAllAdjunt.push(this.gnAdjunt[i]);
      }
    });
  }

  GetAttchmentRadju() {
    let rad_llav = '';
    rad_llav = this.pqr.emp_codi.toString() + this.pqr.inp_cont.toString();
    this.gnAllAdjunt = [];

    const url = `api/download/loadInfoAdjunPqr?consecutivo=${rad_llav}&pro_codi=SPQINPQR&tableName=PQ_INPQR&emp_codi=${this.pqr.emp_codi}`;

     this._conmu.Get(url).subscribe((resp2: any) => {
      if (resp2.retorno === 0) {
        this.gnAdjunt = resp2.objTransaction;
        console.log(this.gnAdjunt);
        for (let i = 0; i < this.gnAdjunt.length; i++) {
          this.gnAllAdjunt.push(this.gnAdjunt[i]);
        }
      }
    });
  }

  // Abre el navegador para visualizar el archivo
  download(fileName: string) {
    this._conmu.open(`download/${fileName}`);
  }

  postEncue() {
    this.submittedEncue = true;
    // Envía la encuesta se satisfacción
    this.spinner.show();
    for (let i = 0; i < 3; i++) {
      let pregunta: pqEncue = new pqEncue();
      pregunta.enc_apel = this.pqr.inp_apel;
      pregunta.enc_docu = this.pqr.inp_nide;
      pregunta.enc_nomb = this.pqr.inp_nomb;
      pregunta.enc_preg = this.preguntas[i];
      pregunta.enc_resp = this.respuestas[i];
      pregunta.tip_codi = Number(this.pqr.inp_tido);
      pregunta.inp_cont = this.pqr.inp_cont;
      pregunta.emp_codi = this.pqr.emp_codi;
      this.encuesta.push(pregunta);
    }
    this._conmu.Post('api/PqEncue', this.encuesta).toPromise().then((resp: any) => {
      this.spinner.show();
      if (resp.retorno === 0) {
        this.ocultarEncuesta = false;
        this.showAlertMesssage('Encuesta enviada!');
      } else {
        this.showAlertMesssage(resp.txtRetorno);
      }

    }, err => {
      this.showAlertMesssage('Error conectando con el servidor');
      this.spinner.hide();
    });
  }
  onSelectionChange(pregunta: number, respuesta: string) {
    // Llena las variables de respuestas
    switch (pregunta) {
      case 1:
        this.respuestas[0] = respuesta;
        break;
      case 2:
        this.respuestas[1] = respuesta;
        break;
      case 3:
        this.respuestas[2] = respuesta;
        break;
    }
  }

  GetInfoEncuesta() {
    // Si es true muestra la encuesta, de lo contrario significa que ya el usuario llenó una encuesta
    this.spinner.show();
    this._conmu.Get(`api/PqEncue?inp_cont=${this.pqr.inp_cont}`).toPromise().then((resp: any) => {
      this.spinner.hide();
      // if (resp.retorno === 0) {
      //   this.showEncuesta = true;
      // }
    }, err => {
      this.spinner.hide();
      this.showAlertMesssage('Error conectando con el servidor');
    });
  }

  async  GetLogo() {
    await this._conmu.Get(`api/GnLogo?emp_codi=${this.pqr.emp_codi}`).subscribe((resp: any) => {
      if (resp.retorno === 0) {
        this.logo = resp.objTransaction.emp_logs;resp.objTransaction.emp_logs;
      }
    }, err => {
      this.showAlertMesssage('Error conectando con el servidor');
    });
  }
}

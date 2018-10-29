import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title }     from '@angular/platform-browser';
//Services
import { ComunicationsService } from '../../../services/comunications.service';
//Models
import { gnItem, pqinpqr, pqEncue } from '../../../classes/models'
//components
import { AlertComponent } from '../alert/alert.component'
//Pipes
import { EstadosPipe } from '../../pipes/estados.pipe';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  GnItemsItePqr: gnItem[];
  pqr: pqinpqr = new pqinpqr();
  encuesta: pqEncue[] = [];
  gnAdjunt: any[];
  showEncuesta: boolean = false;
  pqrIn: any = {};
  preguntas: string[] = [];
  respuestas: string[] = [];
  submitted: boolean = false;
  queryInp_Cont: string = "0";
  queryInp_Pass:string ="";
  submittedEncue:boolean = false;
logo:string;
message:string;

  constructor(private _conmu: ComunicationsService, private spinner: NgxSpinnerService, private alert: AlertComponent, private route: ActivatedRoute,private titleService: Title) {
    this.preguntas.push("¿Su requerimiento fue atendido dentro de los términos establecidos?");
    this.preguntas.push("¿La calidad en la atención de su requerimiento fue?");
    this.preguntas.push("¿El servidor brindó una respuesta clara y oportuna?");
  }
  async ngOnInit() {
    this.setTitle("Consulta de PQR");
   await this.LoadPqrFormBasicData();
   await this.GetLogo();
     this.route.queryParamMap.subscribe(queryParams => {
      this.queryInp_Cont = queryParams.get("pqr")
      this.queryInp_Pass = queryParams.get("psw")
      if(this.queryInp_Cont!=null &&  this.queryInp_Pass!=null){
        this.pqrIn.inp_cont =  Number(this.queryInp_Cont);
        this.pqrIn.inp_pass = this.queryInp_Pass;
        this.postPqr();
      }
    })



  }
     public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  async postPqr() {
  let pqr = <any> await  this.GetInfoPqr();
  console.log(pqr);
if(pqr.retorno==0){
    await this.GetAttchment();
    this.GetInfoEncuesta();
    this.submitted = true;
  }
  }

  async GetInfoPqr() {
    //Obitiene todos los datos de la qpr
    const info: any = <any>await this._conmu.Get(`api/PqInpqr?inp_cont=${this.pqrIn.inp_cont}&inp_pass=${this.pqrIn.inp_pass}`).toPromise();
    console.log(info);
    if (info.retorno == 0) {
      console.log(info.objTransaction);
      this.pqr = info.objTransaction;
    }
    else {
     this.message = info.txtRetorno;
      this.alert.showMessage();
    }
    return info;
  }

  async LoadPqrFormBasicData() {
    //Carga el desplegable de tipo de solicitud
    this.spinner.show();
    await this._conmu.Get(`api/GnItems?tit_cont=327`).subscribe((resp: any) => {
      this.spinner.hide();
      if (resp.retorno == 0) {
        console.log(resp);
        this.GnItemsItePqr = resp.objTransaction;
      }
    }, err => {
      this.showMessage('Error conectando con el servidor');
      this.spinner.hide();
      // this.showAlertMesssage(`Error conectado con el servidor, verfique que la dirección ${ServiceUrl} sea correcta`);
    })

  }
  showMessage(msg:string){
    this.message = msg;
    this.alert.showMessage();
  }

  async GetAttchment() {
    //Descarga los adjuntos asociados a la pqr
    let url = `api/download?consecutivo=${this.pqr.inp_cont}&pro_codi=SPQINPQR&tableName=PQ_INPQR`;
    console.log(url);
    await this._conmu.Get(url).subscribe((resp: any) => {
      if (resp.retorno == 0) {
        this.gnAdjunt = resp.objTransaction;
      }
    })
  }
  //Abre el navegador para visualizar el archivo
  download(fileName: string) {
    this._conmu.open(`download/${fileName}`);
  }


  postEncue() {
    this.submittedEncue = true;
    debugger;
    //Envía la encuesta se satisfacción
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
      this.encuesta.push(pregunta);
    }
    this._conmu.Post('api/PqEncue', this.encuesta).toPromise().then((resp: any) => {
      this.spinner.hide();
      if (resp.retorno == 0) {
        this.showEncuesta = false;
        this.showMessage('Encuesta enviada!');

      }
      else
        this.showMessage(resp.txtRetorno);
    }, err => {
      this.showMessage("Error conectando con el servidor");
      this.spinner.hide();
    })
  }
  onSelectionChange(pregunta: number, respuesta: string) {
    //Llena las variables de respuestas
    switch (pregunta) {
      case 1:
        this.respuestas[0] = respuesta;
        console.log(this.respuestas[0]);
        break;
      case 2:
        this.respuestas[1] = respuesta;
        break;
      case 3:
        this.respuestas[2] = respuesta;
        break;

    }
    console.log(this.respuestas.length)

  }

  GetInfoEncuesta() {
    //Si es true muestra la encuesta, de lo contrario significa que ya el usuario llenó una encuesta
    this.spinner.show();
    this._conmu.Get(`api/PqEncue?inp_cont=${this.pqr.inp_cont}`).toPromise().then((resp: any) => {
      this.spinner.hide();
      if (resp.retorno == 0) {
        this.showEncuesta = true;
      }
    }, err => {
      this.spinner.hide();
      this.showMessage("Error conectando con el servidor");
    })

  }

async  GetLogo(){
  await  this._conmu.Get('api/GnLogo').subscribe((resp:any)=>{
      if(resp.retorno==0){
         this.logo = resp.objTransaction.emp_logs;
      }
    },err=>{
      this.showMessage('Error conectando con el servidor');
    })
  }
}

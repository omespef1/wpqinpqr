import { Component, Input,OnInit ,ViewChild,ElementRef } from '@angular/core';
import { pqinpqr } from '../../../classes/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { ComunicationsService } from '../../../services/comunications.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import{ Title }     from '@angular/platform-browser';
import { ActivatedRoute } from "@angular/router";
//Models
import { gnItem } from '../../../classes/models';
import { faclien } from 'src/classes/fa/faclien';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.css']
})
export class CreacionComponent implements OnInit {
  // @ViewChild('pqr_file');
  // fileAttchment: ElementRef;
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
  message: string = "";
  inscription: string = "0";
  safeHtml: SafeHtml;
  submitted: boolean = false;
  loading:string="";
  logo:SafeHtml;
  client :string;
  allowedFormats:string[];
  pqr_file:any;
  constructor(private spinner: NgxSpinnerService, private _comu: ComunicationsService, private sanitizer: DomSanitizer,private titleService: Title,
  private route: ActivatedRoute) {

  }
ngOnInit(){
  this.setTitle("Creación de PQR");
  this.allowedFormats = [ "PDF","DOC","DOCX","JPG","PNG","XLS","XLSX"];
    this.Load();
}

   public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  //Carga inicial de datos necesarios
  Load() {
    this.spinner.show();

    this._comu.Get('api/PqrTransactionLoad').subscribe((resp: any) => {
      console.log(resp);
      if (resp.retorno == 0) {
        console.log(resp);
        this.GnItemsIteTipi = resp.objTransaction.pqrSubject;
        this.GnItemsItePqr = resp.objTransaction.pqrType;
        this.GnItemsIteTipi = resp.objTransaction.pqrSubject;
        this.gnpaise = resp.objTransaction.countries;
        this.gndepar = resp.objTransaction.states;
        this.gnmunic = resp.objTransaction.cities;
        this.pqdpara = resp.objTransaction.pqrGroup;
        this.gndigfl = resp.objTransaction.digiflag;
        this.logo = resp.objTransaction.pqrImage;
        //Si el valor seleccionado coincide con el del digiflag se muestra el desplegable de area de inscripción
        this.inscription = this.GnItemsItePqr.filter((t) => t.ite_codi == this.gndigfl.dig_valo)[0].ite_cont.toString();
        //Carga los datos del cliente si aplica
        if(resp.objTransaction.client!= null && resp.objTransaction.client != undefined){
          let client:faclien = resp.objTransaction.client;
            this.pqr.inp_apel = client.cli_apel;
            this.pqr.inp_nomb = client.cli_nomb;

            
        }
        this.spinner.hide();
      }
      else {
          this.spinner.hide();
         this.showAlertMesssage(`Error conectando con el servidor: ${resp.txtRetorno}`);
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    })
  }

  VerifyAccess(){
    this.route.queryParamMap.subscribe(queryParams => {
      this.client = queryParams.get("client")
      if(this.client!=null &&  this.client!=undefined){
        //Cuando se está ingresando desde el selfservice
        
      }
    })
  }

  //Manejo de archivos
  handleFileInput(files: FileList) {

    if(files.length>0){

      let extension =this.GetExtension(files[0].name);
      if(this.allowedFormats.indexOf(extension.toUpperCase())<0){
        this.showAlertMesssage(`El formato de archivo '${extension}' no es válido`);
        return;
      }
      this.pqr.adj_file = files[0];
    }

  }


  //Envío de pqr
  PostPqr(form: NgForm) {
    this.submitted = true;
    this.spinner.show();
    this.loading ="Enviando PQR...";
    this._comu.Post('api/PqInpqr', this.pqr).subscribe((resp: any) => {
    this.spinner.hide();
      if (resp.retorno != undefined) {
        this.submitted = false;
        if (resp.retorno == 0) {
          let inp_cont:number = resp.objTransaction.inp_cont;
          if(this.pqr.adj_file!=null){
            const fd = new FormData();
              this.loading ="Subiendo adjunto...";
            fd.append('file',this.pqr.adj_file,`${inp_cont}.${this.GetExtension(this.pqr.adj_file.name)}`)   ;
            this._comu.Post('api/upload', fd).subscribe((respAdj:any)=>{

              if(respAdj.retorno==1)
                this.showAlertMesssage(`Se produjo un error subiendo el archivo. Intentelo nuevamente : ${respAdj.txtRetorno}`);
                else {
                  this.showAlertMesssage(resp.objTransaction.msg);
                  form.reset();
                  // this.fileAttchment.nativeElement.value = "";
                }
            })
          }else {
            this.showAlertMesssage(resp.objTransaction.msg);
            form.reset();
              // this.fileAttchment.nativeElement.value = "";
          }

        }
        if (resp.retorno == 1)
          this.showAlertMesssage(resp.txtRetorno);
      }
    }, err => { this.showAlertMesssage(err) })
  }
//Mostrar mensajes
  showAlertMesssage(msg: string) {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(msg);
    document.getElementById("btnModal").click();
  }
  //Filtrado de ciudades
  filterCities() {
    this.gnmunicF = this.gnmunic.filter((v) => v.dep_codi == this.pqr.dep_codi)
  }
//Obtener extensión de archivo
GetExtension(fileName:string){
  return   fileName.split('.').pop();

}

}

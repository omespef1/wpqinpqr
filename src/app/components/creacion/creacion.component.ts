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
import { gnarbol } from 'src/classes/gn/gnarbol';

//components
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';
import {TableSearchComponent} from '../tools/table-search/table-search.component';
import {AlertComponent} from '../alert/alert.component';
@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.css']
})
export class CreacionComponent implements OnInit {
  // @ViewChild('pqr_file');
  // fileAttchment: ElementRef;
  @ViewChild(TableSearchComponent) _table : TableSearchComponent;
  @ViewChild(AlertComponent) alert : AlertComponent;
  pqr: pqinpqr = new pqinpqr();
  @Input() GnItemsItePqr: gnItem[];
  @Input() GnItemsIteTipi: gnItem[];
  @Input() GnItemsIte_stip: gnItem[];
  @Input() gnpaise: any[];
  @Input() gndepar: any[];
  gnmunic: any[];
  @Input() gnmunicF: any[];
  @Input() pqdpara: any[];
  @Input() ctcontr:any ={};
  @Input() area:any={};
  @Input() spq000001 : any ={};
  message:string="";
  //Var
  gndigfl: any;
  inscription: string = "0";
  safeHtml: SafeHtml;
  submitted: boolean = false;
  loading:string="";
  logo:SafeHtml;
  client :string="";
  allowedFormats:string[]=[ "PDF","DOC","DOCX","JPG","PNG","XLS","XLSX"];
  pqr_file:any;
  contracts: any[];
  

  constructor(private spinner: NgxSpinnerService, private _comu: ComunicationsService, private sanitizer: DomSanitizer,private titleService: Title,
  private route: ActivatedRoute,private _confirm:ConfirmDialogComponent) {

  }
async ngOnInit(){
  this.setTitle("Creación de PQR");  
  await this.GetParams(); 
  //Si vienen parámetros en url despleiga el modal para preguntar como se quiere acceder 
  console.log(this.client);
  if(this.client)
   this._confirm.show(); 
  if(!this.client)
    this.Load();
}

   public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  //Carga inicial de datos necesarios
  Load() {   
    this.spinner.show();
    let query:string = "api/PqrTransactionLoad?";
    console.log(this.client);
    if(this.client)
     query+= `cli_coda=${this.client}`;
    this._comu.Get(query).subscribe((resp: any) => {
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
          if(this.client){          
            this.spq000001 = resp.objTransaction.spq000001;
            this.pqr.inp_tcli = "F";
            this.pqr.inp_apel = client.cli_apel;
            this.pqr.inp_nomb = client.cli_nomb;
            this.pqr.inp_dire = client.dcl_dire;
            this.pqr.inp_mail = client.dcl_mail;
            this.pqr.inp_nide = client.cli_coda;
            this.pqr.inp_ntel = client.dcl_ntel;
            this.pqr.pai_codi = client.pai_codi;
            this.pqr.dep_codi = client.dep_codi;
            console.log(client.tip_abre);
            console.log(client.tip_abre.length);
            this.pqr.inp_tido = client.tip_abre.replace(/\s/g,"");
            this.filterCities();                                      
              this.pqr.arb_sucu  = client.arb_csuc;
              this.pqr.arb_nomb =  client.arb_nomb;
              this.pqr.mun_codi = (`${client.mun_codi}-${client.reg_codi}`);
              console.log(this.pqr.mun_codi);
              this.contracts = resp.objTransaction.contracts;     
              this._table.render(this.contracts);                                                            
            }             
            else
            this.pqr.inp_tcli = "O";                        
        }
        this.spinner.hide();
      }
      else {
          this.spinner.hide();
         this.showAlertMesssage(`Error conectando con el servidor: ${resp.txtRetorno}`)
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    })
  }
  setContract(rowSelected:any){
    console.log(rowSelected);
      this.ctcontr = rowSelected;
      this._comu.Get(`api/gnarbol?con_cont=${rowSelected.con_cont}`).subscribe((resp:any)=>{
        this.area = resp.objTransaction;
      })
      
  }
  openLupa(){
    this._table.show();
  }
  GetParams(){
    this.route.queryParamMap.subscribe(queryParams => {
      console.log(queryParams.get("client"));
      if(queryParams.get("client")!=null)
      this.client = atob(queryParams.get("client")) ;         
      console.log(this.client)  ;
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
    this.pqr.con_cont = this.ctcontr.con_cont;
    this.spinner.show();
    this.loading ="Enviando PQR...";
    this._comu.Post('api/PqInpqr', this.pqr).subscribe((resp: any) => {
    this.spinner.hide();
    console.log(resp);
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
                  this.alert.showHtmlMessage(resp.objTransaction.msg);
                  form.reset();
                  // this.fileAttchment.nativeElement.value = "";
                }
            })
          }else {          
            this.alert.showHtmlMessage(resp.objTransaction.msg);
            form.reset();
            this.Load();
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
    this.alert.showMessage(msg);
  }
  //Filtrado de ciudades
   filterCities() {
     this.gnmunicF =  this.gnmunic.filter((v) => v.dep_codi == this.pqr.dep_codi)
     console.log('filtro');
  }
//Obtener extensión de archivo
GetExtension(fileName:string){
  return   fileName.split('.').pop();

}
setOptionConfirm(option:string){
  console.log(option);
 switch(option){
   case "RIGHT":
      this.Load();
      break;
      case "LEFT":
      this.client = undefined;
      this.Load();
 }

}

}

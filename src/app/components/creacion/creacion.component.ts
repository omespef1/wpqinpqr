import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { pqinpqr, companies, ToTransaction } from '../../../classes/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm, FormGroup } from '@angular/forms';
import { ComunicationsService } from '../../../services/comunications.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
// Models
import { gnItem } from '../../../classes/models';
import { Faclien } from 'src/classes/fa/faclien';
// components
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ModalComponent } from '../dialogs/modal/modal.component';
import { TableSearchComponent } from '../tools/table-search/table-search.component';
import { AlertComponent } from '../alert/alert.component';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.css']
})
export class CreacionComponent implements OnInit {

  @ViewChild(TableSearchComponent) _table: TableSearchComponent;
  @ViewChild(AlertComponent) alert: AlertComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;
  pqr: pqinpqr = new pqinpqr();
  clienInfo: Faclien;
  @Input() GnItemsItePqr: gnItem[];
  @Input() GnItemsIteTipi: gnItem[];
  @Input() GnItemsIte_stip: gnItem[];
  @Input() gnpaise: any[];
  @Input() gndepar: any[];
  gnmunic: any[];
  @Input() gnmunicF: any[];
  @Input() pqdpara: any[];
  @Input() ctcontr: any = {};
  @Input() area: any = {};
  @Input() spq000001: any = {};
  @Input() spq000003: any = {};
  message = '';
  // Var
  gndigfl: any;
  inscription = '0';
  safeHtml: SafeHtml;
  submitted = false;
  loading = '';
  logo: SafeHtml;
  client = '';
  allowedFormats: string[] = ['PDF', 'DOC', 'DOCX', 'JPG', 'PNG', 'XLS', 'XLSX'];
  pqr_file: any;
  contracts: any[];
  companies: companies[];
  myFiles: File[] = [];
  uploader: FileUploader = new FileUploader({});
  hasBaseDropZoneOver = false;

  // tslint:disable-next-line:max-line-length
  constructor(private spinner: NgxSpinnerService, private _comu: ComunicationsService, private sanitizer: DomSanitizer, private titleService: Title,
    private route: ActivatedRoute, private _confirm: ConfirmDialogComponent) {
  }

  async ngOnInit() {
    try {
      this.setTitle('Creación de PQR');
      await this.GetParams();
      // Si vienen parámetros en url despleiga el modal para preguntar como se quiere acceder 
      if (this.client) {
        this._confirm.show();
      }
      if (!this.client) {
        this.Load();
      }
    } catch (err) {
      this.showAlertMesssage(err);
    }
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  // Carga inicial de datos necesarios
  Load() {
    this.spinner.show();
    let query = 'api/PqrTransactionLoad?';
    query += `cli_coda=${this.client}`;
    this._comu.Get(query, this.pqr.emp_codi).subscribe((resp: any) => {
      if (resp.retorno === 0) {
        this.GnItemsItePqr = resp.objTransaction.pqrType;
        this.gnpaise = resp.objTransaction.countries;
        this.gndepar = resp.objTransaction.states;
        this.gnmunic = resp.objTransaction.cities;
        this.pqdpara = resp.objTransaction.pqrGroup;
        this.gndigfl = resp.objTransaction.digiflag;
        this.logo = resp.objTransaction.pqrImage;
        this.GnItemsIteTipi = resp.objTransaction.pqrSubject;

        // Si el valor seleccionado coincide con el del digiflag se muestra el desplegable de area de inscripción
        this.inscription = this.GnItemsItePqr.filter((t) => t.ite_codi === this.gndigfl.dig_valo)[0].ite_cont.toString();
        // Carga los datos del cliente si aplica
        if (resp.objTransaction.client != null && resp.objTransaction.client !== undefined) {
          const client: Faclien = resp.objTransaction.client;
          if (this.client) {
            this.spq000001 = resp.objTransaction.spq000001;
            this.pqr.inp_tcli = 'F';
            this.pqr.inp_apel = client.cli_apel;
            this.pqr.inp_nomb = client.cli_nomb;
            this.pqr.inp_dire = client.dcl_dire;
            this.pqr.inp_mail = client.dcl_mail;
            this.pqr.inp_nide = client.cli_coda;
            this.pqr.inp_ntel = client.dcl_ntel;
            this.pqr.pai_codi = client.pai_codi;
            this.pqr.dep_codi = client.dep_codi;
            this.pqr.inp_tido = client.tip_abre.replace(/\s/g, '');
            this.filterCities();
            this.pqr.arb_sucu = client.arb_csuc;
            this.pqr.arb_nomb = client.arb_nomb;
            this.pqr.mun_codi = (`${client.mun_codi}-${client.reg_codi}`);
            this.contracts = resp.objTransaction.contracts;
            this._table.render(this.contracts);
          } else {
            this.pqr.inp_tcli = 'O';
          }
        } else {
          this.pqr.inp_nomb = '.';
          this.pqr.inp_apel = '.';
          this.pqr.inp_ntel = '0';
          this.pqr.inp_ncel = '0';
        }
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.showAlertMesssage(`Error conectando con el servidor: ${resp.txtRetorno}`)
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }
  setContract(rowSelected: any) {
    this.ctcontr = rowSelected;
    this._comu.Get(`api/gnarbol?con_cont=${rowSelected.con_cont}`, this.pqr.emp_codi).subscribe((resp: any) => {
      this.area = resp.objTransaction;
    });
  }
  openLupa() {
    this._table.show();
  }
  GetParams(): boolean {
    try {
      this.route.queryParamMap.subscribe(queryParams => {
        if (queryParams.get("client") != null)
          this.client = atob(queryParams.get("client"));
        if (queryParams.get("usu_codi") != null)
          this.pqr.usu_codi = atob(queryParams.get("usu_codi"));
        return true;
      }, err => {
        return false;
      })
    }
    catch (err) {
      return false;
    }
  }

  // Manejo de archivos
  handleFileInput(files: FileList) {

    if (files.length > 0) {
      const extension = this.GetExtension(files[0].name);
      if (this.allowedFormats.indexOf(extension.toUpperCase()) < 0) {
        this.showAlertMesssage(`El formato de archivo '${extension}' no es válido`);
        return;
      }
      this.pqr.adj_file = files[0];
    }

  }
  // Envío de pqr
  PostPqr(form: NgForm) {
    this.submitted = true;
    this.pqr.con_cont = this.ctcontr.con_cont;
    this.spinner.show();
    this.loading = 'Enviando PQR...';
    this._comu.Post('api/PqInpqr', this.pqr).subscribe((resp: any) => {
      
      this.spinner.hide();
      if (resp.retorno !== undefined) {

        if (resp.retorno === 0) {
          let inp_cont: number = resp.objTransaction.inp_cont;
          let files = this.getFiles();          
          let requests = [];
          const formData = new FormData();
          let filesCount = 1;

          if(files.length>0){
            files.forEach((file) => {
              formData.append(`fileUpload${filesCount}`, file.rawFile, file.name);
              filesCount += 1;
            });
            formData.append("INP_CONT", inp_cont.toString());
            formData.append("EMP_CODI", this.pqr.emp_codi.toString());
            this._comu.Post('api/upload', formData).subscribe((respAdj: any) => {
              this.submitted = false;
              if (respAdj.retorno == 1)
                this.showAlertMesssage(`Se produjo un error subiendo el archivo. Intentelo nuevamente : ${respAdj.txtRetorno}`);
              else {
                this.message = "";
                this.alert.showHtmlMessage(resp.objTransaction.msg);
                form.reset();
                // this.fileAttchment.nativeElement.value = "";
              }
            }, err => { console.log(err) })
          }
          else{
            this.submitted = false;
            this.message = "";
            this.alert.showHtmlMessage(resp.objTransaction.msg);
            form.reset();
          }
    
          // let inp_cont: number = resp.objTransaction.inp_cont;
          // if (this.myFiles.length>0) {
          //   const fd = new FormData();       
          //   this.loading = "Subiendo adjunto...";
          //   for (var i = 0; i < this.myFiles.length; i++) { 
          //     fd.append(`fileUpload${i+1}`, this.myFiles[i],`${this.myFiles[i].name}`);            
          //   }
          //     fd.append("INP_CONT",inp_cont.toString());
          //      fd.append("EMP_CODI",this.pqr.emp_codi.toString());
          //   this._comu.Post('api/upload', fd).subscribe((respAdj: any) => {

          //     if (respAdj.retorno == 1)
          //       this.showAlertMesssage(`Se produjo un error subiendo el archivo. Intentelo nuevamente : ${respAdj.txtRetorno}`);
          //     else {
          //       this.message ="";
          //       this.alert.showHtmlMessage(resp.objTransaction.msg);
          //       form.reset();
          //       // this.fileAttchment.nativeElement.value = "";
          //     }
          //   },err=>{
          //     this.showAlertMesssage("Error subiendo documento.")
          //   })
          // } else {
          //   this.alert.showHtmlMessage(resp.objTransaction.msg);
          //   form.reset();
          //   this.Load();

          // }

        }
        if (resp.retorno == 1)
          this.showAlertMesssage(resp.txtRetorno);
      }
    }, err => { this.showAlertMesssage(err) })
  }
  //Mostrar mensajes
  showAlertMesssage(msg: string) {
    // this.alert.showMessage(msg);
    this.message = msg;
    this.alert.show();
  }
  //Filtrado de ciudades
  filterCities() {
    this.gnmunicF = this.gnmunic.filter((v) => v.dep_codi == this.pqr.dep_codi)    
  }
  //Obtener extensión de archivo
  GetExtension(fileName: string) {    
    return fileName.split('.').pop();

  }
  setOptionConfirm(option: string) {    
    switch (option) {
      case "RIGHT":
        this.loadCompanies();

        break;
      case "LEFT":
        this.client = undefined;
        this.Load();
    }

  }
  loadCompanies() {    
    this.spinner.show();
    this._comu.Get(`api/gnempre?usu_codi=${this.pqr.usu_codi}`).subscribe((resp: any) => {
      this.companies = resp.objTransaction;      
      this.spinner.hide();
      this.modal.present();
    })
  }

  setValuesMandatory() {    
    if (!this.client) {
      if (this.pqr.inp_mres != "D") {
        this.pqr.inp_dire = ".";
        this.pqr.inp_mail = "";
      }

      if (this.pqr.inp_mres != "C") {
        this.pqr.inp_mail = ".";
        this.pqr.inp_dire = "";
      }
    }
  }

  getFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  loadTipiFromFlag(ite_cont: string) {
      const query = 'api/PqrTransactionLoad?';
      this._comu.Get(query).subscribe((resp: any) => {
       if (resp.retorno === 0) {
         this.spq000003 = resp.objTransaction;
         if (this.spq000003.dig_valo === 'S') {
          this.setInfoTipi(ite_cont);
         } else {
          this.setInfoAsunto(0);
         }
        }
      });
  }

  setInfoTipi(ite_cont: string) {
     let query = 'api/PqrTransactionLoad?';
      query += `ite_cont=${ite_cont}`;
      this._comu.Get(query, this.pqr.emp_codi).subscribe((resp: any) => {
        if (resp.retorno === 0) {
          this.GnItemsIteTipi = resp.objTransaction;
        }
      });
  }

  setInfoAsunto(ite_cont: number) {
    let query = 'api/PqrTransactionLoad?';
     query += `ite_cont=${ite_cont}`;
     this._comu.Get(query, this.pqr.emp_codi).subscribe((resp: any) => {
       if (resp.retorno === 0) {
         this.GnItemsIteTipi = resp.objTransaction;
       }
     });
 }

  // upload() {
  //   let files = this.getFiles();
  //   console.log(files);
  //   let requests = [];
  //   files.forEach((file) => {
  //     let formData = new FormData();
  //     formData.append('file' , file.rawFile, file.name);
  //     this._comu.Post('api/upload', formData).subscribe((respAdj: any) => {

  //       if (respAdj.retorno == 1)
  //         this.showAlertMesssage(`Se produjo un error subiendo el archivo. Intentelo nuevamente : ${respAdj.txtRetorno}`);
  //       else {
  //         this.message ="";
  //         this.alert.showHtmlMessage(resp.objTransaction.msg);
  //         form.reset();
  //         // this.fileAttchment.nativeElement.value = "";
  //       }
  //     },err=>{
  //       this.showAlertMesssage("Error subiendo documento.")
  //     }) 
  //   });

  //   concat(...requests).subscribe(
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => {  
  //       console.log(err);
  //     }
  //   );
  // }

}

import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { Title, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertComponent } from '../../alert/alert.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComunicationsService } from 'src/services/comunications.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Ctpropo } from 'src/classes/ct/ctpropo';
import { NgForm, FormGroup } from '@angular/forms';
import { Gnarbol } from 'src/classes/gn/gnarbol';
import { FileUploader, FileLikeObject, FileItem } from 'ng2-file-upload';
import { Ctdocpr } from 'src/classes/ct/ctdocpr';
import { companies } from 'src/classes/models';
import { TableSearchComponent } from '../../tools/table-search/table-search.component';
import { ModalComponent } from '../../dialogs/modal/modal.component';
import { Ctdtrda, ObjTratamiento } from 'src/classes/ct/ctdtrda';
import {ToTransaction} from '../../../../classes/gn/toTransaction';
import { Ctrevdo } from 'src/classes/ct/ctrevdo';
import { EnvService } from 'src/app/env.service';

@Component({
  selector: 'app-ctpropo',
  templateUrl: './ctpropo.component.html',
  styleUrls: ['./ctpropo.component.css']
})
export class CtpropoComponent implements OnInit {

  @ViewChild(TableSearchComponent) _table: TableSearchComponent;
  @ViewChild(AlertComponent) alert: AlertComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;

  propo: Ctpropo = new Ctpropo();
  docpr: Ctdocpr = new Ctdocpr(0, '', null, null, '', null , '');

  @Input() gntipdo: any[];
  @Input() ctcamar: any[];
  @Input() ctcontr: any[];
  @Input() gnpaise: any[];
  @Input() gnregio: any[];
  @Input() gndepar: any[];
  @Input() gnmunic: any[];
  @Input() gnlocal: any[];
  @Input() gnpaisr: any[];
  @Input() gnregir: any[];
  @Input() gndeprr: any[];
  @Input() gnmunir: any[];
  @Input() gnlocar: any[];
  @Input() gnarbol: any[];
  @Input() parptda: any = {};
  @Input() parcrpr: any = {};
  @Input() CtDtrda: Ctdtrda[] = [];

  ctacxpr: Gnarbol[] = [];
  ctdocpr: Ctdocpr[] = [];
  ctrevdo: Ctrevdo[] = [];
  companies: companies[];

  selectedArbo: String = '';
  submitted = false;
  msg = '';
  client: String = '';
  i: number;
  uploader: FileUploader = new FileUploader({});
  hasBaseDropZoneOver = false;
  loading = '';
  logo: SafeHtml;
  viewConsul = false;
  atdatos = false;
  form: FormGroup;
  aprobado = false;
  fileUrl;
  public usu_codi: String = '';
  mailTo: String = '';
  saveOK = false;

  constructor(private spinner: NgxSpinnerService, private _comu: ComunicationsService, private sanitizer: DomSanitizer,
   private titleService: Title, private route: ActivatedRoute, private _confirm: ConfirmDialogComponent, private env: EnvService) {
    this.fileUrl = env.apiUrl;
  }

  async ngOnInit() {
    try {

      this.viewConsul = false;

      this.setTitle('Creación de Proponentes');
      await this.GetParams();

      if ( this.client) {
        this.loadCompanies();
      }

      this.Load();

      if (this.propo.rev_cont !== '') {
        this.spinner.show();
        this.viewConsul = true;
        this.LoadProponente();
        this.LoadActividades();
        this.LoadTratamiento();
        this.LoadVigencias();
        this.spinner.hide();
      }

    } catch ( err ) {
      this.showAlertMesssage(err);
    }
  }

  PostCtPropo(form: NgForm) {
    this.guardarInfoProponete(form);
  }

 async guardarInfoProponete(form: NgForm) {

  this.submitted = true;
  this.topFunction();
  this.spinner.show();

    if (this.atdatos) {
      this.propo.rev_apda = 'S';
    } else {
      this.propo.rev_apda = 'N';
    }

    this.mailTo = this.propo.pro_mail;

    this._comu.Post('api/CtPropo/InsertPropo', this.propo).subscribe((resp: ToTransaction) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
          this.propo.rev_cont = resp.objTransaction.rev_cont;
          this.guardarTratamientoDatos();
          form.reset();
        } else {
          this.showAlertMesssage(resp.txtRetorno);
        }
      }
    }, err => {
      this.showAlertMesssage(err);
    });
  }

  cleanForm() {

    this.ctacxpr = [];
    this.ctrevdo = [];
    this.ctdocpr = [];
    this.Load();
    this.propo.pro_pais = '';
    this.propo.pro_pair = '';
    this.propo.pro_regi = '';
    this.propo.pro_regr = '';
    this.propo.pro_depa = '';
    this.propo.pro_depr = '';
    this.propo.pro_muni = '';
    this.propo.pro_munr = '';
    this.propo.pro_loca = '';
    this.propo.pro_locr = '';
    this.gnregir = undefined;
    this.gndeprr = undefined;
    this.gnmunir = undefined;
    this.gnlocar = undefined;
    this.gnregio = undefined;
    this.gndepar = undefined;
    this.gnmunic = undefined;
    this.gnlocal = undefined;
    this.submitted = false;
    this.docpr = new Ctdocpr(0, '', null, null, '', null , '');
    this.spinner.hide();
  }

  guardarTratamientoDatos() {

    const TratData: ObjTratamiento =  {  rev_cont : Number(this.propo.rev_cont), emp_codi : this.propo.emp_codi, detail: this.CtDtrda };
    return this._comu.Post('api/CtPropo/InsertTraDa', TratData).subscribe((resp: any) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
          this.guardarActividades();
        } else {
          this.showAlertMesssage(`Se produjo un error al guardar tratamiento de datos.`);
          this.rollBackPropo();
        }
        return resp.retorno;
      }
    }, err => {
      this.showAlertMesssage(err);
    });
  }

  guardarActividades() {

    let query = 'api/CtPropo/InsertActiv?';
    query +=  `emp_codi=${this.propo.emp_codi}`;
    query +=  `&rev_cont=${this.propo.rev_cont}`;

    this._comu.Post(query, this.ctacxpr).subscribe((resp: ToTransaction) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
          this.guardarRevisionDocumentos();
        } else {
          this.rollBackPropo();
          this.showAlertMesssage(`Se produjo un error al guardar las actividades.`);
        }
      }
    }, err => {
      this.showAlertMesssage(err);
    });
  }

  guardarRevisionDocumentos() {

    let query = 'api/CtPropo/InsertDoctos?';
    query +=  `emp_codi=${this.propo.emp_codi}`;
    query +=  `&rev_cont=${this.propo.rev_cont}`;

    this._comu.Post(query, this.ctdocpr).subscribe((resp: ToTransaction) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
          this.sendMail();
        } else {
          this.showAlertMesssage(`Se produjo un error al guardar la vigencia de documentos.`);
          this.rollBackPropo();
        }
      }
    }, err => {
      this.showAlertMesssage(err);
    });
  }

  rollBackPropo() {

    let query = 'api/CtPropo/RollBackPropo?';
    query +=  `emp_codi=${this.propo.emp_codi}`;
    query +=  `&rev_cont=${this.propo.rev_cont}`;

    this._comu.Post(query, this.ctdocpr).subscribe((resp: ToTransaction) => {
    this.cleanForm();
    }, err => {
      this.showAlertMesssage(err);
    });

  }

  async sendMail() {
    this._comu.Get(`api/CtPropo/sendMail?mailPropo=${this.mailTo}`, this.propo.emp_codi).subscribe((resp: ToTransaction) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
          this.submitted = false;
          this.spinner.hide();
          this.saveOK = true;
          this.showAlertMesssage(`Transacción guardada correctamente.`);
        } else {
          this.showAlertMesssage(`Se produjo un error al enviar el correo.`);
          this.rollBackPropo();
        }
        this.cleanForm();
        return resp.retorno;
      }
    }, err => {
      this.showAlertMesssage(err);
    });
  }

  GetParams(): boolean {
    try {

        this.route.queryParamMap.subscribe(queryParams => {

        if (queryParams.get('client') != null) {
          this.client = atob(queryParams.get('client'));
        }

        if (queryParams.get('usu_codi') != null) {
          this.propo.usu_codi = atob(queryParams.get('usu_codi'));
        }

        if (queryParams.get('rev_cont') != null) {
          this.propo.rev_cont = atob(queryParams.get('rev_cont'));
          this.propo.emp_codi = Number(atob(queryParams.get('emp_codi')));
          this.usu_codi = atob(queryParams.get('usu_codi'));
        }

        return true;
      }, err => {
        return false;
      });
    } catch ( err ) {
      return false;
    }
  }

  Load() {

    this.spinner.show();
    const query = 'api/CtPropo/CtPropoLoad?';

    this._comu.Get(query, this.propo.emp_codi).subscribe((resp: any) => {
      if (resp.retorno === 0) {
        this.logo = resp.objTransaction.empImage;
        this.gntipdo = resp.objTransaction.tipdoct;
        this.ctcamar = resp.objTransaction.CtCamar;
        this.ctcontr = resp.objTransaction.tipCont;
        this.gnpaise = resp.objTransaction.GnPaise;
        this.gnpaisr = resp.objTransaction.GnPaise;
        this.gnarbol = resp.objTransaction.GnArbol;
        this.parptda = resp.objTransaction.parptda;

        if (!this.viewConsul) {
          this.CtDtrda = resp.objTransaction.CtDtrda;
        }
        this.parcrpr = resp.objTransaction.parcrpr;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  async LoadProponente() {

      // tslint:disable-next-line:max-line-length
      const info: any = <any>await this._comu.Get(`api/CtConsu/CtPropoInfoLoad?emp_codi=${this.propo.emp_codi}&rev_cont=${this.propo.rev_cont}`).toPromise();
      if (info.retorno === 0) {

        this.propo = info.objTransaction;
        if (this.propo.rev_apda === 'S') {
          this.atdatos = true;
        }

        if (this.propo.rev_esta === 'A') {
          this.aprobado = true;
        }

        this.filtrarRegiones('', this.propo.pro_pais);
        this.filtrarRegiones('R', this.propo.pro_pair);

        this.filtrarDeptos('', this.propo.pro_pais, this.propo.pro_regi);
        this.filtrarDeptos('R', this.propo.pro_pair, this.propo.pro_regr);

        this.filtrarMunic('', this.propo.pro_pais, this.propo.pro_regi, this.propo.pro_depa);
        this.filtrarMunic('R', this.propo.pro_pair, this.propo.pro_regr, this.propo.pro_depr);

        this.filtrarLocal('', this.propo.pro_pais, this.propo.pro_regi, this.propo.pro_depa, this.propo.pro_muni);
        this.filtrarLocal('R', this.propo.pro_pair, this.propo.pro_regr, this.propo.pro_depr, this.propo.pro_munr);

      } else {
        this.alert.showMessage(info.txtRetorno());
      }
  }

  async LoadActividades() {

    // tslint:disable-next-line:max-line-length
    const info: any = <any>await this._comu.Get(`api/CtConsu/CtPropoActividades?emp_codi=${this.propo.emp_codi}&rev_cont=${this.propo.rev_cont}`).toPromise();
    if (info.retorno === 0) {
      this.ctacxpr = info.objTransaction;
    }
  }

  async LoadTratamiento() {

    // tslint:disable-next-line:max-line-length
    const info: any = <any>await this._comu.Get(`api/CtConsu/CtPropoTratamiento?emp_codi=${this.propo.emp_codi}&rev_cont=${this.propo.rev_cont}`).toPromise();
    if (info.retorno === 0) {
      this.CtDtrda = info.objTransaction;
    }
  }

  async LoadVigencias() {

    // tslint:disable-next-line:max-line-length
    const info: any = <any>await this._comu.Get(`api/CtConsu/CtPropoVigencia?emp_codi=${this.propo.emp_codi}&rev_cont=${this.propo.rev_cont}`).toPromise();
    if (info.retorno === 0) {
      this.ctrevdo = info.objTransaction;
    }
  }

  filtrarRegiones(type: string, _pai_codi: string) {

    let query = 'api/CtPropo/LoadRegiones?';
    query += `pai_codi=${_pai_codi}`;

    this._comu.Get(query, this.propo.emp_codi).subscribe((resp: any) => {

      if (!this.viewConsul) {
        if (type === 'R') {
          this.gnregir = undefined;
          this.gndeprr = undefined;
          this.gnmunir = undefined;
          this.gnlocar = undefined;
        } else {
          this.gnregio = undefined;
          this.gndepar = undefined;
          this.gnmunic = undefined;
          this.gnlocal = undefined;
        }
      }

      if (resp.retorno === 0) {
        if (type === 'R') {
          this.gnregir = resp.objTransaction.GnRegio;
          if (!this.viewConsul) {
            this.propo.pro_regr = '';
          }
        } else {
          this.gnregio = resp.objTransaction.GnRegio;
          if (!this.viewConsul) {
            this.propo.pro_regi = '';
          }
        }

      } else {
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  filtrarDeptos(type: string, _pai_codi: string, _reg_codi: string) {

    let query = 'api/CtPropo/LoadDeptos?';
    query += `pai_codi=${_pai_codi}`;
    query += `&reg_codi=${_reg_codi}`;

    this._comu.Get(query, this.propo.emp_codi).subscribe((resp: any) => {

      if (!this.viewConsul) {
        if (type === 'R') {
          this.gndeprr = undefined;
          this.gnmunir = undefined;
          this.gnlocar = undefined;
        } else {
          this.gndepar = undefined;
          this.gnmunic = undefined;
          this.gnlocal = undefined;
        }
      }

      if (resp.retorno === 0) {
        if (type === 'R') {
          this.gndeprr = resp.objTransaction.GnDepar;
          if (!this.viewConsul) {
            this.propo.pro_depr = '';
          }
        } else {
          this.gndepar = resp.objTransaction.GnDepar;
          if (!this.viewConsul) {
            this.propo.pro_depa = '';
          }
        }
      } else {
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  filtrarMunic(type: string, _pai_codi: string, _reg_codi: string, _dep_codi: string) {

    let query = 'api/CtPropo/LoadMunic?';
    query += `pai_codi=${_pai_codi}`;
    query += `&reg_codi=${_reg_codi}`;
    query += `&dep_codi=${_dep_codi}`;

    this._comu.Get(query, this.propo.emp_codi).subscribe((resp: any) => {

      if (!this.viewConsul) {
        if (type === 'R') {
          this.gnmunir = undefined;
          this.gnlocar = undefined;
        } else {
          this.gnmunic = undefined;
          this.gnlocal = undefined;
        }
      }

      if (resp.retorno === 0) {
        if (type === 'R') {
          this.gnmunir = resp.objTransaction.GnMunic;
          if (!this.viewConsul) {
            this.propo.pro_munr = '';
          }
        } else {
          this.gnmunic = resp.objTransaction.GnMunic;
          if (!this.viewConsul) {
            this.propo.pro_muni = '';
          }
        }
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  filtrarLocal(type: string, _pai_codi: string, _reg_codi: string, _dep_codi: string, _mun_codi: string) {

    let query = 'api/CtPropo/LoadLocal?';
    query += `pai_codi=${_pai_codi}`;
    query += `&reg_codi=${_reg_codi}`;
    query += `&dep_codi=${_dep_codi}`;
    query += `&mun_codi=${_mun_codi}`;

    this._comu.Get(query, this.propo.emp_codi).subscribe((resp: any) => {

      if (!this.viewConsul) {
        if (type === 'R') {
          this.gnlocar = undefined;
        } else {
          this.gnlocal = undefined;
        }
      }

      if (resp.retorno === 0) {
        if (type === 'R') {
          this.gnlocar = resp.objTransaction.GnLocal;

          if (!this.viewConsul) {
            this.propo.pro_locr = '';
          }

        } else {
          this.gnlocal = resp.objTransaction.GnLocal;

          if (!this.viewConsul) {
            this.propo.pro_loca = '';
          }
        }
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

   showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  addActivity() {
    if (this.selectedArbo !== '') {
      if ( this.ctacxpr.length === 0) {
        this.ctacxpr.push(this.gnarbol.filter(t => t.arb_codi === this.selectedArbo)[0]);
      } else {
        if ( this.ctacxpr.indexOf(this.gnarbol.filter(t => t.arb_codi === this.selectedArbo)[0]) === -1) {
          this.ctacxpr.push(this.gnarbol.filter(t => t.arb_codi === this.selectedArbo)[0]);
        }
      }
    }
  }

  delActivity () {
    this.i = this.ctacxpr.indexOf( this.gnarbol.filter(t => t.arb_codi === this.selectedArbo)[0] );
    this.ctacxpr.splice( this.i, 1 );
  }

  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const f = event.target.files[0];
      reader.readAsDataURL(f);
      reader.onload = () => {
        this.docpr.pro_adju = reader.result;
        this.docpr.fil_name = f.name;
      };
    }
  }

  addVigencia() {
    this.ctdocpr.push(this.docpr);
    this.docpr = new Ctdocpr(0, '', null, null, '', null, '');
    this.uploader.clearQueue();
  }

  delVigencia () {
    this.i = this.ctdocpr.indexOf(this.docpr);
    this.ctdocpr.splice( this.i, 1 );
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  loadCompanies() {
    this.spinner.show();
    this._comu.Get(`api/gnempre?usu_codi=${this.propo.usu_codi}`).subscribe((resp: any) => {
      this.companies = resp.objTransaction;
      this.spinner.hide();
      this.modal.present();
    });
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

Aprobar() {
  let query = 'api/CtConsu/aprobarProponente?';
  query +=  `emp_codi=${this.propo.emp_codi}`;
  query +=  `&rev_cont=${this.propo.rev_cont}`;

  this.topFunction();
  this.spinner.show();

  this._comu.Post(query, this.ctrevdo).subscribe((resp: ToTransaction) => {
    if (resp.retorno !== undefined) {
      if (resp.retorno === 0) {
        this.showAlertMesssage('Solicitud aprobada correctamente');
        this.aprobado = true;
        this.Load();
      } else {
        this.showAlertMesssage(resp.txtRetorno);
      }
    }
    this.spinner.hide();
  }, err => {
    this.showAlertMesssage(err);
  });
}

  Rechazar() {

    this.topFunction();
    this.spinner.show();
    let query = 'api/CtConsu/RechazarPropo?';
    query +=  `emp_codi=${this.propo.emp_codi}`;
    query +=  `&rev_cont=${this.propo.rev_cont}`;
    this._comu.Post(query, this.ctrevdo).subscribe((resp: ToTransaction) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
          this.showAlertMesssage('Solicitud rechazada correctamente');
          this.Load();
        } else {
          this.showAlertMesssage(resp.txtRetorno);
        }
        this.spinner.hide();
      }
    }, err => {
      this.showAlertMesssage(err);
    });
  }

  NoAprobacion() {
   return this.ctrevdo.filter(a => a.ite_chkd === true).length !== this.ctrevdo.length;
  }

  downloadFile() {
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  ActualizarApro(chk: boolean, doc_cont: number) {

    let query = 'api/CtConsu/ActualizarVigencia?';
    query +=  `emp_codi=${this.propo.emp_codi}`;
    query +=  `&rev_cont=${this.propo.rev_cont}`;
    query +=  `&doc_cont=${doc_cont}`;
    query +=  `&chkApro=${chk}`;

    this._comu.Post(query, this.ctrevdo).subscribe((resp: ToTransaction) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
        } else {
          this.showAlertMesssage(resp.txtRetorno);
        }
      }
    }, err => {
      this.showAlertMesssage(err);
    });
  }

  open(url: string) {
    window.open(url, '_blank');
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  clearUpload() {
    this.docpr.fil_name = '';
    this.docpr.pro_adju = null;
  }

  Encode(Mytext: string) {
    return btoa(Mytext);
  }

  reloadPage() {
    location.reload();
  }
}

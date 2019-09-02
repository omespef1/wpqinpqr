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

  constructor(private spinner: NgxSpinnerService, private _comu: ComunicationsService, private sanitizer: DomSanitizer,
   private titleService: Title, private route: ActivatedRoute, private _confirm: ConfirmDialogComponent, private env: EnvService) {
    this.fileUrl = env.apiUrl;
  }

  async ngOnInit() {
    try {
      this.setTitle('Creación de Proponentes');
      await this.GetParams();

      if (this.client) {
        this.setOptionConfirm('RIGHT');
      }

      if (!this.client) {
        this.Load();
      }
    } catch ( err ) {
      this.showAlertMesssage(err);
    }
  }

  PostCtPropo(form: NgForm) {
    this.submitted = true;
    this.spinner.show();
    this.loading = 'Enviando a Revisión...';
    this.guardarInfoProponete(form);
    this.submitted = false;
    this.spinner.hide();
  }

 async guardarInfoProponete(form: NgForm) {

    if (this.atdatos) {
      this.propo.rev_apda = 'S';
    } else {
      this.propo.rev_apda = 'N';
    }

    this._comu.Post('api/CtPropo/InsertPropo', this.propo).subscribe((resp: ToTransaction) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
          this.propo.rev_cont = resp.objTransaction.rev_cont;
          this.guardarTratamientoDatos();
          this.guardarActividades();
          this.guardarRevisionDocumentos();
          this.Load();
          this.showAlertMesssage(`La transacción ha sido enviada de manera satisfactoria.`);
          form.reset();
        } else {
          this.showAlertMesssage(resp.txtRetorno);
        }
      }
    }, err => {
      this.showAlertMesssage(err);
    });
  }

  guardarTratamientoDatos() {

    const TratData: ObjTratamiento =  {  rev_cont : Number(this.propo.rev_cont), emp_codi : this.propo.emp_codi, detail: this.CtDtrda };
    return this._comu.Post('api/CtPropo/InsertTraDa', TratData).subscribe((resp: any) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
          this.CtDtrda = null;
        } else {
          this.showAlertMesssage(resp.txtRetorno);
        }
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
          this.ctacxpr = null;
        } else {
          this.showAlertMesssage(resp.txtRetorno);
        }
      }
    }, err => {
      this.showAlertMesssage(err);
    });
  }

  guardarRevisionDocumentos() {

    console.log(this.ctdocpr);

    let query = 'api/CtPropo/InsertDoctos?';
    query +=  `emp_codi=${this.propo.emp_codi}`;
    query +=  `&rev_cont=${this.propo.rev_cont}`;

    this._comu.Post(query, this.ctdocpr).subscribe((resp: ToTransaction) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
          this.ctdocpr = null;
        } else {
          this.showAlertMesssage(resp.txtRetorno);
        }
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
          this.spinner.show();
          this.propo.rev_cont = atob(queryParams.get('rev_cont'));
          this.viewConsul = true;
          this.LoadProponente();
          this.LoadActividades();
          this.LoadTratamiento();
          this.LoadVigencias();
          this.spinner.hide();
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
        this.filtrarDeptos('R', this.propo.pro_pais, this.propo.pro_regr);

        this.filtrarMunic('', this.propo.pro_pais, this.propo.pro_regi, this.propo.pro_depa);
        this.filtrarMunic('R', this.propo.pro_pais, this.propo.pro_regi, this.propo.pro_depr);

        this.filtrarLocal('', this.propo.pro_pais, this.propo.pro_regi, this.propo.pro_depa, this.propo.pro_muni);
        this.filtrarLocal('R', this.propo.pro_pais, this.propo.pro_regi, this.propo.pro_depa, this.propo.pro_munr);

      } else {
        this.alert.showMessage(info.txtRetorno());
      }
  }

  async LoadActividades() {

    // tslint:disable-next-line:max-line-length
    const info: any = <any>await this._comu.Get(`api/CtConsu/CtPropoActividades?emp_codi=${this.propo.emp_codi}&rev_cont=${this.propo.rev_cont}`).toPromise();
    if (info.retorno === 0) {
      this.ctacxpr = info.objTransaction;
    } else {
      this.alert.showMessage(info.txtRetorno());
    }
  }

  async LoadTratamiento() {

    // tslint:disable-next-line:max-line-length
    const info: any = <any>await this._comu.Get(`api/CtConsu/CtPropoTratamiento?emp_codi=${this.propo.emp_codi}&rev_cont=${this.propo.rev_cont}`).toPromise();
    if (info.retorno === 0) {
      this.CtDtrda = info.objTransaction;
    } else {
      this.alert.showMessage(info.txtRetorno());
    }
  }

  async LoadVigencias() {

    // tslint:disable-next-line:max-line-length
    const info: any = <any>await this._comu.Get(`api/CtConsu/CtPropoVigencia?emp_codi=${this.propo.emp_codi}&rev_cont=${this.propo.rev_cont}`).toPromise();
    if (info.retorno === 0) {
      this.ctrevdo = info.objTransaction;
    } else {
      this.alert.showMessage(info.txtRetorno());
    }
  }

  filtrarRegiones(type: string, _pai_codi: number) {

    let query = 'api/CtPropo/LoadRegiones?';
    query += `pai_codi=${_pai_codi}`;

    this._comu.Get(query, this.propo.emp_codi).subscribe((resp: any) => {
      if (resp.retorno === 0) {
        if (type === 'R') {
          this.gnregir = resp.objTransaction.GnRegio;
        } else {
          this.gnregio = resp.objTransaction.GnRegio;
        }
      this.spinner.hide();
      } else {
        this.spinner.hide();
        if (type === 'R') {
          this.gnregir = null;
          this.gndeprr = null;
          this.gnmunir = null;
          this.gnlocar = null;
        } else {
          this.gnregio = null;
          this.gndepar = null;
          this.gnmunic = null;
          this.gnlocal = null;
        }
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  filtrarDeptos(type: string, _pai_codi: number, _reg_codi: number) {

    let query = 'api/CtPropo/LoadDeptos?';
    query += `pai_codi=${_pai_codi}`;
    query += `&reg_codi=${_reg_codi}`;

    this._comu.Get(query, this.propo.emp_codi).subscribe((resp: any) => {
      if (resp.retorno === 0) {
        if (type === 'R') {
          this.gndeprr = resp.objTransaction.GnDepar;
        } else {
          this.gndepar = resp.objTransaction.GnDepar;
        }
        this.spinner.hide();
      } else {
        this.spinner.hide();
        if (type === 'R') {
          this.gnregir = null;
          this.gndeprr = null;
        } else {
          this.gnregio = null;
          this.gndepar = null;
        }
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  filtrarMunic(type: string, _pai_codi: number, _reg_codi: number, _dep_codi: number) {

    let query = 'api/CtPropo/LoadMunic?';
    query += `pai_codi=${_pai_codi}`;
    query += `&reg_codi=${_reg_codi}`;
    query += `&dep_codi=${_dep_codi}`;

    this._comu.Get(query, this.propo.emp_codi).subscribe((resp: any) => {
      if (resp.retorno === 0) {
        if (type === 'R') {
          this.gnmunir = resp.objTransaction.GnMunic;
        } else {
          this.gnmunic = resp.objTransaction.GnMunic;
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

  filtrarLocal(type: string, _pai_codi: number, _reg_codi: number, _dep_codi: number, _mun_codi: number) {

    let query = 'api/CtPropo/LoadLocal?';
    query += `pai_codi=${_pai_codi}`;
    query += `&reg_codi=${_reg_codi}`;
    query += `&dep_codi=${_dep_codi}`;
    query += `&mun_codi=${_mun_codi}`;

    this._comu.Get(query, this.propo.emp_codi).subscribe((resp: any) => {
      if (resp.retorno === 0) {
        if (type === 'R') {
          this.gnlocar = resp.objTransaction.GnLocal;
        } else {
          this.gnlocal = resp.objTransaction.GnLocal;
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
        console.log(this.docpr);
      };
    }
  }

  addVigencia() {
    this.ctdocpr.push(this.docpr);
    console.log(this.ctdocpr);
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

  setOptionConfirm(option: string) {
    switch (option) {
      case 'RIGHT':
        this.loadCompanies();
        break;
      case 'LEFT':
        this.client = undefined;
        this.Load();
    }
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
  }, err => {
    this.showAlertMesssage(err);
  });
}

  Rechazar() {
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
}

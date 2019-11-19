import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComunicationsService } from 'src/services/comunications.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { EnvService } from 'src/app/env.service';
import { AlertComponent } from '../../alert/alert.component';
import { ModalComponent } from '../../dialogs/modal/modal.component';
import { ToTransaction } from 'src/classes/gn/toTransaction';
import { TableSearchGenericComponent } from '../../tools/table-search-generic/table-search-generic.component';
import { RnRadic } from 'src/classes/rn/rnradic';
import { RnDperc } from 'src/classes/rn/rndperc';
import { SumPare } from 'src/classes/rn/sumpare';
import { RnCraco } from 'src/classes/rn/rncraco';
import { NgForm } from '@angular/forms';
import { GnPais } from 'src/classes/gn/gnpaise';
import { GnRegio } from 'src/classes/gn/gnregio';
import { GnDepar } from 'src/classes/gn/gndepar';
import { GnMunic } from 'src/classes/gn/gnmunic';
import { GnLocal } from 'src/classes/gn/gnlocal';
import { GnBarri } from 'src/classes/gn/gnbarri';
import { RnDdocu } from 'src/classes/rn/rnddocu';
import { companies } from 'src/classes/models';
import { ModalDoctosComponent } from './modal-doctos/modal-doctos.component';

@Component({
  selector: 'app-rnradic',
  templateUrl: './rnradic.component.html',
  styleUrls: ['./rnradic.component.css']
})

export class RnradicComponent implements OnInit {

  @ViewChild('modalAportant') _tableAportant: TableSearchGenericComponent;
  @ViewChild('modalTipDocto') _tableTipDocto: TableSearchGenericComponent;
  @ViewChild('modalTipDoctoEmpre') _tableTipDoctoEmpre: TableSearchGenericComponent;
  @ViewChild('modalDocument') _tableDocument: TableSearchGenericComponent;
  @ViewChild('modalGruRadic') _tableGruRadic: TableSearchGenericComponent;
  @ViewChild('modalClasific') _tableClasific: TableSearchGenericComponent;
  @ViewChild('modalDocumento') _tableDocumento: TableSearchGenericComponent;

  @ViewChild(AlertComponent) alert: AlertComponent;

  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild(ModalDoctosComponent) modalDoctos: ModalDoctosComponent;

  @Input() gntipdo: any[];
  @Input() gntipdE: any[];
  @Input() artiapo: any[];
  @Input() arapovo: any[];
  @Input() rngrura: any[];
  @Input() suafili: any[];
  @Input() rncraco = new RnCraco();
  @Input() gnpaise: GnPais[];
  @Input() gnregio: GnRegio[] = [];
  @Input() gndepar: GnDepar[] = [];
  @Input() gnmunic: GnMunic[] = [];
  @Input() gnlocal: GnLocal[] = [];
  @Input() gnbarri: GnBarri[] = [];
  @Input() sumpare: SumPare[] = new Array();
  @Input() rnddocu: RnDdocu[] = [];

  dperc: RnDperc = new RnDperc();
  msg = '';
  ite_depe = '';
  cra_prim = '';
  cra_clar = '';
  cra_dest = '';
  client = '';
  radic: RnRadic = new RnRadic();
  SRN000001: string;
  SRN000002: string;
  selectedPare: SumPare = new SumPare();
  paise = new GnPais();
  regio = new GnRegio();
  depar = new GnDepar();
  munic = new GnMunic();
  barri = new GnBarri();
  local = new GnLocal();
  companies: companies[];

  datTrabajador = false;
  nucleoFamilia = false;
  tipoAportante = false;
  tipoDocumento = false;
  numeDocumento = false;
  tipDocTrabaja = false;
  numDocTrabaja = false;

  constructor(private spinner: NgxSpinnerService, private _comu: ComunicationsService, private sanitizer: DomSanitizer,
    private titleService: Title, private route: ActivatedRoute, private _confirm: ConfirmDialogComponent, private env: EnvService) {
   }

   async ngOnInit() {

    await this.GetParams();

    if (this.radic.emp_codi === undefined) {
      this.loadCompanies();
    }

    if (this.radic.emp_codi) {
      this.Load();
    }

    if (this.SRN000002 === 'S') {
      this.radic.rad_obse = '.';
      this.radic.dsu_tele = '.';
      this.radic.rad_dire = '.';
      this.radic.rad_emai = '.';
    }

   }

   loadCompanies() {
    this.spinner.show();
    this._comu.Get(`api/gnempre?usu_codi=${this.radic.usu_codi}`).subscribe((resp: any) => {
      this.companies = resp.objTransaction;
      this.spinner.hide();
      this.modal.present();
    });
  }

   PostRnRadic(form: NgForm) {
    this.topFunction();
    this.spinner.show();
    this.saveRadic(form);
   }

   clear() {
    this.radic.rad_pais = 0;
    this.radic.rad_regi = 0;
    this.radic.rad_depa = 0;
    this.radic.rad_muni = 0;
    this.radic.rad_loca = 0;
    this.radic.rad_barr = 0;
    this.gnregio = [];
    this.gndepar = [];
    this.gnmunic = [];
    this.gnlocal = [];
    this.gnbarri = [];
    this.radic.rad_tdat = 'N';
    this.sumpare = [];
    this.selectedPare = new SumPare();
   }

   async saveRadic(form: NgForm) {
    await this._comu.Post('api/RnRadic/InserRnRadic', this.radic).subscribe((resp: ToTransaction) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
          this.spinner.hide();
          this.showAlertMesssage('Documento guardado correctamente.');
            this.ngOnInit();
            this.clear();
            form.reset();
        } else {
          this.showAlertMesssage(resp.txtRetorno);
          this.spinner.hide();
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
          } else {
            this.showAlertMesssage('Parámetro cliente no enviado');
            return;
          }
          if (queryParams.get('usu_codi') != null) {
            this.radic.usu_codi = atob(queryParams.get('usu_codi'));
          } else {
            this.showAlertMesssage('Parámetro usuario no enviado');
            return;
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
    let query = 'api/RnRadic/RnRadicLoad?';
    query += `usu_codi=${this.radic.usu_codi}`;

    this._comu.Get(query, this.radic.emp_codi).subscribe((resp: ToTransaction) => {
      if (resp.retorno === 0) {
        this.artiapo = resp.objTransaction.artiapo;
        this.gnpaise = resp.objTransaction.GnPaise;
        this.gntipdo = resp.objTransaction.GnTipdo;
        this.gntipdE = resp.objTransaction.GnTipdo;
        this.arapovo = resp.objTransaction.arapovo;
        this.rngrura = resp.objTransaction.rngrura;
        this.sumpare = resp.objTransaction.SuMpare;
        this.suafili = resp.objTransaction.SuAfili;
        this.SRN000001 = resp.objTransaction.SRN000001;
        this.SRN000002 = resp.objTransaction.SRN000002;
        this.radic.cen_codi = resp.objTransaction.cen_codi;

      } else {
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }

      if (this.SRN000002 === 'S') {
        this.radic.rad_obse = '.';
        this.radic.dsu_tele = '.';
        this.radic.rad_dire = '.';
        this.radic.rad_emai = '.';
      }

      this.spinner.hide();
    }, err => {
      console.log(err);

      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  async LoadClasificacion() {
    // tslint:disable-next-line:max-line-length
    const info: any = <any>await this._comu.Get(`api/RnRadic/RnCracoLoad?emp_codi=${this.radic.emp_codi}&gru_cont=${this.radic.gru_cont}`).toPromise();

    if (info.retorno === 0) {
      this.rncraco = info.objTransaction;
      this.lupaClasificacion();
    }
  }

  lupaTipoAportante() {
    this._tableAportant.btnModalQb = 'btnAportant';
    this._tableAportant.ModalQb = 'modalAportant';
    this._tableAportant.render(this.artiapo);
    this._tableAportant.show();
  }

  lupaTipoDocumento() {
    this._tableTipDocto.btnModalQb = 'btnTipDocto';
    this._tableTipDocto.ModalQb = 'modalTipDocto';
    this._tableTipDocto.render(this.gntipdo);
    this._tableTipDocto.show();
  }

  lupaTipoDocumentoEmpresa() {
    this._tableTipDoctoEmpre.btnModalQb = 'btnTipDoctoEmpre';
    this._tableTipDoctoEmpre.ModalQb = 'modalTipDoctoEmpre';
    this._tableTipDoctoEmpre.render(this.gntipdE);
    this._tableTipDoctoEmpre.show();
  }

  lupaDocumento() {
    this._tableDocument.btnModalQb = 'btnDocument';
    this._tableDocument.ModalQb = 'modalDocument';
    this._tableDocument.render(this.arapovo);
    this._tableDocument.show();
  }

  lupaDocumentoTrabajador() {
    this._tableDocumento.btnModalQb = 'btnDocumento';
    this._tableDocumento.ModalQb = 'modalDocumento';
    this._tableDocumento.render(this.suafili);
    this._tableDocumento.show();
  }

  lupaGrupoRadicacion() {
    this.hideControls();
    this._tableGruRadic.btnModalQb = 'btnGruRadic';
    this._tableGruRadic.ModalQb = 'modalGruRadic';
    this._tableGruRadic.render(this.rngrura);
    this._tableGruRadic.show();
  }

  lupaClasificacion() {

    this._tableClasific.btnModalQb = 'btnClasific';
    this._tableClasific.ModalQb = 'modalClasific';
    this._tableClasific.render(this.rncraco);
    this._tableClasific.show();
  }

  setAportant(rowSelected: any) {
    this.radic.tia_cont = rowSelected.TIA_CONT;
    this.radic.tia_codi = rowSelected.TIA_CODI;
    this.radic.tia_nomb = rowSelected.TIA_NOMB;
  }

  setTipDocto(rowSelected: any) {
    this.radic.tip_codi = rowSelected.TIP_CODI;
    this.radic.tip_nomb = rowSelected.TIP_NOMB;
  }

  setTipDoctoEmpre(rowSelected: any) {
    this.radic.tip_coda = rowSelected.TIP_CODI;
    this.radic.tip_noma = rowSelected.TIP_NOMB;
  }

  setDoctoEmpre(rowSelected: any) {
    this.radic.tia_cont = rowSelected.TIA_CONT;
    this.radic.tia_codi = rowSelected.TIA_CODI;
    this.radic.tia_nomb = rowSelected.TIA_NOMB;
    this.radic.tip_coda = rowSelected.TIP_CODI;
    this.radic.tip_nomb = rowSelected.TIP_NOMB;
    this.radic.apo_coda = rowSelected.APO_CODA;
    this.radic.apo_razs = rowSelected.APO_RAZS;
    this.radic.afi_tele = rowSelected.AFI_TELE;
  }

  setGruRadic(rowSelected: any) {
    this.radic.cra_cont = undefined;
    this.radic.cra_codi = undefined;
    this.radic.cra_nomb = undefined;
    this.radic.gru_cont = rowSelected.GRU_CONT;
    this.radic.gru_codi = rowSelected.GRU_CODI;
    this.radic.gru_nomb = rowSelected.GRU_NOMB;
  }

  setClasificacion(rowSelected: any) {

    this.cleanDataForm();
    this.radic.cra_cont = rowSelected.CRA_CONT;
    this.radic.cra_codi = rowSelected.CRA_CODI;
    this.radic.cra_nomb = rowSelected.CRA_NOMB;
    this.ite_depe =  rowSelected.ITE_NOMB;
    this.cra_prim =  rowSelected.CRA_PRIM;
    this.cra_clar =   rowSelected.CRA_CLAR;
    this.cra_dest =  rowSelected.CRA_DEST;

    if (this.SRN000002 === 'S') {
      this.radic.rad_obse = '.';
      this.radic.dsu_tele = '.';
      this.radic.rad_dire = '.';
      this.radic.rad_emai = '.';
    }

    this.hideShowControls();
  }

  setDocumento(rowSelected: any) {

    this.radic.tip_codi = rowSelected.TIP_CODI;
    this.radic.tip_nomb = rowSelected.TIP_NOMB;
    this.radic.afi_docu = rowSelected.AFI_DOCU;
    this.radic.afi_nom1 = rowSelected.AFI_NOM1;
    this.radic.afi_nom2 = rowSelected.AFI_NOM2;
    this.radic.afi_ape1 = rowSelected.AFI_APE1;
    this.radic.afi_ape2 = rowSelected.AFI_APE2;
    this.radic.afi_fecn = rowSelected.AFI_FECN;
    this.radic.afi_tele = rowSelected.AFI_TELE;
    this.radic.tip_coda = rowSelected.TIP_CODA;
    this.radic.tip_noma = rowSelected.TIP_NOMA;
    this.radic.tia_codi = rowSelected.TIA_CODI;
    this.radic.tia_nomb = rowSelected.TIA_NOMB;
    this.radic.apo_coda = rowSelected.APO_CODA;
    this.radic.apo_razs = rowSelected.APO_RAZS;
    this.radic.dsu_tele = rowSelected.DSU_TELE;
    this.radic.rad_dire = rowSelected.AFI_DIRE;
    this.radic.rad_emai = rowSelected.AFI_MAIL;

    this.radic.rad_pais = rowSelected.PAI_CODI;
    this.paise.pai_codi = this.radic.rad_pais;
    this.radic.pai_nomb = rowSelected.PAI_NOMB;
    this.paise.pai_nomb = this.radic.pai_nomb;
    this.gnpaise.push(this.paise);

    this.radic.rad_regi = rowSelected.REG_CODI;
    this.regio.reg_codi = this.radic.rad_regi;
    this.radic.reg_nomb = rowSelected.REG_NOMB;
    this.regio.reg_nomb = this.radic.reg_nomb;
    this.gnregio.push(this.regio);

    this.radic.rad_depa = rowSelected.DEP_CODI;
    this.depar.dep_codi = this.radic.rad_depa;
    this.radic.dep_nomb = rowSelected.DEP_NOMB;
    this.depar.dep_nomb = this.radic.dep_nomb;
    this.gndepar.push(this.depar);

    this.radic.rad_muni = rowSelected.MUN_CODI;
    this.munic.mun_codi = this.radic.rad_muni;
    this.radic.mun_nomb = rowSelected.MUN_NOMB;
    this.munic.mun_nomb = this.radic.mun_nomb;
    this.gnmunic.push(this.munic);

    this.radic.rad_loca = rowSelected.LOC_CODI;
    this.local.loc_codi = this.radic.rad_loca;
    this.radic.loc_nomb = rowSelected.LOC_NOMB;
    this.local.loc_nomb = this.radic.loc_nomb;
    this.gnlocal.push(this.local);

    this.radic.rad_barr = rowSelected.BAR_CODI;
    this.barri.bar_codi = this.radic.rad_barr;
    this.radic.bar_nomb = rowSelected.BAR_NOMB;
    this.barri.bar_nomb = this.radic.bar_nomb;
    this.gnbarri.push(this.barri);
  }

cleanDataForm() {
  this.radic.tip_codi = undefined;
  this.radic.tip_nomb = '';
  this.radic.afi_docu = '';
  this.radic.afi_nom1 = '';
  this.radic.afi_nom2 = '';
  this.radic.afi_ape1 = '';
  this.radic.afi_ape2 = '';
  this.radic.afi_fecn = undefined;
  this.radic.afi_tele = '';
  this.radic.tip_coda = undefined;
  this.radic.tip_noma = '';
  this.radic.tia_codi = undefined;
  this.radic.tia_nomb = '';
  this.radic.apo_coda = '';
  this.radic.apo_razs = '';
  this.radic.dsu_tele = '';
  this.radic.rad_dire = '';
  this.radic.rad_emai = '';
  this.gnregio = [];
  this.gndepar = [];
  this.gnmunic = [];
  this.gnlocal = [];
  this.gnbarri = [];
}

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  filtrarRegiones(type: string, _pai_codi: number) {

    let query = 'api/CtPropo/LoadRegiones?';
    query += `pai_codi=${_pai_codi}`;

    this._comu.Get(query, this.radic.emp_codi).subscribe((resp: any) => {

      this.gnregio = [];
      this.gndepar = [];
      this.gnmunic = [];
      this.gnlocal = [];
      this.gnbarri = [];

      if (resp.retorno === 0) {
        this.gnregio = resp.objTransaction.GnRegio;
      } else {
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }
    }, err => {
      console.log(err);
      // this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  filtrarDeptos(type: string, _pai_codi: number, _reg_codi: number) {

    let query = 'api/CtPropo/LoadDeptos?';
    query += `pai_codi=${_pai_codi}`;
    query += `&reg_codi=${_reg_codi}`;

    this._comu.Get(query, this.radic.emp_codi).subscribe((resp: any) => {

      this.gndepar = [];
      this.gnmunic = [];
      this.gnlocal = [];
      this.gnbarri = [];

      if (resp.retorno === 0) {
        this.gndepar = resp.objTransaction.GnDepar;
      } else {
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }
    }, err => {
      console.log(err);
      // this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  filtrarMunic(type: string, _pai_codi: number, _reg_codi: number, _dep_codi: number) {

    let query = 'api/CtPropo/LoadMunic?';
    query += `pai_codi=${_pai_codi}`;
    query += `&reg_codi=${_reg_codi}`;
    query += `&dep_codi=${_dep_codi}`;

    this._comu.Get(query, this.radic.emp_codi).subscribe((resp: any) => {

      this.gnmunic = [];
      this.gnlocal = [];
      this.gnbarri = [];

      if (resp.retorno === 0) {
        this.gnmunic = resp.objTransaction.GnMunic;
      } else {
        // this.spinner.hide();
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }
    }, err => {
      console.log(err);
      // this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  filtrarLocal(type: string, _pai_codi: number, _reg_codi: number, _dep_codi: number, _mun_codi: number) {

    let query = 'api/CtPropo/LoadLocal?';
    query += `pai_codi=${_pai_codi}`;
    query += `&reg_codi=${_reg_codi}`;
    query += `&dep_codi=${_dep_codi}`;
    query += `&mun_codi=${_mun_codi}`;

    this._comu.Get(query, this.radic.emp_codi).subscribe((resp: any) => {

      this.gnlocal = [];
      this.gnbarri = [];

      if (resp.retorno === 0) {
        this.gnlocal = resp.objTransaction.GnLocal;
      } else {
       // this.spinner.hide();
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }
    }, err => {
      console.log(err);
      // this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  filtrarBarri(type: string, _pai_codi: number, _reg_codi: number, _dep_codi: number, _mun_codi: number, _loc_codi: number) {

    let query = 'api/CtPropo/LoadBarri?';
    query += `pai_codi=${_pai_codi}`;
    query += `&reg_codi=${_reg_codi}`;
    query += `&dep_codi=${_dep_codi}`;
    query += `&mun_codi=${_mun_codi}`;
    query += `&loc_codi=${_loc_codi}`;

    this._comu.Get(query, this.radic.emp_codi).subscribe((resp: any) => {

      this.gnbarri = [];

      if (resp.retorno === 0) {
        this.gnbarri = resp.objTransaction.GnBarri;
      } else {
       // this.spinner.hide();
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }
    }, err => {
      console.log(err);
     // this.spinner.hide();
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  addGrupoFamiliar() {
    if (this.selectedPare !== undefined) {
      this.dperc.mpa_nomb = this.selectedPare.mpa_nomb;
      this.dperc.mpa_codi = this.selectedPare.mpa_codi;
      if ( this.radic.rndperc.length === 0) {
        this.radic.rndperc.push(this.dperc);
        this.dperc = new RnDperc();
      } else {
        if ( this.radic.rndperc.indexOf(this.radic.rndperc.filter(t => t.dpe_docu === this.dperc.dpe_docu )[0]) === -1) {
          this.radic.rndperc.push(this.dperc);
          this.dperc = new RnDperc();
        }
      }
    }
  }

  delGrupoFamiliar () {
    const i = this.radic.rndperc.indexOf(this.dperc);
    this.radic.rndperc.splice( i, 1 );
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  LoadTratamiento() {
    this.spinner.show();
    const query = 'api/RnRadic/RnRadicTrat?';
    this._comu.Get(query, this.radic.emp_codi).subscribe((resp: ToTransaction) => {

      if (resp.retorno === 0) {
        this.radic.radtdat = resp.objTransaction;
      } else {
        this.showAlertMesssage(`${resp.txtRetorno}`);
      }
      this.spinner.hide();
    }, err => {
      console.log(err);
      this.showAlertMesssage(`Error conectando con el servidor, verfique que el servidor configurado esté escrito correctamente`);
    });
  }

  showModal() {
    this.spinner.show();
    this._comu.Get(`api/RnRadic/RnRadicDocu?cra_codi=${this.radic.cra_codi}`).subscribe((resp: any) => {
      this.rnddocu = resp.objTransaction;
      this.spinner.hide();
      this.modalDoctos.present();
    });
  }

  hideControls() {
    this.datTrabajador = false;
    this.nucleoFamilia = false;
    this.tipoAportante = false;
    this.tipoDocumento = false;
    this.numeDocumento = false;
    this.tipDocTrabaja = false;
    this.numDocTrabaja = false;
  }

  selDocumento(ddo: RnDdocu) {
    this.modalDoctos.dismiss();
    this.dperc.ddo_ndoc = ddo.ite_nomb;
    this.dperc.ddo_cont = ddo.ite_cont;
    this.dperc.ddo_obse = ddo.ddo_obse;
    this.dperc.ddo_recb = ddo.ddo_recb;
    this.dperc.ddo_esis = ddo.ddo_esis;
    this.dperc.ite_codi = ddo.ite_codi;
  }

  numberOnly(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  hideShowControls() {
    this.hideControls();
    if (this.cra_clar === 'A' && this.cra_prim === 'N' && this.cra_dest === 'F') {
      this.datTrabajador = true;
      this.nucleoFamilia = true;
      this.numeDocumento = true;
      this.numDocTrabaja = true;
    } else if (this.cra_clar === 'A' && this.cra_prim === 'N' && this.cra_dest === 'S') {
      this.datTrabajador = true;
      this.nucleoFamilia = true;
      this.numeDocumento = true;
      this.numDocTrabaja = true;
    } else if (this.cra_clar === 'A' && this.cra_prim === 'S' && this.cra_dest === 'F') {
      this.datTrabajador = true;
      this.nucleoFamilia = true;
      this.numeDocumento = true;
      this.tipDocTrabaja = true;
    } else if (this.cra_clar === 'A' && this.cra_prim === 'S' && this.cra_dest === 'S') {
      this.datTrabajador = true;
      this.nucleoFamilia = true;
      this.numeDocumento = true;
      this.tipDocTrabaja = true;
    } else if (this.cra_clar === 'N' && this.cra_prim === 'N' && this.cra_dest === 'N') {
      this.datTrabajador = true;
      this.nucleoFamilia = true;
      this.numeDocumento = true;
      this.numDocTrabaja = true;
    } else if (this.cra_clar === 'P' && this.cra_prim === 'N' && this.cra_dest === 'A') {
      this.numeDocumento = true;
    } else if (this.cra_clar === 'P' && this.cra_prim === 'N' && this.cra_dest === 'S') {
      this.numeDocumento = true;
    } else if (this.cra_clar === 'P' && this.cra_prim === 'S' && this.cra_dest === 'A') {
      this.tipoAportante = true;
      this.tipoDocumento = true;
    } else if (this.cra_clar === 'T' && this.cra_prim === 'N' && this.cra_dest === 'F') {
      this.datTrabajador = true;
      this.nucleoFamilia = true;
      this.numDocTrabaja = true;
    } else if (this.cra_clar === 'T' && this.cra_prim === 'N' && this.cra_dest === 'S') {
      this.datTrabajador = true;
      this.nucleoFamilia = true;
      this.numDocTrabaja = true;
    } else if (this.cra_clar === 'T' && this.cra_prim === 'S' && this.cra_dest === 'F') {
      this.datTrabajador = true;
      this.nucleoFamilia = true;
      this.tipDocTrabaja = true;
    } else if (this.cra_clar === 'T' && this.cra_prim === 'S' && this.cra_dest === 'M') {
      this.datTrabajador = true;
      this.nucleoFamilia = true;
      this.numDocTrabaja = true;
    } else {
      this.datTrabajador = true;
      this.nucleoFamilia = true;
      this.tipoAportante = true;
      this.tipoDocumento = true;
      this.numeDocumento = true;
      this.tipDocTrabaja = true;
      this.numDocTrabaja = true;
    }
  }
}

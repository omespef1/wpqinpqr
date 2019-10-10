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
import { Rnradtd } from 'src/classes/rn/rnradtd';
import { GnPais } from 'src/classes/gn/gnpaise';
import { GnRegio } from 'src/classes/gn/gnregio';
import { GnDepar } from 'src/classes/gn/gndepar';
import { GnMunic } from 'src/classes/gn/gnmunic';
import { GnLocal } from 'src/classes/gn/gnlocal';
import { GnBarri } from 'src/classes/gn/gnbarri';

@Component({
  selector: 'app-rnradic',
  templateUrl: './rnradic.component.html',
  styleUrls: ['./rnradic.component.css']
})

export class RnradicComponent implements OnInit {

  @ViewChild('modalAportant') _tableAportant: TableSearchGenericComponent;
  @ViewChild('modalTipDocto') _tableTipDocto: TableSearchGenericComponent;
  @ViewChild('modalDocument') _tableDocument: TableSearchGenericComponent;
  @ViewChild('modalGruRadic') _tableGruRadic: TableSearchGenericComponent;
  @ViewChild('modalClasific') _tableClasific: TableSearchGenericComponent;
  @ViewChild('modalDocumento') _tableDocumento: TableSearchGenericComponent;

  @ViewChild(AlertComponent) alert: AlertComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @Input() gntipdo: any[];
  @Input() artiapo: any[];
  @Input() arapovo: any[];
  @Input() rngrura: any[];
  @Input() suafili: any[];
  @Input() rncraco = new RnCraco(0, 0, '', 0, '', '', '', '');
  @Input() gnpaise: GnPais[] = [];
  @Input() gnregio: GnRegio[] = [];
  @Input() gndepar: GnDepar[] = [];
  @Input() gnmunic: GnMunic[] = [];
  @Input() gnlocal: GnLocal[] = [];
  @Input() gnbarri: GnBarri[] = [];
  @Input() sumpare: SumPare[] = [];

  dperc: RnDperc = new RnDperc('', '', '', '', '', 0, '');
  msg = '';
  ite_depe = '';
  cra_prim = '';
  cra_clar = '';
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

  constructor(private spinner: NgxSpinnerService, private _comu: ComunicationsService, private sanitizer: DomSanitizer,
    private titleService: Title, private route: ActivatedRoute, private _confirm: ConfirmDialogComponent, private env: EnvService) {
   }

   async ngOnInit() {

    await this.GetParams();

    if (this.radic.emp_codi) {
      this.Load();
    }
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
    this.gnregio = undefined;
    this.gndepar = undefined;
    this.gnmunic = undefined;
    this.gnlocal = undefined;
    this.gnbarri = undefined;
    this.radic.rad_tdat = 'N';
    this.spinner.hide();
   }

   async saveRadic(form: NgForm) {
    await this._comu.Post('api/RnRadic/InserRnRadic', this.radic).subscribe((resp: ToTransaction) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
          this.showAlertMesssage('Documento guardado correctamente.');
          form.reset();
          this.ngOnInit();
          this.clear();
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

          if (queryParams.get('emp_codi') != null) {
            this.radic.emp_codi = Number(atob(queryParams.get('emp_codi')));
          } else {
            this.showAlertMesssage('Parámetro código de empresa no enviado');
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
    this.radic.tip_nomb = rowSelected.TIP_NOMB;
    this.radic.apo_coda = rowSelected.APO_CODA;
    this.radic.apo_razs = rowSelected.APO_RAZS;
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
    this.radic.cra_cont = rowSelected.CRA_CONT;
    this.radic.cra_codi = rowSelected.CRA_CODI;
    this.radic.cra_nomb = rowSelected.CRA_NOMB;
    this.ite_depe =  rowSelected.ITE_NOMB;
    this.cra_prim =  rowSelected.CRA_PRIM;
    this.cra_clar =  rowSelected.CRA_CLAR;
    this.radic.tip_codi = undefined;
    this.radic.tip_nomb = undefined;
    this.radic.afi_docu = undefined;
    this.radic.afi_nom1 = undefined;
    this.radic.afi_nom2 = undefined;
    this.radic.afi_ape1 = undefined;
    this.radic.afi_ape2 = undefined;
    this.radic.afi_fecn = undefined;
    this.radic.afi_tele = undefined;
    this.radic.tip_coda = undefined;
    this.radic.tip_noma = undefined;
    this.radic.tia_codi = undefined;
    this.radic.tia_nomb = undefined;
    this.radic.apo_coda = undefined;
    this.radic.apo_razs = undefined;
    this.radic.dsu_tele = undefined;
    this.radic.rad_dire = undefined;
    this.radic.rad_emai = undefined;
    this.gnregio = [];
    this.gndepar = [];
    this.gnmunic = [];
    this.gnlocal = [];
    this.gnbarri = [];
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

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  filtrarRegiones(type: string, _pai_codi: number) {

    let query = 'api/CtPropo/LoadRegiones?';
    query += `pai_codi=${_pai_codi}`;

    this._comu.Get(query, this.radic.emp_codi).subscribe((resp: any) => {

      this.gnregio = undefined;
      this.gndepar = undefined;
      this.gnmunic = undefined;
      this.gnlocal = undefined;
      this.gnbarri = undefined;
      this.radic.rad_regi = 0;

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

      this.gndepar = undefined;
      this.gnmunic = undefined;
      this.gnlocal = undefined;
      this.gnbarri = undefined;
      this.radic.rad_depa = 0;

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

      this.gnmunic = undefined;
      this.gnlocal = undefined;
      this.gnbarri = undefined;

      this.radic.rad_muni = 0;

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

      this.gnlocal = undefined;
      this.gnbarri = undefined;
      this.radic.rad_loca = 0;

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

      this.gnbarri = undefined;
      this.radic.rad_barr = 0;

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
        this.dperc = new RnDperc('', '', '', '', '', 0, '');
      } else {
        if ( this.radic.rndperc.indexOf(this.radic.rndperc.filter(t => t.dpe_docu === this.dperc.dpe_docu )[0]) === -1) {
          this.radic.rndperc.push(this.dperc);
          this.dperc = new RnDperc('', '', '', '', '', 0, '');
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
}

import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SfFovis, InfoAportante, InfoModvi, InfoDfoih, SfDfore, SfDdfor } from 'src/classes/sf/sffovis';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { GnempreService } from 'src/app/services/gn/gnempre.service';
import { SfForpoService } from 'src/app/services/sf/sfforpo.service';
import { ModalComponent } from 'src/app/components/dialogs/modal/modal.component';
import { NewTableSearchComponent } from 'src/app/components/tools/new-table-search/new-table-search.component';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { companies } from 'src/classes/models';
import { GnempreComponent } from 'src/app/components/gn/gnempre/gnempre.component';
import { AddressToolGenericComponent } from '../../../components/tools/address-tool-generic/address-tool-generic.component';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { ResultDialogComponent } from 'src/app/components/dialogs/result-dialog/result-dialog.component';
import { Sfparam } from 'src/classes/sf/sfparam';
import * as _moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-sfforpo',
  templateUrl: './sfforpo.component.html',
  styleUrls: ['./sfforpo.component.css']
})
export class SfforpoComponent implements OnInit {

  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;
  @ViewChild(ResultDialogComponent) result: ResultDialogComponent;

  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild(GnempreComponent) _EmpreModal: GnempreComponent;

  @ViewChild('modalAfiDire') _tableDireccion: AddressToolGenericComponent;
  @ViewChild('modalModalidad') _tableModalidad: NewTableSearchComponent;
  @ViewChild('modalRadicados') _tableRadicados: NewTableSearchComponent;
  @ViewChild('modalAfiliados') _tableAfiliados: NewTableSearchComponent;
  @ViewChild('modalConyuge') _tableConyuge: NewTableSearchComponent;
  @ViewChild('modalOcupacion') _tableOcupacion: NewTableSearchComponent;
  @ViewChild('modalOcupacionPerc') _tableOcupacionPerc: NewTableSearchComponent;
  @ViewChild('modalOcupacionOtrosM') _tableOcupacionOtrosM: NewTableSearchComponent;
  @ViewChild('modalOcupacionConyuge') _tableOcupacionConyuge: NewTableSearchComponent;
  @ViewChild('modalPerca') _tablePerca: NewTableSearchComponent;
  @ViewChild('modalOtrosM') _tableOtros: NewTableSearchComponent;
  @ViewChild('modalTpostulante') _tableTipoPos: NewTableSearchComponent;
  @ViewChild('modalTpostulantePerc') _tableTipoPosPerc: NewTableSearchComponent;
  @ViewChild('modalTpostulanteCony') _tableTipoPosCony: NewTableSearchComponent;
  @ViewChild('modalTpostulanteOtrosM') _tableTipoPosOtrosM: NewTableSearchComponent;
  @ViewChild('modalConcepto') _tableConcepto: NewTableSearchComponent;
  @ViewChild('modalConceptoR') _tableConceptoR: NewTableSearchComponent;
  @ViewChild('modalParentesco') _tableParentesco: NewTableSearchComponent;
  @ViewChild('modalTipDocto') _tableTipDocto: NewTableSearchComponent;
  @ViewChild('modalConstructora') _tableConstructora: NewTableSearchComponent;

  @Output() rowCLick: EventEmitter<any>;
  fovis: SfFovis = new SfFovis();

  sfdforeA: SfDfore = new SfDfore();
  sfdforeR: SfDfore = new SfDfore();
  sfddforA: SfDdfor = new SfDdfor();
  sfddforR: SfDdfor = new SfDdfor();
  sfparam: Sfparam = new Sfparam();
  companies: companies[];

  listsfddforA: SfDdfor[] = [];
  indexddforA = 0;
  listsfddforR: SfDdfor[] = [];
  indexddforR = 0;

  public InfoSuPerca: InfoAportante = new InfoAportante();
  public InfoOtrosMiembros: InfoAportante = new InfoAportante();

  public InfoModvi: InfoModvi = new InfoModvi();
  public infoDfoih: InfoDfoih = new InfoDfoih();

  emp_codi = 0;
  client = '';
  usu_codi = '';
  msg = '';
  NumPerca = 0;
  viewDdforA = false;
  viewDdforR = false;
  con_codi = 0;
  afi_cont = 0;
  SGN000008 = '';

  tAhorroPrevio = 0;
  tRecursosComp = 0;
  tValorViviend = 0;

  mod_valo = true;
  minDate: Date;

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private route: ActivatedRoute, private _gnempre: GnempreService, private _service: SfForpoService) {

      this.rowCLick = new EventEmitter();
      this.minDate = new Date();
  }

  async ngOnInit() {
    this.spinner.show();
    this.setTitle('FOVIS');
    this.GetParams();

    if (this.client) {

      this.loadCompanies();

      if (this.emp_codi)
        this.load();

    } else
      this.showAlertMesssage('Acceso Denegado.');

    this.spinner.hide();
  }

  async loadCompanies() {
    this.spinner.show();
    this._gnempre.GetGnEmpre(this.usu_codi).subscribe((resp: any) => {
      this.companies = resp.objTransaction;
      this.spinner.hide();
      this._EmpreModal.present();
    });
  }

  load() {
      this.loadSfparam();
      this.getIdAfiliado();
      this.loadValiNomenclatura();
  }

  async GetParams() {
    try {

        this.route.queryParamMap.subscribe(queryParams => {

        if (queryParams.get('client') != null)
          this.client = atob(queryParams.get('client'));

        if (queryParams.get('usu_codi') != null)
          this.usu_codi = atob(queryParams.get('usu_codi'));

        return true;
      }, err => {
        return false;
      });
    } catch ( err ) {
      return false;
    }
  }


  PostForpo(form: NgForm) {
    this.showResultMesssage();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  showResultMesssage() {
    this.result.show();
  }

  getModalidad() {

    this.spinner.show();
    this._service.loadInfoModalidad(this.emp_codi).subscribe(resp => {
      if (resp.retorno === 0) {
        this._tableModalidad.btnModalQb = 'btnModalidad';
        this._tableModalidad.ModalQb = 'modalModvi';
        this._tableModalidad.render(resp.objTransaction);
        this._tableModalidad.show();
      }
    });
    this.spinner.hide();
  }

  setModalidad(rowSelected: any) {
    this.fovis.mod_cont = rowSelected.MOD_CONT;
    this.InfoModvi.mod_cont = rowSelected.MOD_CONT;
    this.InfoModvi.mod_nomb = rowSelected.MOD_NOMB;
    this.InfoModvi.tco_codi = rowSelected.TCO_CODI;
    this.InfoModvi.tco_nomb = rowSelected.TCO_NOMB;
    this.fovis.infoHogar.mod_cspm = rowSelected.MOD_CSPM;
    this.fovis.infoHogar.tco_zona = rowSelected.TCO_ZONA;

    if (this.fovis.infoHogar.mod_cspm === 'S')
      this.mod_valo = false;
    else if (this.fovis.infoHogar.tco_zona === 'U')
      this.mod_valo = false;
    else
      this.mod_valo = true;

      console.log(this.fovis);
  }

  getIdAfiliado() {

    this.spinner.show();
    this._service.loadInfoIdAfiliados(this.emp_codi, this.usu_codi).subscribe(resp => {
      if (resp.objTransaction.AFI_CONT !== undefined)
        this.ValidInfoAfiliado(resp.objTransaction.AFI_CONT);
    });

    this.spinner.hide();
  }

  ValidInfoAfiliado(afi_cont: number) {
    this.spinner.show();
    this._service.loadValidInfoAfiliados(this.emp_codi, afi_cont).subscribe(resp => {
      if (resp.objTransaction.for_esta === 'I' )
        this.loadInfoFromForpo(afi_cont, resp.objTransaction.for_cont);
      // tslint:disable-next-line:max-line-length
      else if (resp.objTransaction.for_esta === '' || resp.objTransaction.for_esta === 'V' || resp.objTransaction.for_esta === 'U' || resp.objTransaction.for_esta === 'N')
        this.loadInfoFromAfili(afi_cont, resp.objTransaction.for_cont);
    });
    this.spinner.hide();
  }

  loadInfoFromForpo(afi_cont: number, for_cont: number) {
    this.spinner.show();
    this._service.loadInfoFromForpo(this.emp_codi, afi_cont, for_cont).subscribe(resp => {

      this.fovis = new SfFovis();
      this.fovis = resp.objTransaction;
      this.fovis.emp_codi = this.emp_codi;
      this.fovis.infoHogar.for_nmie += 1;
      this.fovis.postulante.ite_codi_tp = this.sfparam.ite_cont;
      this.fovis.conyuge.ite_codi_tp = this.sfparam.ite_cont;

      if (this.fovis.conyuge.afi_cont !== 0)
        this.fovis.infoHogar.for_nmie += 1;

      if (this.fovis.InfoSfDfomhP.length !== 0)
        this.fovis.infoHogar.for_nmie += this.fovis.InfoSfDfomhP.length;

      if (this.fovis.InfoSfDfomhO.length !== 0)
        this.fovis.infoHogar.for_nmie += this.fovis.InfoSfDfomhO.length;

      this.setTotal();

      this.InfoModvi.mod_cont = this.fovis.mod_cont;
      this.InfoModvi.mod_nomb = this.fovis.mod_nomb;
      this.InfoModvi.tco_codi = this.fovis.tco_codi;
      this.InfoModvi.tco_nomb = this.fovis.tco_nomb;

      console.log(this.fovis);

    });
    this.spinner.hide();
  }

  loadInfoFromAfili(afi_cont: number, for_cont: number) {
    this.spinner.show();
    this._service.loadInfoFromAfili(this.emp_codi, afi_cont).subscribe(resp => {
      this.fovis = new SfFovis();
      this.fovis = resp.objTransaction;
      this.fovis.emp_codi = this.emp_codi;
      this.fovis.infoHogar.for_nmie += 1;
      this.fovis.postulante.ite_codi_tp = this.sfparam.ite_cont;
      this.fovis.conyuge.ite_codi_tp = this.sfparam.ite_cont;

      if (this.fovis.conyuge.afi_cont !== 0)
        this.fovis.infoHogar.for_nmie += 1;
    });
    this.spinner.hide();
  }

  getOcupacion() {
    this.spinner.show();
    this._service.loadInfoGnItems(338).subscribe(resp => {
      if (resp.retorno === 0) {
        this._tableOcupacion.btnModalQb = 'btnOcupacion';
        this._tableOcupacion.ModalQb = 'modalOcupacion';
        this._tableOcupacion.render(resp.objTransaction);
        this._tableOcupacion.show();
      }
    });
    this.spinner.hide();
  }

  setOcupacion(rowSelected: any) {
    this.fovis.postulante.ite_codi = rowSelected.ITE_CODI;
    this.fovis.postulante.ite_nomb = rowSelected.ITE_NOMB;
  }

  getOcupacionPerc() {
    this.spinner.show();
    this._service.loadInfoGnItems(538).subscribe(resp => {
      if (resp.retorno === 0) {
        this._tableOcupacionPerc.btnModalQb = 'btnOcupacionPerc';
        this._tableOcupacionPerc.ModalQb = 'modalOcupacionPerc';
        this._tableOcupacionPerc.render(resp.objTransaction);
        this._tableOcupacionPerc.show();
      }
    });
    this.spinner.hide();
  }

  setOcupacionPerc(rowSelected: any) {
    this.InfoSuPerca.ite_codi = rowSelected.ITE_CODI;
    this.InfoSuPerca.ite_nomb = rowSelected.ITE_NOMB;
  }

  getPerca() {
    this.spinner.show();
    this._service.loadInfoIdPerca(this.emp_codi, this.fovis.postulante.afi_cont).subscribe(resp => {
      if (resp.retorno === 0) {
        this._tablePerca.btnModalQb = 'btnPerca';
        this._tablePerca.ModalQb = 'modalPerca';
        this._tablePerca.render(resp.objTransaction);
        this._tablePerca.show();
      }
    });
    this.spinner.hide();
  }

  setPerca(rowSelected: any) {
    this.spinner.show();
    // tslint:disable-next-line:max-line-length
    this._service.loadInfoPerca(this.emp_codi, this.fovis.postulante.afi_cont, rowSelected.AFI_CONT, rowSelected.AFI_DOCU).subscribe(resp => {
      if (resp.retorno === 0)
        this.InfoSuPerca = resp.objTransaction;
      else
        this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
  }

  setOtrosM() {
    if (this.InfoOtrosMiembros.afi_docu !== '')
      this.spinner.show();
      // tslint:disable-next-line:max-line-length
      this._service.loadInfoOtros(this.emp_codi, this.fovis.postulante.afi_cont, this.InfoOtrosMiembros.afi_docu).subscribe(resp => {
        if (resp.retorno === 0) {
          if (resp.objTransaction.afi_cont !== 0) {
            this.InfoOtrosMiembros = resp.objTransaction;
            this.fovis.infoHogar.for_nmie += 1;
          }
        } else
          this.showAlertMesssage(resp.txtRetorno);
      });
      this.spinner.hide();
  }

  getTpostulantePerc() {
    this.spinner.show();
    this._service.loadInfoGnItems(486).subscribe(resp => {

      if (resp.retorno === 0) {
        this._tableTipoPosPerc.btnModalQb = 'btnTpostulantePerc';
        this._tableTipoPosPerc.ModalQb = 'modalTpostulantePerc';
        this._tableTipoPosPerc.render(resp.objTransaction);
        this._tableTipoPosPerc.show();
      }
    });
    this.spinner.hide();
  }

  setTpostulantePerc(rowSelected: any) {
    this.InfoSuPerca.ite_codi = rowSelected.ITE_CODI;
    this.InfoSuPerca.ite_nomb = rowSelected.ITE_NOMB;
  }

  getTpostulanteOtrosM() {
    this.spinner.show();
    this._service.loadInfoGnItems(486).subscribe(resp => {

      if (resp.retorno === 0) {
        this._tableTipoPosOtrosM.btnModalQb = 'btnTpostulanteOtrosM';
        this._tableTipoPosOtrosM.ModalQb = 'modalTpostulanteOtrosM';
        this._tableTipoPosOtrosM.render(resp.objTransaction);
        this._tableTipoPosOtrosM.show();
      }
    });
    this.spinner.hide();
  }

  setTpostulanteOtrosM(rowSelected: any) {
    this.InfoOtrosMiembros.ite_codi = rowSelected.ITE_CODI;
    this.InfoOtrosMiembros.ite_nomb = rowSelected.ITE_NOMB;
  }

  getTpostulanteCony() {
    this.spinner.show();
    this._service.loadInfoGnItems(486).subscribe(resp => {
      if (resp.retorno === 0) {
        this._tableTipoPosCony.btnModalQb = 'btnTpostulanteCony';
        this._tableTipoPosCony.ModalQb = 'modalTpostulanteCony';
        this._tableTipoPosCony.render(resp.objTransaction);
        this._tableTipoPosCony.show();
      }
    });
    this.spinner.hide();
  }

  setTpostulanteCony(rowSelected: any) {
    this.fovis.conyuge.ite_codi = rowSelected.ITE_CODI;
    this.fovis.conyuge.ite_nomb = rowSelected.ITE_NOMB;
  }

  getOcupacionOtrosM() {
    this.spinner.show();
    this._service.loadInfoGnItems(538).subscribe(resp => {
      if (resp.retorno === 0) {
        this._tableOcupacionOtrosM.btnModalQb = 'btnOcupacionOtrosM';
        this._tableOcupacionOtrosM.ModalQb = 'modalOcupacionOtrosM';
        this._tableOcupacionOtrosM.render(resp.objTransaction);
        this._tableOcupacionOtrosM.show();
      }
    });
    this.spinner.hide();
  }

  setOcupacionOtrosM(rowSelected: any) {
    this.InfoOtrosMiembros.ite_codi = rowSelected.ITE_CODI;
    this.InfoOtrosMiembros.ite_nomb = rowSelected.ITE_NOMB;
  }

  getOcupacionConyuge() {
    this.spinner.show();
    this._service.loadInfoGnItems(538).subscribe(resp => {
      if (resp.retorno === 0) {
        this._tableOcupacionConyuge.btnModalQb = 'btnOcupacionConyuge';
        this._tableOcupacionConyuge.ModalQb = 'modalOcupacionConyuge';
        this._tableOcupacionConyuge.render(resp.objTransaction);
        this._tableOcupacionConyuge.show();
      }
    });
    this.spinner.hide();
  }

  setOcupacionConyuge(rowSelected: any) {
     this.fovis.conyuge.ite_codi = rowSelected.ITE_CODI;
     this.fovis.conyuge.ite_nomb = rowSelected.ITE_NOMB;
  }

  GetConcepto(con_tipo: string) {
    this.spinner.show();
    this._service.loadInfoConcepto(this.emp_codi, con_tipo).subscribe(resp => {
      if (resp.retorno === 0) {
        this._tableConcepto.btnModalQb = 'btnConcepto';
        this._tableConcepto.ModalQb = 'modalConcepto';
        this._tableConcepto.render(resp.objTransaction);
        this._tableConcepto.show();
      }
    });
    this.spinner.hide();
  }

  setConcepto(rowSelected: any) {
    this.sfdforeA.con_cont = rowSelected.CON_CONT;
    this.sfdforeA.con_codi = rowSelected.CON_CODI;
    this.sfdforeA.con_nomb = rowSelected.CON_NOMB;
    this.sfdforeA.dfo_tipo = 'A';
  }

  GetConceptoR(con_tipo: string) {
    this.spinner.show();
    this._service.loadInfoConcepto(this.emp_codi, con_tipo).subscribe(resp => {
      if (resp.retorno === 0) {
        this._tableConceptoR.btnModalQb = 'btnConceptoR';
        this._tableConceptoR.ModalQb = 'modalConceptoR';
        this._tableConceptoR.render(resp.objTransaction);
        this._tableConceptoR.show();
      }
    });
    this.spinner.hide();
  }

  setConceptoR(rowSelected: any) {
    this.sfdforeR.con_cont = rowSelected.CON_CONT;
    this.sfdforeR.con_codi = rowSelected.CON_CODI;
    this.sfdforeR.con_nomb = rowSelected.CON_NOMB;
    this.sfdforeA.dfo_tipo = 'R';
  }

  getParentescoOtrosM() {
    this.spinner.show();
    this._service.loadParentesco().subscribe(resp => {
      if (resp.retorno === 0) {
        this._tableParentesco.btnModalQb = 'btnParentesco';
        this._tableParentesco.ModalQb = 'modalParentesco';
        this._tableParentesco.render(resp.objTransaction);
        this._tableParentesco.show();
      }
    });
    this.spinner.hide();
  }

  setParentescoOtrosM(rowSelected: any) {
    this.InfoOtrosMiembros.ite_pare = rowSelected.ITE_CONT;
    this.InfoOtrosMiembros.mpa_codi = rowSelected.ITE_CODI;
    this.InfoOtrosMiembros.mpa_nomb = rowSelected.ITE_NOMB;
  }

  getConstructora() {
    this.spinner.show();
    this._service.loadInfoConstructora(this.emp_codi).subscribe(resp => {
      if (resp.retorno === 0) {
        this._tableConstructora.btnModalQb = 'btnConstructora';
        this._tableConstructora.ModalQb = 'modalConstructora';
        this._tableConstructora.render(resp.objTransaction);
        this._tableConstructora.show();
      }
    });
    this.spinner.hide();
  }

  setConstructora(rowSelected: any) {
    this.fovis.infoHogar.dfo_nitc = rowSelected.pvd_coda;
    this.fovis.infoHogar.dfo_nomc = rowSelected.pvr_noco;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    else
      return true;
  }

  ValidarConyuge(val) {
    if (val === 'M' && this.fovis.postulante.afi_cont !== undefined)
      this._service.ValidInfoSuConyu(this.emp_codi, this.fovis.postulante.afi_cont).subscribe(resp => {
        if (resp.objTransaction !== null) {
          this.showAlertMesssage('El postulante tiene conyuge permanente.');
          this.fovis.postulante.for_cond = '';
        }
      });
  }

  TotalIngresos() {
    
    let for_timh = 0;

    for (let j = 0; j < this.fovis.InfoSfDfomhP.length; j++)
      for_timh += Number(this.fovis.InfoSfDfomhP[j].for_sala);

    for (let j = 0; j < this.fovis.InfoSfDfomhO.length; j++)
      for_timh += Number(this.fovis.InfoSfDfomhO[j].for_sala);

    this.fovis.infoHogar.for_timh = Number(this.fovis.conyuge.for_sala)
                                      + Number(for_timh);

    this.fovis.infoHogar.for_ting = Number(this.fovis.postulante.for_ipil)
                                      + Number(this.fovis.conyuge.for_sala)
                                      + Number(for_timh);

    if (this.fovis.InfoGnmasal.mas_vrsm !== 0) {
      this.fovis.infoHogar.num_sala = (Number(this.fovis.infoHogar.for_ting) / Number(this.fovis.InfoGnmasal.mas_vrsm)).toFixed(4);
      this.GetInfoIngresosMensuales();
    }

    if (this.mod_valo)
      this.fovis.infoHogar.dfo_vsol = undefined;
    else
      this.fovis.infoHogar.dfo_vsol = this.fovis.infoHogar.dfo_vsol;
  }

  ValidarDatos(ev, nameTap: string) {

    let msg = '';

    if (this.fovis.postulante.for_sala === undefined || this.fovis.postulante.for_sala === null)
      msg = 'Debe especificar salario constancia.';
    else if (Number(this.fovis.postulante.for_sala) <= 0)
      msg = 'Salario constancia debe ser mayor de cero.';

    // tslint:disable-next-line:max-line-length
    if (this.fovis.postulante.for_cond === null || this.fovis.postulante.for_cond === undefined || this.fovis.postulante.for_cond === '')
      msg = 'Debe especificar condición especial.';

    if (this.InfoModvi.mod_cont === undefined || this.InfoModvi.mod_cont === null)
      msg = 'Debe especificar modalidad de vivienda.';

    if (this.fovis.postulante.afi_docu === '' || this.fovis.postulante.afi_docu === undefined)
      msg = 'Debe especificar identificación del postulante.';

    if (msg.length > 0) {
      this.showAlertMesssage(msg);
      ev.preventDefault();
      ev.stopPropagation();
    }

    this.TotalIngresos();
  }

  addPerca() {
    if (this.fovis.InfoSfDfomhP.indexOf(this.fovis.InfoSfDfomhP.filter(t => t.afi_cont === this.InfoSuPerca.afi_cont)[0]) === -1) {
      this.InfoSuPerca.ite_codi_tp = this.sfparam.ite_cont;
      this.fovis.InfoSfDfomhP.push(this.InfoSuPerca);
      this.fovis.infoHogar.for_nmie += 1;
      this.TotalIngresos();
    } else {
      this.showAlertMesssage('El Documento: ' + this.InfoSuPerca.afi_docu + ' ya fue registrado.');
    }
    this.InfoSuPerca = new InfoAportante();
  }

  addOtrosM() {
    if (this.fovis.InfoSfDfomhO.indexOf(this.fovis.InfoSfDfomhO.filter(t => t.afi_docu === this.InfoOtrosMiembros.afi_docu)[0]) === -1) {
      this.InfoSuPerca.ite_codi_tp = this.sfparam.ite_cont;
      this.fovis.InfoSfDfomhO.push(this.InfoOtrosMiembros);
      this.fovis.infoHogar.for_nmie += 1;
      this.TotalIngresos();
    } else {
      this.showAlertMesssage('El Documento: ' + this.InfoOtrosMiembros.afi_docu + ' ya fue registrado.' );
    }
    this.InfoOtrosMiembros = new InfoAportante();

  }

  GetInfoIngresosMensuales() {
    if (this.fovis.infoHogar.num_sala !== undefined && this.InfoModvi.mod_cont !== null) {
      this.spinner.show();
      // tslint:disable-next-line:max-line-length
      this._service.loadInfoModvi(this.emp_codi, this.InfoModvi.mod_cont, Number(this.fovis.infoHogar.num_sala)).subscribe(resp => {
        if (resp.retorno === 0) {
          this.fovis.infoHogar.dmo_rsmd = resp.objTransaction.dmo_rsmd;
          this.fovis.infoHogar.dmo_rsmh = resp.objTransaction.dmo_rsmh;
          this.fovis.infoHogar.dmo_fsvs = resp.objTransaction.dmo_fsvs;
        } else
          this.showAlertMesssage(resp.txtRetorno);
      });
      this.spinner.hide();
    }
  }

  // -----------------------------------------------------

  addDforeA() {
    this.sfdforeA.dfo_tipo = 'A';
    if (this.sfdforeA.dfo_sald === undefined)
      this.showAlertMesssage('Digite el saldo');
    else
      this.sfdforeA.Infoddfor = [];
      this.fovis.InfodforeA.push(this.sfdforeA);
      this.sfdforeA = new SfDfore();
      this.viewDdforA = false;

    this.setTotal();
  }

  addDforeR() {
    this.sfdforeR.dfo_tipo = 'R';
    if (this.sfdforeR.dfo_sald === undefined)
      this.showAlertMesssage('Digite el saldo');
    else
      this.fovis.InfodforeR.push(this.sfdforeR);
      this.sfdforeR = new SfDfore();
      this.sfdforeA.Infoddfor = this.listsfddforA;
      this.viewDdforR = false;

    this.setTotal();
  }

  addDdforA() {

    this.sfddforA.dfo_tipo = 'A';

    if (this.sfddforA.ddf_entc === undefined)
      this.showAlertMesssage('Ingrese el nombre de la entidad captadora');
    else {
      this.viewDdforA = false;

      if (this.fovis.for_insf === 'P')
        this.sfddforA.con_codi = this.con_codi;

      this.fovis.InfodforeA[this.indexddforA].Infoddfor.push(this.sfddforA);
      this.sfddforA = new SfDdfor();
      this.InfoDdforFilter(this.fovis.InfodforeA[this.indexddforA]);
    }
  }

  addDdforR() {
    this.sfddforR.dfo_tipo = 'R';
    if (this.sfddforR.ddf_entc === undefined)
      this.showAlertMesssage('Ingrese el nombre de la entidad captadora');
    else {

      this.viewDdforR = false;

      if (this.fovis.for_insf === 'P')
        this.sfddforR.con_codi = this.con_codi;

        this.fovis.InfodforeR[this.indexddforR].Infoddfor.push(this.sfddforR);
        this.sfddforR = new SfDdfor();
        this.InfoDdforFilter(this.fovis.InfodforeR[this.indexddforR]);
    }
  }

  InfoDdforFilter(dfore: SfDfore) {
debugger;
    if (dfore.dfo_tipo === 'A') {
      this.listsfddforA = [];
      this.sfdforeA = dfore;
      for (let i = 0; i <  this.fovis.InfodforeA.length; i++) {
         if (this.fovis.InfodforeA[i].dfo_tipo === dfore.dfo_tipo && this.fovis.InfodforeA[i].dfo_cont === dfore.dfo_cont) {
          for (let j = 0; j <  this.fovis.InfodforeA[i].Infoddfor.length; j++) {
              this.listsfddforA.push(this.fovis.InfodforeA[i].Infoddfor[j]);
          }
         }
      }
    } else if (dfore.dfo_tipo === 'R') {
      this.listsfddforR = [];
      this.sfdforeR = dfore;
      for (let i = 0; i < this.fovis.InfodforeR.length; i++) {
        if (this.fovis.InfodforeR[i].dfo_tipo === dfore.dfo_tipo && this.fovis.InfodforeR[i].dfo_cont === dfore.dfo_cont) {
          for (let j = 0; j < this.fovis.InfodforeR[i].Infoddfor.length; j++) {
            this.listsfddforR.push(this.fovis.InfodforeR[i].Infoddfor[j]);
          }
        }
      }
    }

    this.setTotal();
  }

  editarDdforA(ddfor: SfDdfor) {
    this.sfddforA = ddfor;
    this.indexddforA =  this.fovis.InfodforeA.indexOf(this.sfdforeA);
    const i = this.fovis.InfodforeA[this.indexddforA].Infoddfor.indexOf(ddfor);
    this.fovis.InfodforeA[this.indexddforA].Infoddfor.splice( i, 1 );
    this.viewDdforA = true;
    this.InfoDdforFilter(this.fovis.InfodforeA[this.indexddforA]);
  }

  editarDdforR(ddfor: SfDdfor) {
    this.sfddforR = ddfor;
    this.indexddforR =  this.fovis.InfodforeR.indexOf(this.sfdforeR);
    const i = this.fovis.InfodforeR[this.indexddforR].Infoddfor.indexOf(ddfor);
    this.fovis.InfodforeR[this.indexddforR].Infoddfor.splice( i, 1 );
    this.viewDdforR = true;
    this.InfoDdforFilter(this.fovis.InfodforeR[this.indexddforR]);
  }

  emitInfo(dfor: any, type: string) {

    this.con_codi = dfor.con_codi;
    this.rowCLick.emit();

    if (type === 'A') {
      this.viewDdforA = true;
      this.indexddforA =  this.fovis.InfodforeA.indexOf(dfor);
    } else {
      this.viewDdforR = true;
      this.indexddforR =  this.fovis.InfodforeR.indexOf(dfor);
    }

    this.InfoDdforFilter(dfor);
  }


// -------------------------------------------------------------

  setTotal() {

    this.tAhorroPrevio = 0;
    this.tRecursosComp = 0;
    this.tValorViviend = 0;

    for (let i = 0; i < this.fovis.InfodforeA.length; i++)
      this.tAhorroPrevio += Number(this.fovis.InfodforeA[i].dfo_sald);

    for (let i = 0; i < this.fovis.InfodforeR.length; i++)
      this.tRecursosComp += Number(this.fovis.InfodforeR[i].dfo_sald);

    this.tValorViviend =  Number(this.tAhorroPrevio) + Number(this.tRecursosComp) + Number(this.fovis.infoHogar.dfo_vsol);
  }

  valorTotal() {

    let dfo_tota = 0;
    dfo_tota = Number(this.fovis.infoHogar.dfo_vpre) + Number(this.fovis.infoHogar.dfo_vlot);

    if (dfo_tota.toString() !== 'NaN')
      this.fovis.infoHogar.dfo_tota  = dfo_tota;
  }

  loadSfparam() {
    this.spinner.show();
    this._service.loadSfparam(this.emp_codi).subscribe(resp => {
      if (resp.retorno === 0)
        this.sfparam = resp.objTransaction;
      this.spinner.hide();
    });
  }

  loadValiNomenclatura() {
    this.spinner.show();
    this._service.loadValiNomenclatura().subscribe(resp => {
      if (resp.retorno === 0)
        this.SGN000008 = resp.objTransaction;
      this.spinner.hide();
    });
  }

  lupaTipoDocumento() {

    this.spinner.show();
    this._service.loadTipoDocumento(this.emp_codi).subscribe(resp => {
      if (resp.retorno === 0) {
        this._tableTipDocto.btnModalQb = 'btnTipDocto';
        this._tableTipDocto.ModalQb = 'modalTipDocto';
        this._tableTipDocto.render(resp.objTransaction);
        this._tableTipDocto.show();
      }
    });
    this.spinner.hide();
  }

  setTipDocto(rowSelected: any) {
    this.InfoOtrosMiembros.tip_codi = rowSelected.TIP_CODI;
    this.InfoOtrosMiembros.tip_nomb = rowSelected.TIP_NOMB;
  }

  async lupaDirecciones() {
    this._tableDireccion.show();
  }

  getDireccionEmitt(mensaje) {
     this.fovis.postulante.afi_dire = mensaje;
  }

  setOptionConfirm(option: string) {
    switch (option) {
      case 'RIGHT':
        this.spinner.show();
        this.topFunction();

        if (this.fovis.for_insf === 'P') {
          this._service.saveInfoFovis(this.fovis).subscribe(resp => {
            this.spinner.hide();
            this.showAlertMesssage(resp.txtRetorno);
            if (resp.retorno === 0) {
              this.fovis = new SfFovis();
              this.BuildPrint();
            } else
              this.showAlertMesssage(resp.txtRetorno);
          });
        } else {

          console.log(this.fovis);

          // this._service.updateInfoFovis(this.fovis).subscribe(resp => {
          //   this.spinner.hide();
          //   if (resp.retorno === 0) {
          //     this.BuildPrint();
          //   } else
          //     this.showAlertMesssage(resp.txtRetorno);
          // });
        }
        this.spinner.hide();
        break;
    }
  }

  BuildPrint() {
    try {
       this._service.printReport().subscribe(resp => {
         if (resp.retorno === 0) {
           window.open(resp.objTransaction, '_blank');
         } else
           this.showAlertMesssage(`Error generando reporte : ${resp.txtRetorno}`);
         }
       );
     } catch (error) {
       this.showAlertMesssage(`Error generando reporte : ${error}`);
     }
  }

  editarPercaP(perca: InfoAportante) {
    this.InfoSuPerca = perca;
    const i = this.fovis.InfoSfDfomhP.indexOf(perca);
    this.fovis.InfoSfDfomhP.splice( i, 1 );
    this.TotalIngresos();
    this.fovis.infoHogar.for_nmie -= 1;
  }

  editarPercaO(perca: InfoAportante) {
    this.InfoOtrosMiembros = perca;
    const i = this.fovis.InfoSfDfomhO.indexOf(perca);
    this.fovis.InfoSfDfomhO.splice( i, 1 );
    this.TotalIngresos();
    this.fovis.infoHogar.for_nmie -= 1;
  }

  calcularEdad(event) {
    const mo: Moment = event.value;
    const hoy = new Date();
    const cumpleanos = new Date(mo.toDate());
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    this.InfoOtrosMiembros.afi_edad = edad;
  } 
}

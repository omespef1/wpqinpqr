import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SfFovis, InfoAportante, InfoModvi, InfoDmodv } from 'src/classes/sf/sffovis';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { GnempreService } from 'src/app/services/gn/gnempre.service';
import { SfForpoService } from 'src/app/services/sf/sfforpo.service';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { ModalComponent } from 'src/app/components/dialogs/modal/modal.component';
import { NewTableSearchComponent } from 'src/app/components/tools/new-table-search/new-table-search.component';
import { SuAfili } from 'src/classes/sf/suafili';
import { NgForm } from '@angular/forms';
import { GnPais } from 'src/classes/gn/gnpaise';
import { GnRegio } from 'src/classes/gn/gnregio';
import { GnDepar } from 'src/classes/gn/gndepar';
import { GnMunic } from 'src/classes/gn/gnmunic';
import { GnLocal } from 'src/classes/gn/gnlocal';
import { GnBarri } from 'src/classes/gn/gnbarri';
import { LocalizacionService } from 'src/app/services/gn/localizacion.service';
import { SfDfore, SfDdfor, SfForpo } from 'src/classes/sf/sfforpo';
import { ActivatedRoute } from '@angular/router';
import { companies } from 'src/classes/models';
import { GnempreComponent } from 'src/app/components/gn/gnempre/gnempre.component';

@Component({
  selector: 'app-sfforpo',
  templateUrl: './sfforpo.component.html',
  styleUrls: ['./sfforpo.component.css']
})
export class SfforpoComponent implements OnInit {

  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild(GnempreComponent) _EmpreModal: GnempreComponent;

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

  @Output() rowCLick: EventEmitter<any>;

  public gnpaise: GnPais[];
  public gnregio: GnRegio[];
  public gndepar: GnDepar[];
  public gnmunic: GnMunic[];
  public gnlocal: GnLocal[];
  public gnbarri: GnBarri[];

  fovis: SfFovis = new SfFovis();
  forpo: SfForpo = new SfForpo();
  SuAfili: SuAfili = new SuAfili();
  sfdforeA: SfDfore = new SfDfore();
  sfdforeR: SfDfore = new SfDfore();
  sfddforA: SfDdfor = new SfDdfor();
  sfddforR: SfDdfor = new SfDdfor();
  sfradic: any[] = [];
  companies: companies[];

  public InfoSuPerca: InfoAportante = new InfoAportante();
  public InfoOtrosMiembros: InfoAportante = new InfoAportante();
  public InfoModvi: InfoModvi = new InfoModvi();
  public InfoDModv: InfoDmodv = new InfoDmodv();

  emp_codi = 0;
  client = '';
  usu_codi = '';
  msg = '';
  NumPerca = 0;
  viewDdforA = false;
  viewDdforR = false;
  con_codi = 0;

  tAhorroPrevio = 0;
  tRecursosComp = 0;
  tValorViviend = 0;

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private route: ActivatedRoute, private _gnempre: GnempreService, private _service: SfForpoService,
    private _serviceLoc: LocalizacionService) {

      this.rowCLick = new EventEmitter();
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
    this.filtrarPaises();
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
  if (this.fovis.val_tdat)
    this.fovis.InfoAportante.for_tdat = 'S';
  else
    this.fovis.InfoAportante.for_tdat = 'N';
    this.forpo.InfoAportante = this.fovis;
    this.topFunction();
    this.spinner.show();
    this._service.saveInfoFovis(this.forpo).subscribe(resp => {
      this.showAlertMesssage(resp.txtRetorno);
      if (resp.retorno === 0) {
        form.reset();
        this.fovis = new SfFovis();
      } else
        this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
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
    this.InfoModvi.mod_cont = rowSelected.MOD_CONT;
    this.InfoModvi.mod_nomb = rowSelected.MOD_NOMB;
    this.InfoModvi.tco_codi = rowSelected.TCO_CODI;
    this.InfoModvi.tco_nomb = rowSelected.TCO_NOMB;
    this.InfoDModv.mod_cspm = rowSelected.MOD_CSPM;
  }

  getRadicado() {

    this.spinner.show();
    this._service.loadInfoRadicado(this.emp_codi).subscribe(resp => {
      if (resp.retorno === 0)
        this._tableRadicados.btnModalQb = 'btnRadicado';
      this._tableRadicados.ModalQb = 'modalRadic';
      this._tableRadicados.render(resp.objTransaction);
      this._tableRadicados.show();
    });
    this.spinner.hide();
  }

  setRadicado(rowSelected: any) {
    this.fovis.rad_nume = rowSelected.RAD_NUME;
    this.fovis.for_cont = rowSelected.FOR_CONT;
    this.spinner.show();
    this._service.loadInfoAportante(this.emp_codi, this.fovis.rad_nume, this.fovis.for_cont).subscribe(resp => {
      if (resp.retorno === 0) {
        this.fovis = resp.objTransaction;
        this.fovis.mod_cont = Number(this.InfoModvi.mod_cont);
      } else
          this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
  }

  getAfiliados() {
    this.spinner.show();

    this._service.loadInfoIdAfiliados(this.emp_codi).subscribe(resp => {
      if (resp.retorno === 0)
        this._tableAfiliados.btnModalQb = 'btnAfiliados';
      this._tableAfiliados.ModalQb = 'modalAfiliado';
      this._tableAfiliados.render(resp.objTransaction);
      this._tableAfiliados.show();
    });
    this.spinner.hide();
  }

  setAfiliados(rowSelected: any) {
    this.fovis.InfoAportante.afi_cont = rowSelected.AFI_CONT;
    this.spinner.show();
    this._service.loadInfoAfiliados(this.emp_codi, this.fovis.InfoAportante.afi_cont, true).subscribe(resp => {
      if (resp.retorno === 0) {
        this.fovis = resp.objTransaction;
        this.fovis.mod_cont = Number(this.InfoModvi.mod_cont);
        this.fovis.InfoAportante.for_nmie = 1;
        if (this.fovis.InfoConyuge.afi_cont !== 0)
          this.fovis.InfoAportante.for_nmie += 1;

      } else
        this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
    this.ValidInfoAfiliado();
  }

  ValidInfoAfiliado() {
    this.spinner.show();
    this._service.loadValidInfoAfiliados(this.emp_codi, this.fovis.InfoAportante.afi_cont).subscribe(resp => {
      if (resp.objTransaction !== null) {
        // tslint:disable-next-line:max-line-length
        this.showAlertMesssage('El afiliado tiene registros de postulación en estado diferente a Rechazado o Retiro Voluntario. Formulario Número : ' + resp.objTransaction.for_nume);
        this.fovis = new SfFovis();
      }
    });
    this.spinner.hide();
  }

  getTpostulante() {
    this.spinner.show();
    this._service.loadInfoGnItems(486).subscribe(resp => {
      if (resp.retorno === 0) {
        this._tableTipoPos.btnModalQb = 'btnTpostulante';
        this._tableTipoPos.ModalQb = 'modalTpostulante';
        this._tableTipoPos.render(resp.objTransaction);
        this._tableTipoPos.show();
      }
    });
    this.spinner.hide();
  }

  setTpostulante(rowSelected: any) {
    this.fovis.InfoAportante.ite_codi_tp = rowSelected.ITE_CODI;
    this.fovis.InfoAportante.ite_nomb_tp = rowSelected.ITE_NOMB;
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
    this.fovis.InfoAportante.ite_codi_oc = rowSelected.ITE_CODI;
    this.fovis.InfoAportante.ite_nomb_oc = rowSelected.ITE_NOMB;
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
    this.InfoSuPerca.ite_codi_oc = rowSelected.ITE_CODI;
    this.InfoSuPerca.ite_nomb_oc = rowSelected.ITE_NOMB;
  }

  getConyuge() {
    this.spinner.show();

    this._service.loadInfoIdConyuge(this.emp_codi, this.fovis.InfoAportante.afi_cont).subscribe(resp => {
      if (resp.retorno === 0)
        this._tableConyuge.btnModalQb = 'btnConyuge';
      this._tableConyuge.ModalQb = 'modalConyuge';
      this._tableConyuge.render(resp.objTransaction);
      this._tableConyuge.show();
    });

    this.spinner.hide();
  }

  setConyuge(rowSelected: any) {
    this.fovis.InfoAportante.afi_cont = rowSelected.AFI_CONT;
    this.spinner.show();
    this._service.loadInfoAfiliados(this.emp_codi, this.fovis.InfoAportante.afi_cont, false).subscribe(resp => {
      if (resp.retorno === 0)
        this.fovis.InfoAportante = resp.objTransaction;
      else
        this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
    this.ValidInfoAfiliado();
  }

  getPerca() {
    this.spinner.show();
    this._service.loadInfoIdPerca(this.emp_codi, this.fovis.InfoAportante.afi_cont).subscribe(resp => {
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
    this._service.loadInfoPerca(this.emp_codi, this.fovis.InfoAportante.afi_cont, rowSelected.AFI_CONT, rowSelected.AFI_DOCU).subscribe(resp => {
      if (resp.retorno === 0)
        this.InfoSuPerca = resp.objTransaction;
      else
        this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
  }

  getOtrosM() {
    this.spinner.show();
    this._service.loadInfoIdAfiliados(this.emp_codi).subscribe(resp => {
      if (resp.retorno === 0) {
        this._tableOtros.btnModalQb = 'btnOtrosM';
        this._tableOtros.ModalQb = 'modalOtrosM';
        this._tableOtros.render(resp.objTransaction);
        this._tableOtros.show();
      }
    });
    this.spinner.hide();
  }

  setOtrosM(rowSelected: any) {
    this.InfoOtrosMiembros.afi_cont = rowSelected.AFI_CONT;
    this.spinner.show();
    // tslint:disable-next-line:max-line-length
    this._service.loadInfoOtros(this.emp_codi, this.fovis.InfoAportante.afi_cont, rowSelected.AFI_CONT, rowSelected.AFI_DOCU).subscribe(resp => {
      if (resp.retorno === 0) {
        this.InfoOtrosMiembros = resp.objTransaction;

        if (this.InfoOtrosMiembros.afi_cont !== 0)
          this.InfoOtrosMiembros.for_nmie += 1;

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
    this.InfoSuPerca.ite_codi_tp = rowSelected.ITE_CODI;
    this.InfoSuPerca.ite_nomb_tp = rowSelected.ITE_NOMB;
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
    this.InfoOtrosMiembros.ite_codi_tp = rowSelected.ITE_CODI;
    this.InfoOtrosMiembros.ite_nomb_tp = rowSelected.ITE_NOMB;
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
    this.fovis.InfoConyuge.ite_codi_tp = rowSelected.ITE_CODI;
    this.fovis.InfoConyuge.ite_nomb_tp = rowSelected.ITE_NOMB;
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
    this.InfoOtrosMiembros.ite_codi_oc = rowSelected.ITE_CODI;
    this.InfoOtrosMiembros.ite_nomb_oc = rowSelected.ITE_NOMB;
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
    this.fovis.InfoConyuge.ite_codi_oc = rowSelected.ITE_CODI;
    this.fovis.InfoConyuge.ite_nomb_oc = rowSelected.ITE_NOMB;
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    else
      return true;
  }

  ValidarConyuge(val) {
    if (val === 'M' && this.fovis.InfoAportante.afi_cont !== undefined) {
      this._service.ValidInfoSuConyu(this.emp_codi, this.fovis.InfoAportante.afi_cont).subscribe(resp => {
        if (resp.objTransaction !== null) {
          this.showAlertMesssage('El postulante tiene conyuge permanente.');
          this.fovis.InfoAportante.for_cond = '';
        }
      });
    }
  }

  TotalIngresos() {
    let for_timh = 0;

    for (let j = 0; j < this.forpo.InfoSfDfomhP.length; j++)
      for_timh += Number(this.forpo.InfoSfDfomhP[j].for_sala);

    for (let j = 0; j < this.forpo.InfoSfDfomhO.length; j++)
      for_timh += Number(this.forpo.InfoSfDfomhO[j].for_sala);

    this.fovis.InfoAportante.for_timh = Number(this.fovis.InfoConyuge.for_sala)
                                      + Number(for_timh);

    this.fovis.InfoAportante.for_ting = Number(this.fovis.InfoAportante.for_sala)
                                      + Number(this.fovis.InfoConyuge.for_sala)
                                      + Number(for_timh);

    if (this.fovis.InfoGnmasal.mas_vrsm !== 0) {
      this.fovis.num_sala = (Number(this.fovis.InfoAportante.for_ting) / Number(this.fovis.InfoGnmasal.mas_vrsm)).toFixed(4);
      this.GetInfoIngresosMensuales();
    }
  }

  ValidarDatos(ev) {

    let msg = '';

    // $('.nav-tabs a').on('shown.bs.tab', function(event){
    //   var x = $(event.target).text();         // active tab
    //   var y = $(event.relatedTarget).text();  // previous tab
    //   $(".act span").text(x);
    //   $(".prev span").text(y);
    // });

    if (this.fovis.InfoAportante.for_sala === undefined || this.fovis.InfoAportante.for_sala === null)
      msg = 'Debe especificar salario constancia.';
    else if (Number(this.fovis.InfoAportante.for_sala) <= 0)
      msg = 'Salario constancia debe ser mayor de cero.';

    // tslint:disable-next-line:max-line-length
    if (this.fovis.InfoAportante.for_cond === null || this.fovis.InfoAportante.for_cond === undefined || this.fovis.InfoAportante.for_cond === '')
      msg = 'Debe especificar condición especial.';

    if (this.InfoModvi.mod_cont === undefined || this.InfoModvi.mod_cont === null)
      msg = 'Debe especificar modalidad de vivienda.';

    if (this.fovis.InfoAportante.afi_docu === '' || this.fovis.InfoAportante.afi_docu === undefined)
      msg = 'Debe especificar identificación del postulante.';

    if (msg.length > 0) {
      this.showAlertMesssage(msg);
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  addPerca() {
    if (this.forpo.InfoSfDfomhP.indexOf(this.forpo.InfoSfDfomhP.filter(t => t.afi_cont === this.InfoSuPerca.afi_cont)[0]) === -1) {
      this.forpo.InfoSfDfomhP.push(this.InfoSuPerca);
      this.fovis.InfoAportante.for_nmie += 1;
      this.TotalIngresos();
    } else
      this.showAlertMesssage('El Documento: ' + this.InfoSuPerca.afi_docu + ' ya fue registrado.' );

    this.InfoSuPerca = new InfoAportante();
  }

  addOtrosM() {
    // tslint:disable-next-line:max-line-length
    if (this.forpo.InfoSfDfomhO.indexOf(this.forpo.InfoSfDfomhO.filter(t => t.afi_cont === this.InfoOtrosMiembros.afi_cont)[0]) === -1) {
      this.forpo.InfoSfDfomhO.push(this.InfoOtrosMiembros);
      this.fovis.InfoAportante.for_nmie += 1;
      this.TotalIngresos();
    } else
      this.showAlertMesssage('El Documento: ' + this.InfoOtrosMiembros.afi_docu + ' ya fue registrado.' );

    this.InfoOtrosMiembros = new InfoAportante();
  }

  GetInfoIngresosMensuales() {
    if (this.fovis.num_sala !== undefined && this.fovis.mod_cont !== null) {
      this.spinner.show();
      // tslint:disable-next-line:max-line-length
      this._service.loadInfoModvi(this.emp_codi, this.fovis.mod_cont, Number(this.fovis.num_sala)).subscribe(resp => {
        if (resp.retorno === 0)
          this.InfoDModv = resp.objTransaction;
        else
          this.showAlertMesssage(resp.txtRetorno);
      });
      this.spinner.hide();
    }
  }

  filtrarPaises() {
    this.spinner.show();
    this._serviceLoc.loadInfoPaises().subscribe(resp => {
      this.gnpaise = resp;
      this.forpo.InfoHogar.pai_codi = '';
    });
    this.spinner.hide();
  }

  filtrarRegion() {

    this.gnregio = undefined;
    this.gndepar = undefined;
    this.gnmunic = undefined;
    this.gnlocal = undefined;
    this.gnbarri = undefined;

    this._serviceLoc.loadInfoRegiones(this.forpo.InfoHogar.pai_codi).subscribe(resp => {
      this.gnregio = resp;
      this.forpo.InfoHogar.reg_codi = '';
    });
    this.spinner.hide();
  }

  filtrarDeptos() {

    this.gndepar = undefined;
    this.gnmunic = undefined;
    this.gnlocal = undefined;
    this.gnbarri = undefined;

    this._serviceLoc.loadInfoDepartamentos(this.forpo.InfoHogar.pai_codi, this.forpo.InfoHogar.reg_codi).subscribe(resp => {
      this.gndepar = resp;
      this.forpo.InfoHogar.dep_codi = '';
    });
    this.spinner.hide();
  }

  filtrarMunic() {

    this.gnmunic = undefined;
    this.gnlocal = undefined;
    this.gnbarri = undefined;

    // tslint:disable-next-line:max-line-length
    this._serviceLoc.loadInfoMunicipios(this.forpo.InfoHogar.pai_codi, this.forpo.InfoHogar.reg_codi, this.forpo.InfoHogar.dep_codi).subscribe(resp => {
      this.gnmunic = resp;
      this.forpo.InfoHogar.mun_codi = '';
    });
    this.spinner.hide();
  }

  filtrarLocal() {

    this.gnlocal = undefined;
    this.gnbarri = undefined;

    // tslint:disable-next-line:max-line-length
    this._serviceLoc.loadInfoLocalidad(this.forpo.InfoHogar.pai_codi, this.forpo.InfoHogar.reg_codi, this.forpo.InfoHogar.dep_codi, this.forpo.InfoHogar.mun_codi).subscribe(resp => {
      this.gnlocal = resp;
      this.forpo.InfoHogar.loc_codi = '';
    });
    this.spinner.hide();
  }

  filtrarBarri() {

    this.gnbarri = undefined;

    // tslint:disable-next-line:max-line-length
    this._serviceLoc.loadInfoBarrio(this.forpo.InfoHogar.pai_codi, this.forpo.InfoHogar.reg_codi, this.forpo.InfoHogar.dep_codi, this.forpo.InfoHogar.mun_codi, this.forpo.InfoHogar.loc_codi).subscribe(resp => {
      this.gnbarri = resp;
      this.forpo.InfoHogar.bar_codi = '';
    });
    this.spinner.hide();
  }

  InfodforeFilter(filter: string) {
    let result: any[] = [];
    if (this.forpo.Infodfore !== undefined)
      result = this.forpo.Infodfore.filter(t => t.dfo_tipo === filter);
    return result;
  }

  InfoDdforFilter(filter: number, type: string) {
    let result: any[] = [];
    if (this.forpo.Infoddfor !== undefined)
      result = this.forpo.Infoddfor.filter(t => t.con_codi === filter && t.dfo_tipo === type);
    return result;
  }

  emitInfo(dfor: any, type: string) {
    this.con_codi = dfor.con_codi;
    this.rowCLick.emit();

    if (type === 'A')
      this.viewDdforA = true;
    else
      this.viewDdforR = true;
    }

  addDforeA() {
    this.sfdforeR.dfo_tipo = 'A';
    if (this.sfdforeA.dfo_sald === undefined)
      this.showAlertMesssage('Digite el saldo');
    else if (this.forpo.Infodfore.length === 0) {
      this.forpo.Infodfore.push(this.sfdforeA);
      this.sfdforeA = new SfDfore();
      this.viewDdforA = false;
    // tslint:disable-next-line:max-line-length
    } else if (this.forpo.Infodfore.indexOf(this.forpo.Infodfore.filter(t => t.con_codi === this.sfdforeA.con_codi && t.dfo_tipo === 'A')[0]) === -1) {
        this.forpo.Infodfore.push(this.sfdforeA);
        this.sfdforeA = new SfDfore();
        this.viewDdforA = false;
      }

      this.setTotal();
  }

  setTotal() {

    this.tAhorroPrevio = 0;
    this.tRecursosComp = 0;
    this.tValorViviend = 0;

    for (let i = 0; i < this.forpo.Infodfore.length; i++) {
      if ( this.forpo.Infodfore[i].dfo_tipo === 'A')
        this.tAhorroPrevio +=  Number(this.forpo.Infodfore[i].dfo_sald);
      else
        this.tRecursosComp +=  Number(this.forpo.Infodfore[i].dfo_sald);
    }

    this.tValorViviend =  Number(this.tAhorroPrevio) + Number(this.tRecursosComp) + Number(this.forpo.InfoHogar.dfo_vsol);
  }

  addDdforA() {
    this.sfddforA.dfo_tipo = 'A';
    if (this.sfddforA.ddf_entc === undefined)
      this.showAlertMesssage('Ingrese el nombre de la entidad captadora');
    else {
      this.sfddforA.con_codi = this.con_codi;
      this.forpo.Infoddfor.push(this.sfddforA);
      this.sfddforA = new SfDdfor();
    }
  }

  addDforeR() {
    this.sfdforeR.dfo_tipo = 'R';
    if (this.sfdforeR.dfo_sald === undefined)
      this.showAlertMesssage('Digite el saldo');
    else if (this.forpo.Infodfore.length === 0) {
      this.forpo.Infodfore.push(this.sfdforeR);
      this.sfdforeR = new SfDfore();
      this.viewDdforR = false;
    // tslint:disable-next-line:max-line-length
    } else if (this.forpo.Infodfore.indexOf(this.forpo.Infodfore.filter(t => t.con_codi === this.sfdforeR.con_codi && t.dfo_tipo === 'R' )[0]) === -1) {
        this.forpo.Infodfore.push(this.sfdforeR);
        this.sfdforeR = new SfDfore();
        this.viewDdforR = false;
      }

      this.setTotal();
  }

  addDdforR() {
    this.sfddforR.dfo_tipo = 'R';
    if (this.sfddforR.ddf_entc === undefined)
      this.showAlertMesssage('Ingrese el nombre de la entidad captadora');
    else {
      this.sfddforR.con_codi = this.con_codi;
      this.forpo.Infoddfor.push(this.sfddforR);
      this.sfddforR = new SfDdfor();
    }
  }

  valorTotal() {

    let dfo_tota = 0;
    dfo_tota = Number(this.forpo.InfoHogar.dfo_vpre) + Number(this.forpo.InfoHogar.dfo_vlot);

    if (dfo_tota.toString() !== 'NaN')
      this.forpo.InfoHogar.dfo_tota  = dfo_tota;
  }
}

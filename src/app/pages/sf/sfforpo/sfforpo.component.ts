import { Component, OnInit, ViewChild } from '@angular/core';
import { SfFovis } from 'src/classes/sf/sffovis';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { GnempreService } from 'src/app/services/gn/gnempre.service';
import { ActivatedRoute } from '@angular/router';
import { SfForpoService } from 'src/app/services/sf/sfforpo.service';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { ModalComponent } from 'src/app/components/dialogs/modal/modal.component';
import { NewTableSearchComponent } from 'src/app/components/tools/new-table-search/new-table-search.component';
import { SuAfili } from 'src/classes/sf/suafili';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sfforpo',
  templateUrl: './sfforpo.component.html',
  styleUrls: ['./sfforpo.component.css']
})
export class SfforpoComponent implements OnInit {

  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;

  @ViewChild('modalModalidad') _tableModalidad: NewTableSearchComponent;
  @ViewChild('modalRadicados') _tableRadicados: NewTableSearchComponent;
  @ViewChild('modalAfiliados') _tableAfiliados: NewTableSearchComponent;
  @ViewChild('modalConyuge') _tableConyuge: NewTableSearchComponent;
  @ViewChild('modalTpostulante') _tableTipoPos: NewTableSearchComponent;
  @ViewChild('modalOcupacion') _tableOcupacion: NewTableSearchComponent;
  @ViewChild('modalPerca') _tablePerca: NewTableSearchComponent;

  fovis: SfFovis = new SfFovis();
  SuAfili: SuAfili = new SuAfili();
  sfradic: any[] = [];

  emp_codi = 0;
  msg = '';

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private _gnempre: GnempreService, private route: ActivatedRoute, private _service: SfForpoService) {
  }

  async ngOnInit() {

    try {
      this.setTitle('FOVIS');
      this.load();
    } catch (err) {
      this.showAlertMesssage(err);
    }
  }

  async load() {
    // this.spinner.show();
    // this._service.loadInfoInitFovis(this.emp_codi).subscribe(resp => {
    //   if (resp.retorno === 0)
    //    this.fovis = resp.objTransaction;

    //   if (this.fovis.par_feab !== 'S')
    //     this.showAlertMesssage('No existe una convocatoria en estado activo');
    // });

    // this.spinner.hide();
  }

  PostForpo(form: NgForm) {

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
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
    this.fovis.InfoAportante.mod_cont = rowSelected.MOD_CONT;
    this.fovis.InfoAportante.mod_nomb = rowSelected.MOD_NOMB;
    this.fovis.InfoAportante.tco_codi = rowSelected.TCO_CODI;
    this.fovis.InfoAportante.tco_nomb = rowSelected.TCO_NOMB;
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
    this.fovis.InfoAportante.rad_nume = rowSelected.RAD_NUME;
    this.fovis.InfoAportante.for_cont = rowSelected.FOR_CONT;
    this.spinner.show();
    this._service.loadInfoAportante(this.emp_codi, this.fovis.InfoAportante.rad_nume, this.fovis.InfoAportante.for_cont).subscribe(resp => {
      if (resp.retorno === 0)
        this.fovis = resp.objTransaction;
      else
        this.showAlertMesssage(resp.txtRetorno);
    });
    this.fovis.InfoAportante.mod_cont = undefined;
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
    this._service.loadInfoAfiliados(this.emp_codi, this.fovis.InfoAportante.afi_cont).subscribe(resp => {
      if (resp.retorno === 0)
        this.fovis = resp.objTransaction;
      else
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
    this._service.loadInfoAfiliados(this.emp_codi, this.fovis.InfoAportante.afi_cont).subscribe(resp => {
      if (resp.retorno === 0)
        this.fovis.InfoAportante = resp.objTransaction;
      else
        this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
    this.ValidInfoAfiliado();
  }

  // getPerca() {
  //   this.spinner.show();
  //   this._service.loadInfoIdPerca(this.emp_codi, this.fovis.InfoAportante.afi_cont).subscribe(resp => {
  //     if (resp.retorno === 0) {
  //       this._tablePerca.btnModalQb = 'btnPerca';
  //       this._tablePerca.ModalQb = 'modalPerca';
  //       this._tablePerca.render(resp.objTransaction);
  //       this._tablePerca.show();
  //     }
  //   });
  //   this.spinner.hide();
  // }

  // setPerca(rowSelected: any) {
  //   this.fovis.InfoAportante.afi_cont = rowSelected.AFI_CONT;
  //   this.spinner.show();
  //   this._service.loadInfoAfiliados(this.emp_codi, this.fovis.InfoAportante.afi_cont).subscribe(resp => {
  //     if (resp.retorno === 0)
  //       this.fovis.InfoAportante = resp.objTransaction;
  //     else
  //       this.showAlertMesssage(resp.txtRetorno);
  //   });
  //   this.spinner.hide();
  //   this.ValidInfoAfiliado();
  // }

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
    this.fovis.InfoAportante.for_timh = this.fovis.InfoConyuge.for_sala;
    this.fovis.InfoAportante.for_ting = Number(this.fovis.InfoAportante.for_sala) + Number(this.fovis.InfoConyuge.for_sala);
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

    if (this.fovis.InfoAportante.mod_cont === undefined || this.fovis.InfoAportante.mod_cont === null)
      msg = 'Debe especificar modalidad de vivienda.';

    if (this.fovis.InfoAportante.afi_docu === '' || this.fovis.InfoAportante.afi_docu === undefined)
      msg = 'Debe especificar identificación del postulante.';

    if (msg.length > 0) {
      // this.showAlertMesssage(msg);
      // ev.preventDefault();
      // ev.stopPropagation();
    }
  }
}

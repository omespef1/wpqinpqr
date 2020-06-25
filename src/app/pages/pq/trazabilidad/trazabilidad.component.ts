import { Component, OnInit, ViewChild } from '@angular/core';
import { GnempreComponent } from 'src/app/components/gn/gnempre/gnempre.component';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { ModalComponent } from 'src/app/components/dialogs/modal/modal.component';
import { companies } from 'src/classes/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { GnempreService } from 'src/app/services/gn/gnempre.service';
import { ActivatedRoute } from '@angular/router';
import { TrazabilidadService } from 'src/app/services/pq/pqestad/trazabilidad.service';
import { Trazabilidad } from 'src/classes/pq/trazabilidad';
import { PqTrazabilidad } from 'src/classes/pq/pqTrazabilidad';
import { PqrDetalleTraza } from 'src/classes/pq/pqrDetalleTraza';
import * as moment from 'moment';
import { ExcelService } from 'src/app/services/pq/pqestad/excel.service';
import { ComunicationsService } from 'src/services/comunications.service';

@Component({
  selector: 'app-trazabilidad',
  templateUrl: './trazabilidad.component.html',
  styles: []
})
export class TrazabilidadComponent implements OnInit {

  @ViewChild(GnempreComponent) _EmpreModal: GnempreComponent;
  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;

  trazPQRWF: Trazabilidad = new Trazabilidad();
  infoTraza: PqTrazabilidad[] = [];
  infoPqrTraza: PqrDetalleTraza = new PqrDetalleTraza();
  companies: companies[];
  emp_codi = 0;
  client = '';
  usu_codi = '';
  msg = '';
  visibleEncabez = true;
  visibleDatGrid = false;
  visibleDetalle = false;
  visibleAdjunto = false;
  gnAdjunt: any[];
  SPQ000003 = false;

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private _gnempre: GnempreService, private route: ActivatedRoute, private _service: TrazabilidadService,
    private excelService: ExcelService, private _conmu: ComunicationsService) {
   }

  async ngOnInit() {

    try {

     this.setTitle('Trazabilidad PQR - WF');
     this.GetParams();

      if (this.client) {

        this.loadCompanies();

        if (this.emp_codi)
          this.load();

      } else
        this.showAlertMesssage('Acceso Denegado.');

    } catch ( err ) {
     this.showAlertMesssage(err);
    }
  }

  load() {

    this.spinner.show();
    this._service.loadInfoInitTrazabilidad(this.emp_codi).subscribe(resp => {
      if (resp.retorno === 0)
       this.trazPQRWF = resp.objTransaction;

        if ( this.trazPQRWF.SPQ000003 === 'S')
          this.SPQ000003 = true;

    });

    this.spinner.hide();
  }

  consultarInfoTraz() {

    this.infoTraza = [];
    this.visibleEncabez = false;
    this.visibleDatGrid = true;
    this.visibleDetalle = false;
    this.visibleAdjunto = false;

    let filter = '';

    if (this.trazPQRWF.selSecc !== undefined && this.trazPQRWF.selSecc !== 'undefined')
      filter += ' AND GN_ARBOL.ARB_CONT =' + this.trazPQRWF.selSecc;
    if (this.trazPQRWF.selForm !== undefined && this.trazPQRWF.selForm !== 'undefined')
      filter += ' AND GN_ITEMS.ITE_CONT = ' + this.trazPQRWF.selForm;
    if (this.trazPQRWF.selTpqr !== undefined && this.trazPQRWF.selTpqr !== 'undefined')
      filter += ' AND GN_ITEMSTPQR.ITE_CONT = ' + this.trazPQRWF.selTpqr;
    if (this.trazPQRWF.selArea !== undefined && this.trazPQRWF.selArea !== 'undefined')
      filter += ' AND GN_ARBOLCECR.ARB_CONT = ' + this.trazPQRWF.selArea;
    if (this.trazPQRWF.selTipi !== undefined && this.trazPQRWF.selTipi !== 'undefined')
      filter += ' AND GN_ITEMSTIPI.ITE_CONT = ' + this.trazPQRWF.selTipi;
    if (this.trazPQRWF.selSubT !== undefined && this.trazPQRWF.selSubT !== 'undefined')
      filter += ' AND GN_ITEMSSTIP.ITE_CONT = ' + this.trazPQRWF.selSubT;
    if (this.trazPQRWF.selGrup !== undefined && this.trazPQRWF.selGrup !== 'undefined')
      filter += ' AND PQ_DPARA.DPA_CODI = ' + this.trazPQRWF.selGrup;
    if (this.trazPQRWF.inp_cont !== undefined && this.trazPQRWF.inp_cont !== '')
      filter += ' AND PQ_INPQR.INP_CONT = ' + this.trazPQRWF.inp_cont;
    if (this.trazPQRWF.cas_cont !== undefined && this.trazPQRWF.cas_cont !== '')
      filter += ' AND PQ_INPQR.CAS_CONT = ' + this.trazPQRWF.cas_cont;

    this.spinner.show();

    this._service.loadInfoTrazabilidad(this.emp_codi, moment(this.trazPQRWF.fec_inic).format('YYYY-MM-DD'),
     moment(this.trazPQRWF.fec_fina).format('YYYY-MM-DD'), filter).subscribe(resp => {
        if (resp.retorno === 0)
          this.infoTraza = resp.objTransaction;
      });

    this.spinner.hide();
  }

  verDetalle(inp_cont: number) {
    this.visibleEncabez = false;
    this.visibleDatGrid = false;
    this.visibleDetalle = true;
    this.visibleAdjunto = false;

    this._service.loadInfoPqr(this.emp_codi, inp_cont).subscribe(resp => {
      if (resp.retorno === 0)
        this.infoPqrTraza = resp.objTransaction;
    });
  }

  verAdjuntos(cas_cont: number) {

    this.gnAdjunt = [];
    this.visibleEncabez = false;
    this.visibleDatGrid = false;
    this.visibleDetalle = false;
    this.visibleAdjunto = true;

    this._service.loadInfoAdjuntosPqr(cas_cont, this.emp_codi).subscribe(resp => {
      if (resp.retorno === 0)
        this.gnAdjunt = resp.objTransaction;
    });
  }

  returnConsulta() {
    this.visibleEncabez = true;
    this.visibleDatGrid = false;
    this.visibleDetalle = false;
    this.visibleAdjunto = false;
  }

  returnDataGrid() {
    this.visibleEncabez = false;
    this.visibleDatGrid = true;
    this.visibleDetalle = false;
    this.visibleAdjunto = false;
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

  async loadCompanies() {
    this.spinner.show();
    this._gnempre.GetGnEmpre(this.usu_codi).subscribe((resp: any) => {
      this.companies = resp.objTransaction;
      this.spinner.hide();
      this._EmpreModal.present();
    });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.infoTraza, 'Trazabilidad_PQR');
 }

  download(fileName: string) {
    this._conmu.open(`download/${fileName}`);
  }
}

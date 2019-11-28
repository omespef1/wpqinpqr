import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GnempreService } from 'src/app/services/gn/gnempre.service';
import { companies, ToTransaction } from 'src/classes/models';
import { GnempreComponent } from 'src/app/components/gn/gnempre/gnempre.component';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'src/app/components/dialogs/modal/modal.component';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { PqestadService } from 'src/app/services/pq/pqestad/pqestad.service';
import { Pqestad, InfoPqEstad } from 'src/classes/pq/pqestad';
import * as moment from 'moment';
import { PieChartComponent } from 'src/app/components/charts/pie-chart/pie-chart.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pqestad',
  templateUrl: './pqestad.component.html'
})
export class PqestadComponent implements OnInit {

  @ViewChild(GnempreComponent) _EmpreModal: GnempreComponent;
  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;

  submitted = true;
  companies: companies[];
  emp_codi = 0;
  client = '';
  usu_codi = '';
  msg = '';
  showChart = false;
  filter = '';
  titulo = '';
  myForm: NgForm;

  estadisti: Pqestad = new Pqestad();

  estadSeccional: InfoPqEstad[] = [];
  estadFormRecib: InfoPqEstad[] = [];
  estadTipoDePqr: InfoPqEstad[] = [];
  estadAreaRespo: InfoPqEstad[] = [];
  estadTipificac: InfoPqEstad[] = [];
  estadSubTipifi: InfoPqEstad[] = [];
  estadGrupoPert: InfoPqEstad[] = [];

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private _gnempre: GnempreService, private route: ActivatedRoute,  private _service: PqestadService) {
   }

  async ngOnInit() {

    try {

      this.setTitle('Estadisticas PQR');
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
  this._service.loadInfoEstadisticas(this.emp_codi).subscribe(resp => {
    if (resp.retorno === 0)
      this.estadisti = resp.objTransaction;
  });

  this.spinner.hide();
}

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
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

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  async loadCompanies() {
    this.spinner.show();
    this._gnempre.GetGnEmpre(this.usu_codi).subscribe((resp: any) => {
      this.companies = resp.objTransaction;
      this.spinner.hide();
      this._EmpreModal.present();
    });
  }

  async postPqEstad(form: NgForm) {
    this.myForm = form;
    this.showChart = true;
    this.getInfoFromType('seccional', this.estadisti.selSecc).then(resp => this.estadSeccional = resp.objTransaction);
    this.getInfoFromType('formRecib', this.estadisti.selForm).then(resp => this.estadFormRecib = resp.objTransaction);
    this.getInfoFromType('tipodePqr', this.estadisti.selTpqr).then(resp => this.estadTipoDePqr = resp.objTransaction);
    this.getInfoFromType('areaRespo', this.estadisti.selArea).then(resp => this.estadAreaRespo = resp.objTransaction);
    this.getInfoFromType('tipificac', this.estadisti.selTipi).then(resp => this.estadTipificac = resp.objTransaction);
    this.getInfoFromType('subtipifi', this.estadisti.selSubT).then(resp => this.estadSubTipifi = resp.objTransaction);
    this.getInfoFromType('grupoPert', this.estadisti.selGrup).then(resp => this.estadGrupoPert = resp.objTransaction);
  }

   getInfoFromType(type: string, filter: string) {
     return this._service.loadPqEstadisticas(this.emp_codi, moment(this.estadisti.fec_inic).format('YYYY-MM-DD'),
       moment(this.estadisti.fec_fina).format('YYYY-MM-DD'), type, filter).toPromise();
   }

  returnView() {
    this.showChart = false;
    this.myForm.reset();
    this.estadSeccional = [];
    this.estadFormRecib = [];
    this.estadTipoDePqr = [];
    this.estadAreaRespo = [];
    this.estadTipificac = [];
    this.estadSubTipifi = [];
    this.estadGrupoPert = [];
  }

  transform(collection: Array<any>, property: string): Array<any> {
    // prevents the application from breaking if the array of objects doesn't exist yet
    if (!collection)
        return null;

    const groupedCollection = collection.reduce((previous, current) => {
        if (!previous[current[property]])
            previous[current[property]] = [current];
         else
            previous[current[property]].push(current);

        return previous;
    }, {});
    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }

  getSum(source: any[]) {
    if (source !== null)
     return source.reduce((sum, actual) => sum + actual.cantidad, 0);
  }

  getPercent(source: any[]) {
    if (source !== null)
      return source.reduce((sum, actual) => sum + actual.porcentaje, 0);
 }
}

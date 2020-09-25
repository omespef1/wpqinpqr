import { Component, OnInit, ViewChild } from '@angular/core';
import { EemedsaService } from 'src/app/services/ee/eemedsa.service';
import { gnItem } from 'src/classes/models';
import { Eemedsa, EeSaSec, EeSaSer, EeDeSec } from 'src/classes/ee/eemedsa';
import { NgForm } from '@angular/forms';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import * as moment from 'moment';

@Component({
  selector: 'app-eemedsa',
  templateUrl: './eemedsa.component.html',
  styles: []
})

export class EemedsaComponent implements OnInit {

  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;

  public GnItemsIteServ: gnItem[];
  fechaIni = new Date();
  fechaFin = new Date();
  PorcXServicio: Eemedsa[] = [];
  Satisfaccion: EeSaSec[] = [];
  DetalleSatis: EeDeSec[] = [];
  Oportunidad: EeSaSer[] = [];
  showChart = false;
  showSubChart = false;
  msg = '';
  ree_serv = undefined;

  constructor( private _service: EemedsaService) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.loadServicios();
  }

  loadServicios() {
    this._service.loadServiciosEncuesta().subscribe(resp => {
      this.GnItemsIteServ = resp.ObjTransaction;
    });
  }

  loadPorcXServicio() {
    this._service.loadPorcentajeXServicio(this.ree_serv, moment(this.fechaIni).format('YYYY-MM-DD'),
    moment(this.fechaFin).format('YYYY-MM-DD')).subscribe(resp => {
      this.PorcXServicio = resp.objTransaction;

      if (this.PorcXServicio === null)
        this.showAlertMesssage('No se encontraron resultados');
      else { 
        this.showChart = true;
        this.loadPorcXSeccion();
        this.loadOportunidad();
      }
    });
  }

  loadPorcXSeccion() {
    this._service.loadSatisfaccion(this.ree_serv, moment(this.fechaIni).format('YYYY-MM-DD'),
    moment(this.fechaFin).format('YYYY-MM-DD')).subscribe(resp => {
      this.Satisfaccion = resp.objTransaction;
    });
  }

  loadOportunidad() {
    this._service.loadOportunidad(this.ree_serv, moment(this.fechaIni).format('YYYY-MM-DD'),
    moment(this.fechaFin).format('YYYY-MM-DD')).subscribe(resp => {
      this.Oportunidad = resp.objTransaction;
    });
  }

  async postEeEstad(form: NgForm) {

    if (this.fechaIni > this.fechaFin) {
      this.showAlertMesssage('Fecha final debe ser mayor');
      return;
    }
    this.loadPorcXServicio();
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  getSum(source: any[]) {
    if (source !== null)
     return source.reduce((sum, actual) => sum + actual.cantidad, 0);
  }

  getPercent(source: any[]) {
    if (source !== null)
      return source.reduce((sum, actual) => sum + actual.porcentaje, 0);
 }

  returnView() {
    this.showChart = false;
    this.showSubChart = false;
    this.PorcXServicio = [];
    this.Satisfaccion = [];
    this.Oportunidad = [];
    this.clearFilter();
  }

  clearFilter() {
    this.ree_serv = undefined;
    this.fechaIni = new Date();
    this.fechaFin = new Date();
  }

  verDetalle(sec_cont: number) {
    this._service.loadSatisDetalle(sec_cont).subscribe(resp => {
      if (resp.retorno === 0) {
        this.DetalleSatis = resp.objTransaction;
        this.showSubChart = true;
      }
    });
  }
}

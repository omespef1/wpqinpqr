import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { SuconsuService } from 'src/app/services/su/suconsu.service';
import { AfiliTrab, RnRadic, ArDpil, SuHgicm } from 'src/classes/su/suconsu';
import * as moment from 'moment';
import { DatagridToolComponent } from 'src/app/components/tools/datagrid-tool/datagrid-tool.component';

@Component({
  selector: 'app-suconsu',
  templateUrl: './suconsu.component.html',
  styles: []
})
export class SuconsuComponent implements OnInit {

  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;
  @ViewChild('novedades') gridNoved: DatagridToolComponent;
  @ViewChild('aportes') gridAport: DatagridToolComponent;
  @ViewChild('subsidios') gridSubsi: DatagridToolComponent;

  ter_coda = '';
  emp_codi = 0;
  msg = '';
  rad_feci: Date;
  rad_fecf: Date;
  rpiperi: string;
  rpiperf: string;
  hgiperi: string;
  hgiperf: string;
  apo_coda = '';
  apo_razs = '';

  infoafiliatrab: AfiliTrab = new AfiliTrab();
  infoNovedades: RnRadic[] = [];
  infoAportes: ArDpil[] = [];
  infoSubsidios: SuHgicm[] = [];
  element: HTMLElement;

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private route: ActivatedRoute, private _service: SuconsuService) {
  }

  async ngOnInit() {
    this.spinner.show();
    this.setTitle('Consultas Subsidios');
    await this.GetParams();

    if (this.ter_coda)
      this.load();

    this.spinner.hide();
  }

  load() {
    this.getInfoAfilitrab();
  }

  getInfoAfilitrab() {
    this.spinner.show();
    this._service.getInfoAfilitrab(this.emp_codi, this.ter_coda).subscribe(resp => {
      if (resp.retorno === 0)
        this.infoafiliatrab = resp.objTransaction;
    });

    this.spinner.hide();
  }

  getInfoNovedades() {

    if (this.rad_feci === undefined) {
      this.showAlertMesssage('Seleccione la Fecha Inicial de Radicación');
      return;
    }

    if (this.rad_fecf === undefined) {
      this.showAlertMesssage('Seleccione la Fecha Final de Radicación');
      return;
    }

    this.infoNovedades = [];
    this.spinner.show();
    // tslint:disable-next-line:max-line-length
    this._service.getInfoNovedades(this.emp_codi, this.infoafiliatrab.afi_cont, moment(this.rad_feci).format('YYYY-MM-DD'),  moment(this.rad_fecf).format('YYYY-MM-DD')).subscribe(resp => {
      if (resp.retorno === 0) {
        this.infoNovedades = resp.objTransaction;
        this.gridNoved.render(this.infoNovedades);
      } else {
        this.showAlertMesssage(resp.txtRetorno);
        this.gridNoved.render(this.infoNovedades);
      }
    });
    this.spinner.hide();
  }

  getInfoAportes() {

    if (this.rpiperi === undefined || this.rpiperi === '') {
      this.showAlertMesssage('Seleccione Periodo Pago Inicial');
      return;
    }

    if (this.rpiperf === undefined || this.rpiperf === '') {
      this.showAlertMesssage('Seleccione Periodo Pago Final');
      return;
    }

    this.infoAportes = [];
    this.spinner.show();
    // tslint:disable-next-line:max-line-length
    this._service.getInfoAportes(this.emp_codi, this.infoafiliatrab.afi_cont, this.rpiperi, this.rpiperf, this.apo_coda, this.apo_razs).subscribe(resp => {
      if (resp.retorno === 0) {
        this.infoAportes = resp.objTransaction;
        this.gridAport.render(this.infoAportes);
      } else {
        this.showAlertMesssage(resp.txtRetorno);
        this.gridAport.render(this.infoAportes);
      }
    });
    this.spinner.hide();
  }

  getInfoSubsidios() {

    if (this.hgiperi === undefined || this.hgiperi === '') {
      this.showAlertMesssage('Seleccione Periodo Pago Inicial');
      return;
    }

    if (this.hgiperf === undefined || this.hgiperf === '') {
      this.showAlertMesssage('Seleccione Periodo Pago Final');
      return;
    }

    this.infoSubsidios = [];
    this.spinner.show();
    // tslint:disable-next-line:max-line-length
    this._service.getInfoSubsidios(this.emp_codi, this.hgiperi, this.hgiperf, this.infoafiliatrab.afi_docu).subscribe(resp => {
      if (resp.retorno === 0) {
        this.infoSubsidios = resp.objTransaction;
        this.gridSubsi.render(this.infoSubsidios);
      } else {
        this.showAlertMesssage(resp.txtRetorno);
        this.gridSubsi.render(this.infoSubsidios);
      }
    });
    this.spinner.hide();
  }

  printReportAportes() {
    try {
      this._service.printAportes(this.emp_codi, this.rpiperi, this.rpiperf, this.infoafiliatrab.afi_docu).subscribe(resp => {
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

  printReportSubsidios() {
    try {
       this._service.printSubsidio(this.emp_codi, this.hgiperi, this.hgiperf, this.infoafiliatrab.afi_docu).subscribe(resp => {
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

  GetParams() {
    try {
      this.route.queryParamMap.subscribe(queryParams => {

        if (queryParams.get('usu_codi') != null)
          this.ter_coda = atob(queryParams.get('usu_codi'));

        if (queryParams.get('emp_codi') != null)
          this.emp_codi = Number(atob(queryParams.get('emp_codi')));

      });
    } catch (err) {
      this.showAlertMesssage(err);
    }
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  setPeriodoInicial(event, dp: any) {
    dp.close();
    this.rpiperi = event;
    this.rpiperi  = moment(this.rpiperi).format('YYYY-MM');
    this.element = document.getElementById('rpi_peri') as HTMLElement;
    this.element.focus();
  }

  setPeriodoFinal(event, dp: any) {
    dp.close();
    this.rpiperf = event;
    this.rpiperf  = moment(this.rpiperf).format('YYYY-MM');
    document.getElementById('rpi_perf').focus();
  }

  setPeriodoInici(event, dp: any) {
    dp.close();
    this.hgiperi = event;
    this.hgiperi  = moment(this.hgiperi).format('YYYY-MM');
    this.element = document.getElementById('hgi_peri') as HTMLElement;
    this.element.focus();
  }

  setPeriodoFin(event, dp: any) {
    dp.close();
    this.hgiperf = event;
    this.hgiperf  = moment(this.hgiperf).format('YYYY-MM');
    document.getElementById('hgi_perf').focus();
  }

}

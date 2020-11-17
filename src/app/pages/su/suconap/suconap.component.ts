import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { DatagridToolComponent } from 'src/app/components/tools/datagrid-tool/datagrid-tool.component';
import { NewTableSearchComponent } from 'src/app/components/tools/new-table-search/new-table-search.component';
import { GntipdoService } from 'src/app/services/gn/gntipdo.service';
import { SuconapService } from 'src/app/services/su/suconap.service';
import { ArApovoInfo, ArRdevo, RnRadic } from 'src/classes/su/suconap';
import { AfiliTrab } from 'src/classes/su/suconap';
import * as moment from 'moment';
import { ArDpil, SuHgicm } from 'src/classes/su/suconap';

@Component({
  selector: 'app-suconap',
  templateUrl: './suconap.component.html',
  styles: []
})
export class SuconapComponent implements OnInit {
  element: HTMLElement;
  apo_coda = '';
  emp_codi = 0;
  msg = '';
  rad_feci: Date;
  rad_fecf: Date;
  rad_feci_trab: Date;
  rad_fecf_trab: Date;
  tip_codi_trab: number;
  tip_nomb_trab: string;
  afi_docu_trab: string;
  rpiperi: string;
  rpiperf: string;
  tip_codi_apor_trab: number;
  tip_nomb_apor_trab: string;
  afi_docu_apor_trab: string;
  tip_codi_subs_trab: number;
  tip_nomb_subs_trab: string;
  afi_docu_subs_trab: string;
  hgiperi: string;
  hgiperf: string;
  rpiperiemp: string;
  rpiperfemp: string;
  rpiperifis: string;
  radfecidev: Date;
  radfecfdev: Date;
  hgiperisub: string;
  hgiperfsub: string;

  arapovoinfo: ArApovoInfo = new ArApovoInfo();
  infoafiliatrab: AfiliTrab = new AfiliTrab();
  infoNovedades: RnRadic[] = [];
  infoNovedTrab: RnRadic[] = [];
  infoAportes: ArDpil[] = [];
  infoSubsidios: SuHgicm[] = [];
  infoAportesEmp: ArDpil[] = [];
  infoAportesFis: ArDpil[] = [];
  infoDevoluciones: RnRadic[] = [];
  detalleDevolucion: ArRdevo = new ArRdevo();
  infoSubsidiosEmp: SuHgicm[] = [];

  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;
  @ViewChild('sucursal') gridSucursal: DatagridToolComponent;
  @ViewChild('grupoFam') gridSuPerca: DatagridToolComponent;
  @ViewChild('novedades') gridNoved: DatagridToolComponent;
  @ViewChild('aportes') gridAport: DatagridToolComponent;
  @ViewChild('subsidios') gridSubsi: DatagridToolComponent;
  @ViewChild('aportesEmpresa') gridAportEmp: DatagridToolComponent;
  @ViewChild('aportesFiscal') gridAportFis: DatagridToolComponent;
  @ViewChild('novedadesTrab') gridNovedTrab: DatagridToolComponent;
  @ViewChild('subsidiosEmp') gridSubsiEmp: DatagridToolComponent;

  @ViewChild('modalTipDocu') _TableTipDo: NewTableSearchComponent;
  @ViewChild('modalTipDocuTra') _TableTipDoTra: NewTableSearchComponent;
  @ViewChild('modalTipDocuApoTra') _TableTipDoApoTra: NewTableSearchComponent;
  @ViewChild('modalTipDocuSubTra') _TableTipDoSubTra: NewTableSearchComponent;

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private route: ActivatedRoute, private _service: SuconapService, private _gntipdo: GntipdoService) {
  }

  async ngOnInit() {
    this.spinner.show();
    this.setTitle('Consultas Aportes');
    await this.GetParams();

    if (this.apo_coda)
      this.load();

    this.spinner.hide();
  }

  load() {
    this.getInfoArApovo();
  }

  getInfoArApovo() {
    this.spinner.show();
    this._service.getInfoArApovo(this.emp_codi, this.apo_coda).subscribe(resp => {
      if (resp.retorno === 0) {
        this.arapovoinfo = resp.objTransaction;
        this.gridSucursal.render(this.arapovoinfo.arsucurinfo);
      }
    });

    this.spinner.hide();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  GetParams() {
    try {
      this.route.queryParamMap.subscribe(queryParams => {

        if (queryParams.get('usu_codi') != null)
          this.apo_coda = atob(queryParams.get('usu_codi'));

        if (queryParams.get('emp_codi') != null)
          this.emp_codi = Number(atob(queryParams.get('emp_codi')));

      });
    } catch (err) {
      this.showAlertMesssage(err);
    }
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  lupaTipoDocumentoTra() {
    this.spinner.show();
    this._gntipdo.GetGnTipdo().subscribe(resp => {
      if (resp.Retorno === 0) {
        this._TableTipDoTra.btnModalQb = 'btnTipDocuTra';
        this._TableTipDoTra.ModalQb = 'modalTipDocuTra';
        this._TableTipDoTra.render(resp.ObjTransaction);
        this._TableTipDoTra.show();
      }
    });
    this.spinner.hide();
  }

  setTipDoctoTra(rowSelected: any) {
    this.tip_codi_trab = rowSelected.TIP_CODI;
    this.tip_nomb_trab = rowSelected.TIP_NOMB;
  }

  lupaTipoDocumentoApoTra() {
    this.spinner.show();
    this._gntipdo.GetGnTipdo().subscribe(resp => {
      if (resp.Retorno === 0) {
        this._TableTipDoApoTra.btnModalQb = 'btnTipDocuApoTra';
        this._TableTipDoApoTra.ModalQb = 'modalTipDocuApoTra';
        this._TableTipDoApoTra.render(resp.ObjTransaction);
        this._TableTipDoApoTra.show();
      }
    });
    this.spinner.hide();
  }

  setTipDoctoApoTra(rowSelected: any) {
    this.tip_codi_apor_trab = rowSelected.TIP_CODI;
    this.tip_nomb_apor_trab = rowSelected.TIP_NOMB;
  }

  lupaTipoDocumentoSubTra() {
    this.spinner.show();
    this._gntipdo.GetGnTipdo().subscribe(resp => {
      if (resp.Retorno === 0) {
        this._TableTipDoSubTra.btnModalQb = 'btnTipDocuSubTra';
        this._TableTipDoSubTra.ModalQb = 'modalTipDocuSubTra';
        this._TableTipDoSubTra.render(resp.ObjTransaction);
        this._TableTipDoSubTra.show();
      }
    });
    this.spinner.hide();
  }

  setTipDoctoSubTra(rowSelected: any) {
    this.tip_codi_subs_trab = rowSelected.TIP_CODI;
    this.tip_nomb_subs_trab = rowSelected.TIP_NOMB;
  }

  lupaTipoDocumento() {
    this.spinner.show();
    this._gntipdo.GetGnTipdo().subscribe(resp => {
      if (resp.Retorno === 0) {
        this._TableTipDo.btnModalQb = 'btnTipDocu';
        this._TableTipDo.ModalQb = 'modalTipDocu';
        this._TableTipDo.render(resp.ObjTransaction);
        this._TableTipDo.show();
      }
    });
    this.spinner.hide();
  }

  setTipDocto(rowSelected: any) {
    this.infoafiliatrab.tip_codi = rowSelected.TIP_CODI;
    this.infoafiliatrab.tip_nomb = rowSelected.TIP_NOMB;
  }

  getInfoAfilitrab() {

    if (this.infoafiliatrab.tip_codi === undefined) {
      this.showAlertMesssage('Seleccione El tipo de Documento');
      return;
    }

    if (this.infoafiliatrab.afi_docu === undefined || this.infoafiliatrab.afi_docu === '') {
      this.showAlertMesssage('Digite el Número de Documento');
      return;
    }

    this.spinner.show();
    // tslint:disable-next-line:max-line-length
    this._service.getInfoAfilitrab(this.emp_codi, this.infoafiliatrab.tip_codi, this.infoafiliatrab.afi_docu, this.arapovoinfo.apo_cont).subscribe(resp => {
      if (resp.retorno === 0) {
        this.infoafiliatrab = resp.objTransaction;
        this.gridSuPerca.render(this.infoafiliatrab.superca);
      } else {
        this.infoafiliatrab = new AfiliTrab();
        this.showAlertMesssage(resp.txtRetorno);
      }
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
    this._service.getInfoNovedades(this.emp_codi, this.arapovoinfo.apo_coda, moment(this.rad_feci).format('YYYY-MM-DD'),  moment(this.rad_fecf).format('YYYY-MM-DD')).subscribe(resp => {
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

  getInfoNovedadesTrab() {

    if (this.rad_feci_trab === undefined && this.rad_fecf_trab === undefined
      && this.tip_codi_trab === undefined && this.afi_docu_trab === undefined) {
      this.showAlertMesssage('Debe Digitar Información en los Filtros');
      return;
    }

    if (this.rad_feci_trab === undefined && this.rad_fecf_trab === undefined) {
      if (this.tip_codi_trab === undefined || this.afi_docu_trab === undefined) {
        this.showAlertMesssage('Debe Digitar Información en tipo de Identificación y Documento');
        return;
      }
    }

    if (this.tip_codi_trab === undefined && this.afi_docu_trab === undefined) {
      if (this.rad_feci_trab === undefined || this.rad_fecf_trab === undefined) {
        this.showAlertMesssage('Debe Seleccionar Fecha Inicial y Fecha Final');
        return;
      }
    }

    this.infoNovedTrab = [];
    this.spinner.show();

    let feci = '';
    let fecf = '';

    if (this.rad_feci_trab !== undefined)
      feci = moment(this.rad_feci_trab).format('YYYY-MM-DD');

    if (this.rad_fecf_trab !== undefined)
      fecf = moment(this.rad_fecf_trab).format('YYYY-MM-DD');

    // tslint:disable-next-line:max-line-length
    this._service.getInfoNovedadesTrab(this.emp_codi, this.tip_codi_trab, this.afi_docu_trab, feci,  fecf, this.arapovoinfo.apo_coda).subscribe(resp => {
      if (resp.retorno === 0) {
        this.infoNovedTrab = resp.objTransaction;
        this.gridNovedTrab.render(this.infoNovedTrab);
      } else {
        this.showAlertMesssage(resp.txtRetorno);
        this.gridNovedTrab.render(this.infoNovedTrab);
      }
    });

    this.spinner.hide();
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

  getInfoAportes() {

    if (this.tip_codi_apor_trab === undefined || this.tip_codi_apor_trab === 0) {
      this.showAlertMesssage('Seleccione Tipo de Documento');
      return;
    }

    if (this.afi_docu_apor_trab === undefined || this.afi_docu_apor_trab === '') {
      this.showAlertMesssage('Digite Número de Documento');
      return;
    }

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
    this._service.getInfoAportesTrab(this.emp_codi, this.apo_coda, this.rpiperi, this.rpiperf, this.afi_docu_apor_trab, this.tip_codi_apor_trab).subscribe(resp => {
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

  sethgiperi(event, dp: any) {
    dp.close();
    this.hgiperi = event;
    this.hgiperi  = moment(this.hgiperi).format('YYYY-MM');
    this.element = document.getElementById('hgi_peri') as HTMLElement;
    this.element.focus();
  }

  sethgiperf(event, dp: any) {
    dp.close();
    this.hgiperf = event;
    this.hgiperf  = moment(this.hgiperf).format('YYYY-MM');
    document.getElementById('hgi_perf').focus();
  }

  getInfoSubsidios() {

    if (this.tip_codi_subs_trab === undefined || this.tip_codi_subs_trab === 0) {
      this.showAlertMesssage('Seleccione Tipo de Documento');
      return;
    }

    if (this.afi_docu_subs_trab === undefined || this.afi_docu_subs_trab === '') {
      this.showAlertMesssage('Digite Número de Documento');
      return;
    }

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
    this._service.getInfoSubsidiosTrab(this.emp_codi, this.apo_coda, this.hgiperi, this.hgiperf, this.afi_docu_subs_trab, this.tip_codi_subs_trab).subscribe(resp => {
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

  setPeriodoInicialEmp(event, dp: any) {
    dp.close();
    this.rpiperiemp = event;
    this.rpiperiemp  = moment(this.rpiperiemp).format('YYYY-MM');
    this.element = document.getElementById('rpi_peri_emp') as HTMLElement;
    this.element.focus();
  }

  setPeriodoFinalEmp(event, dp: any) {
    dp.close();
    this.rpiperfemp = event;
    this.rpiperfemp  = moment(this.rpiperfemp).format('YYYY-MM');
    document.getElementById('rpi_perf_emp').focus();
  }

  getInfoAportesEmpresa() {
    if (this.rpiperiemp === undefined || this.rpiperiemp === '') {
      this.showAlertMesssage('Seleccione Periodo Pago Inicial');
      return;
    }

    if (this.rpiperfemp === undefined || this.rpiperfemp === '') {
      this.showAlertMesssage('Seleccione Periodo Pago Final');
      return;
    }

    this.infoAportesEmp = [];
    this.spinner.show();
    // tslint:disable-next-line:max-line-length
    this._service.getInfoAportesEmp(this.emp_codi, this.apo_coda, this.rpiperiemp, this.rpiperfemp).subscribe(resp => {
      if (resp.retorno === 0) {
        this.infoAportesEmp = resp.objTransaction;
        this.gridAportEmp.render(this.infoAportesEmp);
      } else {
        this.showAlertMesssage(resp.txtRetorno);
        this.gridAportEmp.render(this.infoAportesEmp);
      }
    });
    this.spinner.hide();
  }

  setPeriodoFiscal(event, dp: any) {
    dp.close();
    this.rpiperifis = event;
    this.rpiperifis  = moment(this.rpiperifis).format('YYYY');
    this.element = document.getElementById('rpi_peri_fis') as HTMLElement;
    this.element.focus();
  }

  getInfoAportesFiscal() {
    if (this.rpiperifis === undefined || this.rpiperiemp === '') {
      this.showAlertMesssage('Seleccione Periodo Pago Inicial');
      return;
    }

    this.infoAportes = [];
    this.spinner.show();
    // tslint:disable-next-line:max-line-length
    this._service.getInfoAportesFiscal(this.emp_codi, this.rpiperifis, this.apo_coda ).subscribe(resp => {
      if (resp.retorno === 0) {
        this.infoAportesFis = resp.objTransaction;
        this.gridAportFis.render(this.infoAportesFis);
      } else {
        this.showAlertMesssage(resp.txtRetorno);
        this.gridAportFis.render(this.infoAportesFis);
      }
    });
    this.spinner.hide();
  }

  getInfoDevoluciones() {
    if (this.radfecidev === undefined) {
      this.showAlertMesssage('Seleccione la Fecha Inicial de Radicación');
      return;
    }

    if (this.radfecfdev === undefined) {
      this.showAlertMesssage('Seleccione la Fecha Final de Radicación');
      return;
    }

    this.infoDevoluciones = [];
    this.spinner.show();
    // tslint:disable-next-line:max-line-length
    this._service.getInfoDevoluciones(this.emp_codi, this.arapovoinfo.apo_coda, moment(this.radfecidev).format('YYYY-MM-DD'),  moment(this.radfecfdev).format('YYYY-MM-DD')).subscribe(resp => {
      if (resp.retorno === 0)
        this.infoDevoluciones = resp.objTransaction;
      else
        this.showAlertMesssage(resp.txtRetorno);
    });

    this.spinner.hide();
  }

  showDetalleDevo(rad_cont: number) {
    this._service.getInfoDetalleDevolucion(this.emp_codi, rad_cont).subscribe(resp => {
      if (resp.retorno === 0) {
        this.detalleDevolucion = resp.objTransaction;
        document.getElementById('btnModalDevoluciones').click();
      } else
        this.showAlertMesssage(resp.txtRetorno);
    });
  }

  getInfoSubsidiosEmp() {

    if (this.hgiperisub === undefined || this.hgiperisub === '') {
      this.showAlertMesssage('Seleccione Periodo Pago Inicial');
      return;
    }

    if (this.hgiperfsub === undefined || this.hgiperfsub === '') {
      this.showAlertMesssage('Seleccione Periodo Pago Final');
      return;
    }

    this.infoSubsidiosEmp = [];
    this.spinner.show();
    // tslint:disable-next-line:max-line-length
    this._service.getInfoSubsidiosEmp(this.emp_codi, this.apo_coda, this.hgiperisub, this.hgiperfsub).subscribe(resp => {
      if (resp.retorno === 0) {
        this.infoSubsidiosEmp = resp.objTransaction;
        this.gridSubsiEmp.render(this.infoSubsidiosEmp);
      } else {
        this.showAlertMesssage(resp.txtRetorno);
        this.gridSubsiEmp.render(this.infoSubsidiosEmp);
      }
    });
    this.spinner.hide();
  }

  sethgiperiSub(event, dp: any) {
    dp.close();
    this.hgiperisub = event;
    this.hgiperisub  = moment(this.hgiperisub).format('YYYY-MM');
    this.element = document.getElementById('hgi_peri_sub') as HTMLElement;
    this.element.focus();
  }

  sethgiperfSub(event, dp: any) {
    dp.close();
    this.hgiperfsub = event;
    this.hgiperfsub  = moment(this.hgiperfsub).format('YYYY-MM');
    document.getElementById('hgi_perf_sub').focus();
  }

  printReportAportes() {
    try {
      // tslint:disable-next-line:max-line-length
      this._service.printReportAportes(this.emp_codi, this.apo_coda, this.rpiperi, this.rpiperf, this.afi_docu_apor_trab, this.tip_codi_apor_trab).subscribe(resp => {
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

  printReportSubsidio() {
    try {
      // tslint:disable-next-line:max-line-length
      this._service.printReportSubsidio(this.emp_codi, this.apo_coda, this.hgiperi, this.hgiperf, this.afi_docu_subs_trab, this.tip_codi_subs_trab).subscribe(resp => {
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

  printReportAportesEmpresa() {
    try {
      // tslint:disable-next-line:max-line-length
      this._service.printReportAportesEmpresa(this.emp_codi, this.apo_coda, this.rpiperiemp, this.rpiperfemp).subscribe(resp => {
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

  printReportAportesFiscal() {
    try {
      // tslint:disable-next-line:max-line-length
      this._service.printReportAportesFiscal(this.emp_codi, this.rpiperifis, this.apo_coda).subscribe(resp => {
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

  printReportSubsidioEmpresa() {
    try {
      // tslint:disable-next-line:max-line-length
      this._service.printReportSubsidioEmpresa(this.emp_codi, this.apo_coda, this.hgiperisub, this.hgiperfsub).subscribe(resp => {
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
}

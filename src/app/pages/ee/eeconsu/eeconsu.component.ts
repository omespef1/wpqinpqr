import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewTableSearchComponent } from 'src/app/components/tools/new-table-search/new-table-search.component';
import { EeconsuService } from 'src/app/services/ee/eeconsu.service';
import * as moment from 'moment';
import { ComunicationsService } from 'src/services/comunications.service';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';

@Component({
  selector: 'app-eeconsu',
  templateUrl: './eeconsu.component.html',
  styles: []
})
export class EeconsuComponent implements OnInit {

  msg = '';
  showDetail = false;
  eeconsu: any[] = [];
  faclien: any[] = [];
  gnAdjunt: any[];
  fechaIni = new Date();
  fechaFin = new Date();
  ite_cont = 0;
  ite_codi: string;
  ite_nomb: string;
  cli_coda = '';
  cli_nomb: string;

  @ViewChild('modalServicio') _tableServicio: NewTableSearchComponent;
  @ViewChild('modalCliente') _tableCliente: NewTableSearchComponent;
  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private route: ActivatedRoute, private _service: EeconsuService, private _conmu: ComunicationsService) {

  }

  ngOnInit() {
    this.loafInfoClientes();
  }

  getEeConsu() {
    this.spinner.show();
    this._service.loadInfoEereles(moment(this.fechaIni).format('YYYY-MM-DD'),
      moment(this.fechaFin).format('YYYY-MM-DD'), this.ite_cont, this.cli_coda).subscribe(resp => {
        console.log(resp);
        this.eeconsu = resp.objTransaction;
        if (this.eeconsu != null)
          this.showDetail = true;
        else
        this.showAlertMesssage('No se encontraron encuestas con los parámetros enviados.');
      });
    this.spinner.hide();
  }

  volver() {
    this.showDetail = false;
  }

  getServicio() {
    this.spinner.show();
    this._service.loadServicio().subscribe(resp => {
      if (resp.Retorno === 0) {
        this._tableServicio.btnModalQb = 'btnServicio';
        this._tableServicio.ModalQb = 'modalServicio';
        this._tableServicio.render(resp.ObjTransaction);
        this._tableServicio.show();
      }
    });
    this.spinner.hide();
  }

  loafInfoClientes() {
    this.spinner.show();
    this._service.loadCliente().subscribe(resp => {
      if (resp.retorno === 0) {
        this.faclien = resp.objTransaction;
      }
    });
    this.spinner.hide();
  }

  getCliente() {
    this.spinner.show();
    this._tableCliente.btnModalQb = 'btnCliente';
    this._tableCliente.ModalQb = 'modalCliente';
    this._tableCliente.render(this.faclien);
    this._tableCliente.show();
    this.spinner.hide();
  }

  setServicio(rowSelected: any) {
    this.ite_cont = rowSelected.ite_cont;
    this.ite_codi = rowSelected.ite_codi;
    this.ite_nomb = rowSelected.ite_nomb;
  }

  setCliente(rowSelected: any) {
    this.cli_coda = rowSelected.cli_coda;
    this.cli_nomb = rowSelected.cli_nomb;
  }

  verAdjuntos(rem_cont: number, emp_codi: number) {
    this.spinner.show();
    this.gnAdjunt = [];
    let rad_llav = '';
    rad_llav = emp_codi.toString() + rem_cont.toString();

    this._service.loadInfoAdjun(rad_llav, emp_codi).subscribe(resp => {
      if (resp.retorno === 0) {
        this.gnAdjunt = resp.objTransaction;
        if (this.gnAdjunt.length > 0)
          document.getElementById('btnModalProductos').click();
        else
          this.showAlertMesssage('La encuesta no tiene archivos adjuntos.');
      } else {
        this.showAlertMesssage('La encuesta no tiene archivos adjuntos.');
      }
    });

    this.spinner.hide();
  }

  open(rel_serv: number, rem_cont: number, emp_codi: number) {
    let url = window.location.origin + '/eereles';
    // tslint:disable-next-line:max-line-length
    url += '?rel_serv=' + this.revEncode(rel_serv) + '&emp_codi=' +  this.revEncode(emp_codi) + '&rem_cont=' +  this.revEncode(rem_cont) + '&red_encu=' +  this.revEncode('N');
    window.open(url, '_blank');
  }

  revEncode(param: any) {
    return btoa(param);
  }

  download(fileName: string) {
    this._conmu.open(`download/${fileName}`);
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  limpiarFiltro() {
    this.fechaIni = new Date();
    this.fechaFin = new Date();
    this.ite_cont = 0;
    this.ite_codi = '';
    this.ite_nomb = '';
    this.ite_cont = 0;
    this.ite_codi = '';
    this.ite_nomb = '';
  }

}

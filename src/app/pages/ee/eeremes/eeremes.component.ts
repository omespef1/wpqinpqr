import { Component, OnInit, ViewChild } from '@angular/core';
import { EeremesService } from 'src/app/services/ee/eeremes.service';
import { NewTableSearchComponent } from 'src/app/components/tools/new-table-search/new-table-search.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { Eeremes } from 'src/classes/ee/eeremes';
import { ToTransaction } from 'src/classes/gn/toTransaction';
import { gnItem } from 'src/classes/models';
import { Eereenc } from 'src/classes/ee/eereenc';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-eeremes',
  templateUrl: './eeremes.component.html',
  styleUrls: ['./eeremes.component.css']
})
export class EeremesComponent implements OnInit {

  msg = '';

  @ViewChild('modalTipoDocto') _tableTipoDocto: NewTableSearchComponent;
  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;

  public faclien: Eeremes = new Eeremes();
  public eereenc: Eereenc = new Eereenc();
  public GnItemsIteServ: gnItem[];
  public GnItemsIteFoRe: gnItem[];

  constructor( private _service: EeremesService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loadItems();
  }

  getTipoDocumento() {
    this._service.loadInfoTipoDocto().subscribe(resp => {
        this._tableTipoDocto.btnModalQb = 'btnTipoDocto';
        this._tableTipoDocto.ModalQb = 'modalTipoDocto';
        this._tableTipoDocto.render(resp);
        this._tableTipoDocto.show();
    });
  }

  getInfoClien() {
    this.spinner.show();

    if (this.eereenc.cli_coda === '')
      this.showAlertMesssage('Digite un número de documento.');
    else
      this._service.loadInfoFaClien(0, this.eereenc.cli_coda).subscribe(resp => {
        if (resp.retorno === 0)
          this.faclien = resp.objTransaction;
        else {
          this.showAlertMesssage(resp.txtRetorno);
          this.eereenc.cli_coda = '';
        }
      });
    this.spinner.hide();
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  loadItems() {
      this.loadServicios();
      this.loadMetodosRec();
  }

  loadServicios() {
    this.spinner.show();
    this._service.loadServiciosEncuesta().subscribe(resp => {
      this.GnItemsIteServ = resp.ObjTransaction;
    });
    this.spinner.hide();
  }

  loadMetodosRec() {
    this.spinner.show();
    this._service.loadMetodosRecoleccion().subscribe(resp => {
      this.GnItemsIteFoRe = resp.ObjTransaction;
    });
    this.spinner.hide();
  }

  clearForm() {
    this.faclien = new Eeremes();
    this.eereenc = new Eereenc();
    this.loadItems();
  }

  revEncode(rev_cont: any) {

    if (rev_cont !== undefined)
      return btoa(rev_cont);
  }

  insertInfoMedicion() {
    this.topFunction();
    this.spinner.show();
    this._service.saveInfoMedicion(this.eereenc).subscribe(resp => {
      if (resp.retorno === 0)
       this.clearForm();
      else
        this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  actualizarPolitica() {
    this.spinner.show();
    this._service.actualizarPolitica(this.eereenc.cli_coda).subscribe(resp => {
      if (resp.retorno === 0)
       this.showAlertMesssage('Autorización de tratamiento de Datos Modificada Correctamente.');
      else
        this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
  }
}

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
import {Router} from '@angular/router';

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
  public rem_cont = '';

  constructor( private _service: EeremesService, private spinner: NgxSpinnerService, private router: Router) { }

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

  revEncode(data: any) {
    if (data !== undefined)
      return btoa(data);
  }

  insertInfoMedicion() {
    this.topFunction();
    this.spinner.show();
    this._service.saveInfoMedicion(this.eereenc).subscribe(resp => {
      if (resp.retorno === 0) {
        this.rem_cont = resp.txtRetorno;
        const relServ = this.revEncode(this.eereenc.ree_serv);
        const empCodi = this.revEncode(0);
        const remCont = this.revEncode(this.rem_cont);
        this.clearForm();
        // tslint:disable-next-line:max-line-length
        this.router.navigateByUrl('/eereles?rel_serv=' + relServ + '&emp_codi=' + empCodi + '&rem_cont=' + remCont);
      } else
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

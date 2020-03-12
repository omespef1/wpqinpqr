import { Component, OnInit, ViewChild } from '@angular/core';
import { EeremesService } from 'src/app/services/ee/eeremes.service';
import { NewTableSearchComponent } from 'src/app/components/tools/new-table-search/new-table-search.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { Eeremes } from 'src/classes/ee/eeremes';
import { ToTransaction } from 'src/classes/gn/toTransaction';
import { gnItem } from 'src/classes/models';

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
  public GnItemsIteServ: gnItem[];
  public GnItemsIteFoRe: gnItem[];

  constructor( private _service: EeremesService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
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
    this._service.loadInfoFaClien(0, '88284896').subscribe(resp => {
    if (resp.retorno === 0) {
      this.faclien = resp.objTransaction;
      this.loadItems();
    } else
      this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  loadItems() {
    this.loadServicios();
    this.loadItems();
  }

  loadServicios() {
    this.spinner.show();
    this._service.loadServiciosEncuesta().subscribe(resp => {
    if (resp.retorno === 0)
      this.GnItemsIteServ = resp.objTransaction;
    else
      this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
  }

  loadMetodosRec() {
    this.spinner.show();
    this._service.loadServiciosEncuesta().subscribe(resp => {
    if (resp.retorno === 0)
      this.GnItemsIteServ = resp.objTransaction;
    else
      this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { GnempreComponent } from 'src/app/components/gn/gnempre/gnempre.component';
import { companies } from 'src/classes/models';
import { NewTableSearchComponent } from 'src/app/components/tools/new-table-search/new-table-search.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { GnempreService } from 'src/app/services/gn/gnempre.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { GntipdoService } from 'src/app/services/gn/gntipdo.service';
import { Sfconsu, SuAfili } from 'src/classes/sf/sfconsu';
import { SfConsuService } from 'src/app/services/sf/sfconsu.service';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';

@Component({
  selector: 'app-sfconsu',
  templateUrl: './sfconsu.component.html',
  styles: []
})
export class SfconsuComponent implements OnInit {
  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;
  @ViewChild(GnempreComponent) _EmpreModal: GnempreComponent;
  @ViewChild('modalTipDocu') _TableTipDo: NewTableSearchComponent;
  msg = '';
  emp_codi = 0;
  usu_codi = '';
  companies: companies[];
  showDetail = false;

  sfconsu: Sfconsu = new Sfconsu();
  suafili: SuAfili = new SuAfili();

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private route: ActivatedRoute, private _gnempre: GnempreService, private _gntipdo: GntipdoService,  
    private _sfConsu: SfConsuService ) {
  }

  ngOnInit() {
    this.spinner.show();
    this.setTitle('FOVIS');
    this.GetParams();

    if (this.usu_codi)
      this.loadCompanies();
    else
      this.showAlertMesssage('Acceso Denegado.');

    this.spinner.hide();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  async GetParams() {
    try {

        this.route.queryParamMap.subscribe(queryParams => {
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

  getSfConsu() {
    this.spinner.show();
    this._sfConsu.loadInitInfo(this.sfconsu, this.emp_codi).subscribe(resp => {
      if (resp.retorno === 0) {
        this.suafili = resp.objTransaction;
        this.showDetail = true;
      } else
       this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
  }

  GetGnTipdo() {
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

  SetGnTipdo(rowSelected: any) {
    this.sfconsu.tip_codi = rowSelected.TIP_CODI;
    this.sfconsu.tip_nomb = rowSelected.TIP_NOMB;
  }

  volver() {
    this.showDetail = false;
    this.sfconsu = new Sfconsu();
    this.suafili = new SuAfili();
  }
}

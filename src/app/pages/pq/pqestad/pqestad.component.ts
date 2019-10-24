import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GnempreService } from 'src/app/services/gn/gnempre.service';
import { companies } from 'src/classes/models';
import { GnempreComponent } from 'src/app/components/gn/gnempre/gnempre.component';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Gnitems } from 'src/classes/gn/gnitems';
import { Gnarbol } from 'src/classes/gn/gnarbol';
import { ModalComponent } from 'src/app/components/dialogs/modal/modal.component';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { LoadedRouterConfig } from '@angular/router/src/config';
import { PqestadService } from 'src/app/services/pq/pqestad/pqestad.service';
import { Pqestad } from 'src/classes/pq/pqestad';

@Component({
  selector: 'app-pqestad',
  templateUrl: './pqestad.component.html'
})
export class PqestadComponent implements OnInit {

  @ViewChild(GnempreComponent) _EmpreModal: GnempreComponent;
  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;

  companies: companies[];
  emp_codi = 0;
  client = '';
  usu_codi = '';
  msg = '';

  estadisti: Pqestad = new Pqestad();

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer,
    private titleService: Title,  private _gnempre: GnempreService, private route: ActivatedRoute,  private _service: PqestadService) {
   }

  async ngOnInit() {
    try {

      this.setTitle('Creación de Proponentes');
      this.GetParams();

      if (this.client) {

        this.loadCompanies();

        if (this.emp_codi) {
          this.load();
        }

      } else {
        this.showAlertMesssage('Acceso Denegado.');
      }

    } catch ( err ) {
      this.showAlertMesssage(err);
    }
  }

load() {

  this.spinner.show();
  this._service.loadInfoEstadisticas(this.emp_codi).subscribe(resp => {
    if (resp.retorno === 0) {
      this.estadisti = resp.objTransaction;
      console.log(this.estadisti);
    }
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

        if (queryParams.get('client') != null) {
          this.client = atob(queryParams.get('client'));
        }

        if (queryParams.get('usu_codi') != null) {
          this.usu_codi = atob(queryParams.get('usu_codi'));
        }
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
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Ctpropo } from 'src/classes/ct/ctpropo';
import { AlertComponent } from '../../alert/alert.component';
import { ComunicationsService } from 'src/services/comunications.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Ctconsu } from 'src/classes/ct/ctconsu';
import { ModalComponent } from '../../dialogs/modal/modal.component';
import { companies } from 'src/classes/models';

@Component({
  selector: 'app-ctconsu',
  templateUrl: './ctconsu.component.html',
  styleUrls: ['./ctconsu.component.css']
})
export class CtconsuComponent implements OnInit {

  @ViewChild(AlertComponent) alert: AlertComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;

  consu: Ctconsu = new Ctconsu();
  propo: Ctpropo = new Ctpropo();
  submitted = false;
  message: string;
  ctrevpr: Ctconsu[] = [];
  companies: companies[];
  msg = '';

  // tslint:disable-next-line:max-line-length
  constructor(private _conmu: ComunicationsService, private spinner: NgxSpinnerService, private route: ActivatedRoute, private titleService: Title) {
  }

  async ngOnInit() {
    await this.GetParams();
  }

  GetParams(): boolean {
    try {
      this.route.queryParamMap.subscribe(queryParams => {
        if (queryParams.get('usu_codi') != null) {
        this.propo.usu_codi = atob(queryParams.get('usu_codi'));

        if (this.propo.usu_codi !== '') {
          this.loadCompanies();
        }
      } else {
        this.showAlertMesssage('Acceso denegado.');
      }
      return true;
    }, err => {
      return false;
    });
    } catch ( err ) {
      return false;
    }
  }

   postConsu() {
      this.GetInfoCtRevpr();
    }

    async GetInfoCtRevpr() {

      this.spinner.show();
      this._conmu.Get(`api/CtConsu/CtConsuLoad?rev_esta=${this.propo.rev_esta}&pro_codi=${this.propo.pro_codi}
      &pro_nomb=${this.propo.pro_nomb}`, this.propo.emp_codi).subscribe((resp: any) => {
        this.ctrevpr = resp.objTransaction;
        this.spinner.hide();
        if (this.ctrevpr == null) {
          this.showAlertMesssage('No se encontraron datos con los parámetros enviados.');
        }

      });
    }

    showAlertMesssage(msg: string) {
      this.msg = msg;
      this.alert.show();
    }

    revEncode(rev_cont: string) {
      return btoa(rev_cont);
    }

    loadCompanies() {
      this.spinner.show();
      this._conmu.Get(`api/gnempre?usu_codi=${this.propo.usu_codi}`, this.propo.emp_codi).subscribe((resp: any) => {
        this.companies = resp.objTransaction;
        this.spinner.hide();
        this.modal.present();
      });
    }
}

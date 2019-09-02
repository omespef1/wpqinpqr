import { Component, OnInit, ViewChild } from '@angular/core';
import { Ctpropo } from 'src/classes/ct/ctpropo';
import { AlertComponent } from '../../alert/alert.component';
import { ComunicationsService } from 'src/services/comunications.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Ctconsu } from 'src/classes/ct/ctconsu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ctconsu',
  templateUrl: './ctconsu.component.html',
  styleUrls: ['./ctconsu.component.css']
})
export class CtconsuComponent implements OnInit {

  @ViewChild(AlertComponent) _alert: AlertComponent;

  consu: Ctconsu = new Ctconsu();
  propo: Ctpropo = new Ctpropo();
  submitted = false;
  message: string;
  ctrevpr: Ctconsu[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(private _conmu: ComunicationsService, private spinner: NgxSpinnerService, private route: ActivatedRoute, private titleService: Title) {
  }

  ngOnInit() {
  }

   postConsu() {
      this.GetInfoCtRevpr();
      this.propo = new Ctpropo();
    }

    async GetInfoCtRevpr() {
      const info: any = <any>await this._conmu.Get(`api/CtConsu/CtConsuLoad?emp_codi=${this.propo.emp_codi}
      &rev_esta=${this.propo.rev_esta}&pro_codi=${this.propo.pro_codi}&pro_nomb=${this.propo.pro_nomb}`).toPromise();
      if (info.retorno === 0) {
        this.ctrevpr = info.objTransaction;
      } else {
        this.ctrevpr = null;
        this._alert.showMessage(info.txtRetorno);
      }
      this.propo.pro_codi = '';
      this.propo.pro_nomb = '';
      this.propo.rev_esta = '0';
      return info;
    }

    revEncode(rev_cont: string) {
      return btoa(rev_cont);
    }
}

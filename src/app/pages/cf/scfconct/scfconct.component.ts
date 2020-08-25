import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ScfconctService } from 'src/app/services/cf/scfconct.service';
import { Cfconct } from 'src/classes/cf/cfconct';
import { Sudimco } from 'src/classes/su/sudimco';
import * as moment from 'moment';

@Component({
  selector: 'app-scfconct',
  templateUrl: './scfconct.component.html',
  styles: []
})

export class ScfconctComponent implements OnInit {

  msg = '';
  ter_coda = '';
  date: string;
  showSearch = false;
  showDetail = false;
  _scfconct = new Cfconct();
  today: Date;

  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;

  subonoc = new Cfconct();
  sudimco: Sudimco[] = [];

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private route: ActivatedRoute, private _sfConct: ScfconctService) { }

  async ngOnInit() {
    this.GetParams();
    this.today = new Date();
    this.today.setDate( this.today.getDate());
  }

  GetParams(): boolean {
    try {
      this.route.queryParamMap.subscribe(queryParams => {

          if (queryParams.get('usu_codi') != null) {
            this.ter_coda = atob(queryParams.get('usu_codi'));
          } else {
            this.showAlertMesssage('Parámetro usuario no enviado');
            return false;
          }

          if (queryParams.get('emp_codi') != null)
            this._scfconct.emp_codi = Number(atob(queryParams.get('emp_codi')));
           else {
            this.showAlertMesssage('Parámetro Empresa no enviado');
            return false;
          }

          if (queryParams.get('emp_nomb') != null)
          this._scfconct.emp_nomb = atob(queryParams.get('emp_nomb'));
         else {
          this.showAlertMesssage('Parámetro Nombre Empresa no enviado');
          return false;
        }

          this.loadInitInfo();

      }, err => {
        return false;
      });
    } catch ( err ) {
      return false;
    }
  }

  loadInitInfo() {
    this.spinner.show();
    this._sfConct.loadInitInfo(this.ter_coda, this._scfconct.emp_codi).subscribe(resp => {
      if (resp.retorno === 0) {
        this.subonoc = resp.objTransaction;
        this.showSearch = true;
      } else
       this.showAlertMesssage(resp.txtRetorno);
    });
    this.spinner.hide();
  }

  loadSuDimco() {
    this.spinner.show();

    if (this.subonoc.dim_feci === null)
      this.subonoc.dim_feci = moment(this.today).format('YYYY-MM-DD');

    if (this.subonoc.dim_fecf === null)
      this.subonoc.dim_fecf = moment(this.today).format('YYYY-MM-DD');

    this._sfConct.loadSumDimco(this.ter_coda, this._scfconct.emp_codi,
      moment(this.subonoc.dim_feci).format('YYYY-MM-DD'),
      moment(this.subonoc.dim_fecf).format('YYYY-MM-DD')).subscribe(resp => {

        if (resp.retorno === 0) {
        this.sudimco = resp.objTransaction;
        this.showSearch = false;

        if (this.sudimco.length > 0)
          this.showDetail = true;

      } else {
        this.showSearch = true;
        this.showAlertMesssage(resp.txtRetorno);
        this.initDate();
      }
    });
    this.spinner.hide();
  }

  initDate() {
    this.today = new Date();
    this.today.setDate(this.today.getDate() + 1);
    this.subonoc.dim_feci = moment(this.today).format('YYYY-MM-DD');
    this.subonoc.dim_fecf = moment(this.today).format('YYYY-MM-DD');
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  volver() {
    this.showSearch = true;
    this.showDetail = false;
    this.initDate();
  }

  BuildPrint() {
    try {
      this._scfconct.bon_sald = this.subonoc.bon_sald;
      this._scfconct.dim_feci = this.subonoc.dim_feci;
      this._scfconct.dim_fecf = this.subonoc.dim_fecf;
      this._scfconct.ter_coda = this.ter_coda;
       this._sfConct.print(this._scfconct).subscribe(resp => {
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

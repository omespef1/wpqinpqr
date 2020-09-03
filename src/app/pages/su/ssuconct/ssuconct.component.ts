import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { SsuconctService } from 'src/app/services/su/ssuconct.service';
import { Suconct } from 'src/classes/su/suconct';
import { Sudimco } from 'src/classes/su/sudimco';
import * as moment from 'moment';

@Component({
  selector: 'app-ssuconct',
  templateUrl: './ssuconct.component.html',
  styles: []
})

export class SsuconctComponent implements OnInit {

  msg = '';
  ter_coda = '';
  date: string;
  showSearch = false;
  showDetail = false;
  _ssuconct = new Suconct();
  today: Date;

  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;

  subonoc = new Suconct();
  sudimco: Sudimco[] = [];

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private route: ActivatedRoute, private _suConct: SsuconctService) { }

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
            this._ssuconct.emp_codi = Number(atob(queryParams.get('emp_codi')));
           else {
            this.showAlertMesssage('Parámetro Empresa no enviado');
            return false;
          }

          if (queryParams.get('emp_nomb') != null)
          this._ssuconct.emp_nomb = atob(queryParams.get('emp_nomb'));
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
    this._suConct.loadInitInfo(this.ter_coda, this._ssuconct.emp_codi).subscribe(resp => {
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

    this._suConct.loadSumDimco(this.ter_coda, this._ssuconct.emp_codi,
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
      this._ssuconct.bon_sald = this.subonoc.bon_sald;
      this._ssuconct.dim_feci = this.subonoc.dim_feci;
      this._ssuconct.dim_fecf = this.subonoc.dim_fecf;
      this._ssuconct.dim_fech = this.subonoc.dim_fech;
      this._ssuconct.ter_coda = this.ter_coda;
       this._suConct.print(this._ssuconct).subscribe(resp => {
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ArcaceaService } from 'src/app/services/ar/arcacea.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sarcacea',
  templateUrl: './sarcacea.component.html',
  styles: []
})
export class SarcaceaComponent implements OnInit {

  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;

  msg = '';
  ter_coda = '';
  emp_codi = 0;
  per_afil: string;
  per_inde: string;
  per_pens: string;

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private route: ActivatedRoute, private _arcacea: ArcaceaService ) { }

  async ngOnInit() {
    await this.GetParams();
  }

  GetParams() {
    try {
      this.route.queryParamMap.subscribe(queryParams => {

        if (queryParams.get('usu_codi') != null)
          this.ter_coda = atob(queryParams.get('usu_codi'));
        else
          this.showAlertMesssage('Parámetro usuario no enviado');

        if (queryParams.get('emp_codi') != null)
          this.emp_codi = Number(atob(queryParams.get('emp_codi')));
        else
          this.showAlertMesssage('Parámetro empresa no enviado');

      });
    } catch (err) {
      this.showAlertMesssage(err);
    }
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  printDesafiliado() {
    this.printCertificado('null', 'SArCacDF');
  }

  printAfiliado() {
    this.printCertificado(this.per_afil, 'SArCacAF');
  }

  printPensionado() {
    this.printCertificado(this.per_pens, 'SArCacPE');
  }

  printIndependiente() {
    this.printCertificado(this.per_inde, 'SArCacIN');
  }

  printCertificado(periodo: string, reporte: string) {
    try {
       this._arcacea.printCertificado(this.ter_coda, this. emp_codi, periodo, reporte).subscribe(resp => {
         if (resp.retorno === 0)
          window.open(resp.objTransaction, '_blank');
         else
           this.showAlertMesssage(`Error generando reporte : ${resp.txtRetorno}`);
         }
       );
     } catch (error) {
       this.showAlertMesssage(`Error generando reporte : ${error}`);
     }
  }

  setPeriodoAfiliacion(event, dp: any) {
    dp.close();
    this.per_afil = event;
    this.per_afil  = moment(this.per_afil).format('MM-YYYY');
  }

  setPeriodoIndependiente(event, dp: any) {
    dp.close();
    this.per_inde = event;
    this.per_inde  = moment(this.per_inde).format('MM-YYYY');
  }

  setPeriodoPensionado(event, dp: any) {
    dp.close();
    this.per_pens = event;
    this.per_pens  = moment(this.per_pens).format('MM-YYYY');
  }

}

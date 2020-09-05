import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SucacerService } from 'src/app/services/su/sucacer.service';
import { Sucacer } from 'src/classes/su/sucacer';

@Component({
  selector: 'app-sucacer',
  templateUrl: './sucacer.component.html',
  styleUrls: ['./sucacer.component.css']
})
export class SucacerComponent implements OnInit {

  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;

  reporte = '';
  ter_coda = '';
  emp_codi = 0;
  msg = '';
  nombre = '';
  identificacion = '';
  beneficiarios: Sucacer[] = [];

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private route: ActivatedRoute, private _sucacer: SucacerService) { }

  async ngOnInit() {
    await this.GetParams();
  }


  GetParams() {
    try {
      this.route.queryParamMap.subscribe(queryParams => {

        if (queryParams.get('usu_codi') != null)
          this.ter_coda = atob(queryParams.get('usu_codi'));

        if (queryParams.get('emp_codi') != null)
          this.emp_codi = Number(atob(queryParams.get('emp_codi')));

      });
    } catch (err) {
      this.showAlertMesssage(err);
    }
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }


  printCertificado() {
    try {

      if (this.reporte === 'SSuCacNA') {

        if (this.identificacion === '') {
          this.showAlertMesssage('Debe digitar un número de identificación');
          return;
        }

        if (this.nombre === '') {
          this.showAlertMesssage('Debe digitar nombres completos');
          return;
        }

        this._sucacer.printCertificadoNoAfiliado(this.identificacion, this.nombre, this. emp_codi).subscribe(resp => {
          if (resp.retorno === 0)
           window.open(resp.objTransaction, '_blank');
          else
            this.showAlertMesssage(`${resp.txtRetorno}`);
          }
        );

      } if (this.reporte === 'SSuCaCBE') {

        for (let i = 0; i < this.beneficiarios.length; i++) {
          if (this.beneficiarios[i].ite_chkd === true) {
            console.log(this.beneficiarios[i].afi_docu);
            this._sucacer.printCertificado(this.beneficiarios[i].afi_docu, this. emp_codi, this.reporte).subscribe(resp => {
              if (resp.retorno === 0)
               window.open(resp.objTransaction, '_blank');
              else
                this.showAlertMesssage(`${resp.txtRetorno}`);
              }
            );
          }
        }

      } else {

        this._sucacer.printCertificado(this.ter_coda, this. emp_codi, this.reporte).subscribe(resp => {
          if (resp.retorno === 0)
           window.open(resp.objTransaction, '_blank');
          else
            this.showAlertMesssage(`${resp.txtRetorno}`);
          }
        );
      }

      this.GetParams();

     } catch (error) {
       this.showAlertMesssage(`${error}`);
     }
  }

  onItemChange(value) {
    this.spinner.show();
    this._sucacer.getGrupoFamiliar(this.ter_coda, this.emp_codi).subscribe((resp: any) => {
      this.beneficiarios = resp.objTransaction;
      this.spinner.hide();
    });
  }

}

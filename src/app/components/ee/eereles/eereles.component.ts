import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComunicationsService } from 'src/services/comunications.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { EnvService } from 'src/app/env.service';
import { AlertComponent } from '../../alert/alert.component';
import { ModalComponent } from '../../dialogs/modal/modal.component';
import { EeReles } from 'src/classes/ee/eereles';
import { pqinpqr } from 'src/classes/models';
import { PqParam } from 'src/classes/rn/pqparam';
import { EeResen } from 'src/classes/ee/eeresen';
import { EeResem } from 'src/classes/ee/eeresem';
import { FormGroup, NgForm } from '@angular/forms';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Component({
  selector: 'app-eereles',
  templateUrl: './eereles.component.html',
  styleUrls: ['./eereles.component.css']
})
export class EerelesComponent implements OnInit {

  @ViewChild(AlertComponent) alert: AlertComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;
  public arrElements: number[] = [];
  public msg = '';
  public inp_cont = 0;
  public emp_codi = 0;
  reles: EeReles = new EeReles();
  inpqr: pqinpqr = new pqinpqr();
  pqpar: PqParam = new PqParam();
  eeresen: EeResen[] = [];
  eeresem: EeResem[] = [];
  resen: EeResen;
  resem: EeResem;
  i = 0;
  countEereles = 0;
  countEerelesMult = 0;

  // tslint:disable-next-line:max-line-length
  constructor(private spinner: NgxSpinnerService, private _comu: ComunicationsService, private sanitizer: DomSanitizer, private titleService: Title, private route: ActivatedRoute, private _confirm: ConfirmDialogComponent, private env: EnvService) {
   }

   async ngOnInit() {
    try {
      this.setTitle('Encuesta de Satisfacción');
      this.countEereles = 0;
      this.countEerelesMult = 0;
      this.spinner.show();
      await this.GetParams();

      if (this.inp_cont && this.emp_codi) {
          await this.LoadPqParam();
          await this.LoadInfoPqr();

          if (this.pqpar.rel_cont) {
            this.GetEeReles();
          }
      }

    } catch ( err ) {
      this.showAlertMesssage(err);
    }
    this.spinner.hide();
  }

  GetParams(): boolean {
    try {

        this.route.queryParamMap.subscribe(queryParams => {

        if (queryParams.get('inp_cont') != null) {
          this.inp_cont = Number(atob(queryParams.get('inp_cont')));
        } else {
          this.showAlertMesssage('Parámetro Número de PQR no enviado');
          return;
        }

        if (queryParams.get('emp_codi') != null) {
          this.emp_codi = Number(atob(queryParams.get('emp_codi')));
        } else {
          this.showAlertMesssage('Parámetro Codígo de empresa no enviado');
          return;
        }
        return true;
      }, err => {
        return false;
      });
    } catch ( err ) {
      return false;
    }
  }

  async LoadInfoPqr() {
    const info: any = <any>await this._comu.Get(`api/EeReles/LoadInfoPqr?emp_codi=${this.emp_codi}&inp_cont=${this.inp_cont}`).toPromise();
      if (info.retorno === 0) {
        this.inpqr = info.objTransaction;
      }
  }

  async LoadPqParam() {
    const info: any = <any>await this._comu.Get(`api/EeReles/LoadPqParam?emp_codi=${this.emp_codi}`).toPromise();
      if (info.retorno === 0) {
        this.pqpar = info.objTransaction;
      }
  }

  async GetEeReles() {
    const info: any = <any>await this._comu.Get(`api/EeReles/EeRelesLoad?rel_cont=${this.pqpar.rel_cont}`).toPromise();
    if (info.retorno === 0) {
      this.reles = info.objTransaction;
    } else {
      this.showAlertMesssage(info.txtRetorno);
    }
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  setInfoText($event: KeyboardEvent, _rel_cont: number, _pre_cont: number, _drp_cont) {
    const value = (<HTMLInputElement>event.target).value;
    this.setInfoResen(value, _rel_cont, _pre_cont, _drp_cont, 'A', '');
  }

   public setInfoResen(_res_valo: string, _rel_cont: number, _drs_cont: number, _rse_cont, _type: string, _id: string) {

      this.resen = new EeResen();
      this.resen.res_valo = _res_valo;
      this.resen.rel_cont = _rel_cont;
      this.resen.rse_cont = _rse_cont;
      this.resen.drs_cont = _drs_cont;
      this.resen.inp_cont = this.inp_cont;

      if ( this.eeresen.length === 0 ) {
        this.eeresen.push(this.resen);
      } else {

          if (_type === 'P') {
          // tslint:disable-next-line:max-line-length
          if ( this.eeresen.indexOf(this.eeresen.filter(t => t.drs_cont === _drs_cont && t.rel_cont === _rel_cont )[0]) === -1 && _res_valo !== '') {
            this.eeresen.push(this.resen);
          } else {
            this.i = this.eeresen.indexOf( this.eeresen.filter(t => t.drs_cont === _drs_cont  && t.rel_cont === _rel_cont)[0] );
            this.eeresen.splice( this.i, 1 );
            this.eeresen.push(this.resen);
          }
        } else {
          // tslint:disable-next-line:max-line-length
          if ( this.eeresen.indexOf(this.eeresen.filter(t => t.drs_cont === _drs_cont && t.rel_cont === _rel_cont )[0]) === -1 && _res_valo !== '') {
            this.eeresen.push(this.resen);
          } else {
            this.i = this.eeresen.indexOf( this.eeresen.filter(t => t.drs_cont === _drs_cont  && t.rel_cont === _rel_cont)[0] );
            this.eeresen.splice( this.i, 1 );

            if ( _res_valo !== '') {
              this.eeresen.push(this.resen);
            }
          }
        }
      }
      this.countEereles = this.eeresen.length;
     }

   public setInfoResem(_res_valo: string, _rel_cont: number, _ddp_cont: number, _drp_cont) {

    this.resem = new EeResem();
    this.resem.res_valo = _res_valo;
    this.resem.rel_cont = _rel_cont;
    this.resem.drp_cont = _drp_cont;
    this.resem.ddp_cont = _ddp_cont;
    this.resem.inp_cont = this.inp_cont;

    // tslint:disable-next-line:max-line-length
    if ( this.eeresem.indexOf(this.eeresem.filter(t => t.ddp_cont === _ddp_cont && t.rel_cont === _rel_cont && t.res_valo === _res_valo )[0]) === -1) {
      this.eeresem.push(this.resem);

      if ( this.arrElements.indexOf( this.resem.drp_cont) === -1) {
        this.arrElements.push(this.resem.drp_cont);
      }

    } else {
      // tslint:disable-next-line:max-line-length
      this.i = this.eeresem.indexOf( this.eeresem.filter(t => t.ddp_cont === _ddp_cont  && t.rel_cont === _rel_cont && t.res_valo === _res_valo)[0] );
      this.eeresem.splice( this.i, 1 );
      this.arrElements.splice( this.i, 1);
    }

    this.countEerelesMult = this.arrElements.length;
 }

 PostEereles(form: NgForm) {
    this.topFunction();
    this.spinner.show();
    this.saveUnique();
    form.reset();
    this.ngOnInit();
    this.spinner.hide();
   }

   async saveUnique() {
    await this._comu.Post('api/EeReles/insertEreles', this.eeresen).subscribe((resp: ToTransaction) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
          this.saveMultiple();
          this.showAlertMesssage('Encuesta enviada correctamente.');
        } else {
          this.showAlertMesssage(resp.txtRetorno);
        }
      }
    }, err => {
      this.showAlertMesssage(err);
    });
   }

   async saveMultiple() {
    this._comu.Post('api/EeReles/insertErelem', this.eeresem).subscribe((resp: ToTransaction) => {
      if (resp.retorno !== undefined) {
        if (resp.retorno === 0) {
        } else {
          this.showAlertMesssage(resp.txtRetorno);
        }
      }
    }, err => {
      this.showAlertMesssage(err);
    });
   }

   topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

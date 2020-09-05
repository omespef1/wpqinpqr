import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComunicationsService } from 'src/services/comunications.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { EnvService } from 'src/app/env.service';
import { AlertComponent } from '../../alert/alert.component';
import { ModalComponent } from '../../dialogs/modal/modal.component';
import { EeReles } from 'src/classes/ee/eereles';
import { pqinpqr } from 'src/classes/models';
import { PqParam } from 'src/classes/rn/pqparam';
import { EeResen } from 'src/classes/ee/eeresen';
import { EeResem } from 'src/classes/ee/eeresem';
import { NgForm } from '@angular/forms';
import { ToTransaction } from 'src/classes/gn/toTransaction';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { timer } from 'rxjs';

@Component({
  selector: 'app-eereles',
  templateUrl: './eereles.component.html',
  styleUrls: ['./eereles.component.css']
})
export class EerelesComponent implements OnInit {
  
  @ViewChild(ConfirmDialogComponent) confirm: ConfirmDialogComponent;
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
  countEereles = 0;
  countEerelesMult = 0;
  uploader: FileUploader = new FileUploader({});
  hasBaseDropZoneOver = false;

  public rel_serv = 0;
  public rem_cont = 0;
  ok = '';

  // tslint:disable-next-line:max-line-length
  constructor(private spinner: NgxSpinnerService, private _comu: ComunicationsService, 
    private sanitizer: DomSanitizer, private titleService: Title, private route: ActivatedRoute, 
    private env: EnvService, private router: Router) {
  }

  async ngOnInit() {
    try {
      this.setTitle('Encuesta de Satisfacción');
      this.spinner.show();
      
      await this.GetParams();

      if (this.inp_cont !== 0) {
        await this.LoadPqParam();
        await this.LoadInfoPqr();

        if (this.pqpar.rel_cont) {
          this.GetEeReles();
        }
      } else {
          await this.getRelContFromService();
          await this.GetEeReles();
      }
    } catch (err) {
      this.showAlertMesssage(err);
    }
    this.spinner.hide();
  }

  GetParams(): boolean {
    try {

      this.route.queryParamMap.subscribe(queryParams => {

        if (queryParams.get('inp_cont') != null)
          this.inp_cont = Number(atob(queryParams.get('inp_cont')));
        else {
          this.rem_cont = Number(atob(queryParams.get('rem_cont')));
          this.rel_serv = Number(atob(queryParams.get('rel_serv')));
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
    } catch (err) {
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
    if (info.retorno === 0)
      this.pqpar = info.objTransaction;
  }

  async getRelContFromService() {
    // tslint:disable-next-line:max-line-length
    const info: any = <any>await this._comu.Get(`api/EeRemes/loadInfoRelesService?rel_serv=${this.rel_serv}&emp_codi=${0}`).toPromise();
    if (info.retorno === 0)
      this.pqpar = info.objTransaction;
  }

  async GetEeReles() {
    const info: any = <any>await this._comu.Get(`api/EeReles/EeRelesLoad?rel_cont=${this.pqpar.rel_cont}`).toPromise();
    if (info.retorno === 0)
      this.reles = info.objTransaction;
    else
      this.showAlertMesssage(info.txtRetorno);
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
    if ($event.keyCode !== 9) {
      this.setInfoResen(value, _rel_cont, _pre_cont, _drp_cont, 'A', '', '');
    }
  }

  public setInfoResen(_res_valo: string, _rel_cont: number, _drs_cont: number, _rse_cont, _type: string, _id: string, _drs_preg: string) {

    this.resen = new EeResen();
    this.resen.res_valo = _res_valo;
    this.resen.rel_cont = _rel_cont;
    this.resen.rse_cont = _rse_cont;
    this.resen.drs_cont = _drs_cont;
    this.resen.inp_cont = this.inp_cont;
    this.resen.rem_cont = this.rem_cont;
    const drs_pre = _drs_preg;
    const i = this.eeresen.indexOf(this.eeresen.filter(t => t.drs_cont === _drs_cont && t.rse_cont === _rse_cont)[0]);

    if (_type === 'P') {
      if (i === -1 && _res_valo !== '') {
        this.eeresen.push(this.resen);
      } else {
        this.eeresen.splice(i, 1);
        this.eeresen.push(this.resen);
      }
    } else if (i === -1 && _res_valo.length > 0) {
        this.eeresen.push(this.resen);
      } else {
        if (i !== -1) {
          this.eeresen.splice(i, 1);
        }
        if (_res_valo.length > 0) {
          this.eeresen.push(this.resen);
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
    this.resem.rem_cont = this.rem_cont;
    this.arrElements = [];
    const i = this.eeresem.indexOf(this.eeresem.filter(t => t.ddp_cont === _ddp_cont && t.drp_cont === _drp_cont)[0]);

    if (this.eeresem.indexOf(this.eeresem.filter(t => t.ddp_cont === _ddp_cont && t.drp_cont === _drp_cont)[0]) === -1) {
      this.eeresem.push(this.resem);
    } else {
      this.eeresem.splice(i, 1);
    }

    for (let j = 0; j < this.eeresem.length; j++) {
      if (this.arrElements.indexOf(this.eeresem[j].drp_cont) === -1) {
        this.arrElements.push(this.eeresem[j].drp_cont);
      }
    }
    this.countEerelesMult = this.arrElements.length;
  }

  async PostEereles(form: NgForm) {
    this.topFunction();
    await this.saveUnique();
    this.clear();
  }

  saveAdjuntos(rem_cont: number) {

    const formData = new FormData();
    const files = this.getFiles();
    let filesCount = 1;

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append(`fileUpload${filesCount}`, file.rawFile, file.name);
        filesCount += 1;
      });

      formData.append('EMP_CODI', this.emp_codi.toString());
      formData.append('VAR_CONT', rem_cont.toString());
      formData.append('VAR_TABL', 'EE_RESEN');
      formData.append('VAR_PROG', 'SEERESEN');

      this._comu.Post('api/uploadAttachment/subirArchivoAdjunto', formData).subscribe((respAdj: any) => {
        if (respAdj.retorno === 1)
          this.showAlertMesssage(`Se produjo un error subiendo el archivo. Intentelo nuevamente : ${respAdj.txtRetorno}`);
      }, err => { console.log(err); });
    }
   }

   getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
   }

  async saveUnique() {

    const promise = new Promise((resolve, reject) => {
      this._comu.Post('api/EeReles/insertEreles', this.eeresen).subscribe(async (resp: ToTransaction) => {
        if (resp.retorno !== undefined) {
          if (resp.retorno === 0) {
            this.spinner.hide();
            await this.saveMultiple();
            await this.saveAdjuntos(this.resem.rem_cont);
            resolve();
            this.showAlertMesssage('Encuesta enviada correctamente.');
            this.clear();
          } else {
            this.showAlertMesssage(resp.txtRetorno);
            reject();
          }
        }
      });
    });
    return promise;
  }

  async saveMultiple() {
    const promise: Promise<any> = new Promise((resolve, reject) => {
      this._comu.Post('api/EeReles/insertErelem', this.eeresem).subscribe((resp: ToTransaction) => {
        if (resp.retorno !== undefined) {
          if (resp.retorno !== 0) {
            this.showAlertMesssage(resp.txtRetorno);
          }
        }
        resolve();
      });
    });
    return promise;
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  clear() {
    this.countEereles = 0;
    this.countEerelesMult = 0;
    this.arrElements = [];
    this.eeresen = [];
    this.eeresem = [];
    this.GetEeReles();
  }

  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  deleteFile(index: number) {
    this.uploader.queue[index].remove();
  }

  alertEmitt(event) {
    this.router.navigate(['eeremes']);
  }

}

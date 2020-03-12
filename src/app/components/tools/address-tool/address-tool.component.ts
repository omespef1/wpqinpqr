import { Component, OnInit, ViewChild , EventEmitter, Output} from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { GnNomdi } from 'src/classes/gn/gnnomdi';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-address-tool',
  templateUrl: './address-tool.component.html',
  styles: []
})
export class AddressToolComponent implements OnInit {

  @ViewChild(AlertComponent) Alert: AlertComponent;
  @Output() myAddress: EventEmitter<string>;

  dataTemp = [];
  element: HTMLElement;
  Nomdi: GnNomdi[] = new Array();
  digitos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // tslint:disable-next-line:max-line-length
  letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  public direccion = '';
  public adicional = '';
  public nom_edtn = '';
  public countLetr = 0;
  msg = '';
  isError= false;
  messageErrorAddres ="";


  constructor(private _comu: ComunicationsService) {
    this.myAddress = new EventEmitter();
   }

  ngOnInit() {
    this.loadInfoDireccion();
  }

  async loadInfoDireccion() {
    const info: any = <any>await this._comu.Get(`api/GnNomdi/GetInfoNomdi?emp_codi=102`).toPromise();
    if (info.retorno === 0)
      this.Nomdi = info.objTransaction;
  }

  show() {
    this.nom_edtn = '';
    this.dataTemp = [];
    this.direccion = '';
    document.getElementById('btnmodalDirecciones').click();
  }

  setInfoNomdi(text: string, space: boolean, edtn: string) {
    this.nom_edtn = edtn;
    this.validarNomenclatura(text, edtn);
    this.buildAddress();
    this.adicional = '';
  }

  limpiarDireccion() {
    this.dataTemp.splice(this.dataTemp.length - 1, 1);
    this.buildAddress();
    this.countLetr = 0;
  }

  buildAddress() {
    this.direccion = '';
    for (let j = 0; j < this.dataTemp.length; j++) {
      const data = this.dataTemp[j];
      if (isNaN(data)) // --> Si no es numero
        if (this.direccion === '')
          this.direccion += this.dataTemp[j] + ' ';
        else
          this.direccion += ' ' + this.dataTemp[j] + ' ';
      else
        this.direccion += this.dataTemp[j];
    }
    this.direccion = this.direccion.replace(/  /g, ' ');
  }

  showAlertMesssage(msg: string) {
   this.isError=true;
   this.messageErrorAddres = msg;
  }

  validarNomenclatura(nomen: string, edtn: string) {
    this.isError= false;
    if (edtn === 'D') {
      this.dataTemp.push(nomen);
      this.countLetr = 0;
    } else if (nomen === this.dataTemp[this.dataTemp.length - 1] && edtn !== 'L')
      this.showAlertMesssage('No puede seleccionar dos nomenclaturas iguales.');
    else if (edtn === 'L') {
      this.countLetr += 1;
      if (this.countLetr >= 3)
        this.showAlertMesssage('No puede seleccionar más de dos letras seguidas.');
      else
        this.dataTemp.push(nomen);
    } else
      this.dataTemp.push(nomen);
  }

  ok() {
    this.nom_edtn = '';
    this.dataTemp = [];
    this.countLetr = 0;
    this.myAddress.emit(this.direccion);
  }
}

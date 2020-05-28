import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';
import { Eeremes } from "src/classes/ee/eeremes";
import { Eereenc } from "src/classes/ee/eereenc";

@Injectable({
  providedIn: 'root'
})
export class EeremesService {

  constructor(private _comu: ComunicationsService) { }

  loadInfoTipoDocto() {
    return this._comu.GetTransaction<ToTransaction>(`/api/gntipdo/`);
  }

  loadInfoFaClien(emp_codi: number, cli_coda: string) {
    return this._comu.GetTransaction<ToTransaction>(`/api/EeRemes/LoadInfoFaclien?emp_codi=${emp_codi}&cli_coda=${cli_coda}`);
  }

  loadServiciosEncuesta() {
    return this._comu.GetTransaction<any>(`api/GnItems?tit_cont=546`);
  }

  loadMetodosRecoleccion() {
    return this._comu.GetTransaction<any>(`api/GnItems?tit_cont=547`);
  }

  saveInfoMedicion(remes: Eereenc) {
    // tslint:disable-next-line:max-line-length
    return this._comu.PostTransaction<ToTransaction>(`/api/EeRemes/EeRemesSaveInfo`, remes);
  }

  actualizarPolitica(cli_coda: string) {
    return this._comu.GetTransaction<any>(`api/EeRemes/updateTratamiento?cli_coda=${cli_coda}`);
  }

  validarEncuestaUsuario(cli_coda: string, ite_serv: number) {
    return this._comu.GetTransaction<any>(`api/EeRemes/loadValidInfoEnc?cli_coda=${cli_coda}&ite_serv=${ite_serv}`);
  }
}

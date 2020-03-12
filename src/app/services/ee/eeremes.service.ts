import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';

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
    return this._comu.GetTransaction<ToTransaction>(`api/GnItems?tit_cont=546`);
  }

  loadMetodosRecoleccion() {
    return this._comu.GetTransaction<ToTransaction>(`api/GnItems?tit_cont=547`);
  }

}

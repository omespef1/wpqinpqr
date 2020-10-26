import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Injectable({
    providedIn: 'root'
  })

export class EeconsuService {

  constructor(private _comu: ComunicationsService) { }

  loadServicio() {
    return this._comu.GetTransaction<any>(`api/GnItems?tit_cont=546`);
  }

  loadCliente() {
    return this._comu.GetTransaction<ToTransaction>(`api/Eeconsu/loadClientes?emp_codi=${0}`);
  }

  loadInfoEereles(fec_inic: string, fec_fina: string, ite_cont: number, cli_coda: string) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Eeconsu/loadInfoEereles?emp_codi=${0}&fini=${fec_inic}&ffin=${fec_fina}&ite_cont=${ite_cont}&cli_coda=${cli_coda}`);
  }

  loadInfoAdjun(rad_llav: string, emp_codi: number ) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/download/loadInfoAdjunPqr?consecutivo=${rad_llav}&pro_codi=SEERESEN&tableName=EE_RESEN&emp_codi=${emp_codi}`);
  }
}

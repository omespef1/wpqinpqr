import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Injectable({
  providedIn: 'root'
})
export class TrazabilidadService {

  constructor(private _comu: ComunicationsService) {
   }

   loadInfoInitTrazabilidad(emp_codi: number) {
     return this._comu.GetTransaction<ToTransaction>(`api/TrazabilidadPQR/PqTrazInitInfo?emp_codi=${emp_codi}`);
   }

   loadInfoTrazabilidad(emp_codi: number, fec_inic: string, fec_fina: string, filter: string) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/TrazabilidadPQR/PqTrazLoadInfo?emp_codi=${emp_codi}&fini=${fec_inic}&ffin=${fec_fina}&filter=${filter}`);
  }

  loadInfoPqr(emp_codi: number, inp_cont: number) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/TrazabilidadPQR/PqTrazLoadInfoPqr?emp_codi=${emp_codi}&inp_cont=${inp_cont}`);
  }

  loadInfoAdjuntosPqr(cas_cont: number, emp_codi: number ) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/download?consecutivo=${cas_cont}&pro_codi=SPQINPQR&tableName=PQ_INPQR&emp_codi=${emp_codi}`);
  }

}

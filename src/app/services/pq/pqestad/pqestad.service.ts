import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Injectable({
  providedIn: 'root'
})
export class PqestadService {

  constructor(private _comu: ComunicationsService) {
   }

   loadInfoEstadisticas(emp_codi: number) {
    return this._comu.GetTransaction<ToTransaction>(`/api/PqEstadisticas/Pqestad?emp_codi=${emp_codi}`);
   }

   loadPqEstadisticas(emp_codi: number, fec_inic: string, fec_fina: string, type: string, filter: string) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`/api/PqEstadisticas/InfoPqestad?emp_codi=${emp_codi}&fini=${fec_inic}&ffin=${fec_fina}&type=${type}&filter=${filter}`);
   }
}

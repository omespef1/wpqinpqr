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
}

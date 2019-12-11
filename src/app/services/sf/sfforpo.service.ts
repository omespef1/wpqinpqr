import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Injectable({
  providedIn: 'root'
})

export class SfForpoService {

  constructor(private _comu: ComunicationsService) {
   }

   loadInfoInitFovis(emp_codi: number) {
     return this._comu.GetTransaction<ToTransaction>(`/api/Fovis/SfForpoInitInfo?emp_codi=${emp_codi}`);
   }
}

import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { Transaction } from '../../../classes/gn/ToTransaction';

@Injectable({
  providedIn: 'root'
})
export class FaddinaService {

  constructor(private _comu:ComunicationsService) {

   }

   GetFaddina(emp_codi: number, cli_coda: string){
     return this._comu.GetTransaction<Transaction>(`api/faddina?emp_codi=${emp_codi}&cli_coda=${cli_coda}`);
   }
}

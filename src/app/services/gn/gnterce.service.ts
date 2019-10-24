import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { Transaction } from '../../../classes/gn/ToTransaction';

@Injectable({
  providedIn: 'root'
})
export class GnterceService {

  constructor(private _comu:ComunicationsService) {


   }

   GetGnTerce(usu_codi:string){
     return this._comu.GetTransaction<Transaction>(`api/gnterce?usu_codi=${usu_codi}`);
   }
}

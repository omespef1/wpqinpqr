import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { gnmodul } from "src/classes/gn/gnmodul";

@Injectable({
  providedIn: 'root'
})
export class GnmodulService {

  constructor(private _comu:ComunicationsService) { }



  GetGnModul(mod_codi:number){
    return this._comu.GetTransactionSafe<gnmodul>(`api/GnModul?mod_codi=${mod_codi}`);
  }
}

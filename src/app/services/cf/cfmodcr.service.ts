import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { Transaction2 } from "src/classes/gn/toTransaction";

@Injectable({
  providedIn: 'root'
})
export class CfmodcrService {

  constructor(private _comu:ComunicationsService) { }

  GetCfmodcr(emp_codi:number){
    return this._comu.GetTransaction<Transaction2>(`api/CfModcr?emp_codi=${emp_codi}`);
   }

}

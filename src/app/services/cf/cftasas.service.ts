import { Injectable } from '@angular/core';
import { Transaction2 } from "src/classes/gn/toTransaction";
import { ComunicationsService } from "src/services/comunications.service";

@Injectable({
  providedIn: 'root'
})
export class CftasasService {

  constructor(private _comu:ComunicationsService) { }

  GetCfTasas(emp_codi:number){
   return this._comu.GetTransaction<Transaction2>(`api/CfTasas?emp_codi=${emp_codi}`);
  }
}

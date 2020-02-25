import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { Transaction2 } from '../../../classes/gn/ToTransaction';
import { ToTransactionSafe } from '../../../classes/models';
import { sutraye } from "src/classes/su/sutraye";

@Injectable({
  providedIn: 'root'
})
export class SutrayeService {

  constructor(private _comu:ComunicationsService) {

   }

GetSuTraye(emp_codi:number,afi_cont:number){
 this._comu.GetTransaction<ToTransactionSafe<sutraye>>(`api/SuTraye?emp_codi=${emp_codi}&afi_cont=${afi_cont}`);
}

}

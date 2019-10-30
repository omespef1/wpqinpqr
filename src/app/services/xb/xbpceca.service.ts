import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { xbpceca } from '../../../classes/xb/xbauliq';
import { Transaction } from '../../../classes/gn/ToTransaction';

@Injectable({
  providedIn: 'root'
})
export class XbpcecaService {

  constructor(private _comu:ComunicationsService) { 



  }

  GetXbPceca(emp_codi:number){
    return this._comu.GetTransaction<Transaction>(`api/xbpceca?emp_codi=${emp_codi}`);
  }
}

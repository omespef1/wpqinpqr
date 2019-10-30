import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { Transaction } from '../../../classes/gn/ToTransaction';
import { XbAuliq, xbautliqp } from '../../../classes/xb/xbauliq';

@Injectable({
  providedIn: 'root'
})
export class XbauliqService {

  constructor(private _comu:ComunicationsService) {

   }


  GetXbAuliq(emp_codi: number, cli_coda:string,par_fech:string){
   return this._comu.GetTransaction<Transaction>(`api/XbbAuliq?emp_codi=${emp_codi}&cli_coda=${cli_coda}&par_fech=${par_fech}`);
  }

  SetXbAuliq(aprobation:xbautliqp) {
  return this._comu.PostTransaction<Transaction>("api/XbbAuliq", aprobation);
  }
}

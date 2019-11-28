import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { Transaction } from '../../../classes/gn/ToTransaction';
import {  PrintLiq } from '../../../classes/xb/xbauliq';

@Injectable({
  providedIn: 'root'
})
export class XbauliqService {

  constructor(private _comu:ComunicationsService) {

   }


  GetXbAuliq(emp_codi: number, cli_coda:string,par_fech:string,ite_ctse:number){
   return this._comu.GetTransaction<Transaction>(`api/XbbAuliq?emp_codi=${emp_codi}&cli_coda=${cli_coda}&par_fech=${par_fech}&ite_ctse=${ite_ctse}`);
  }

  SetXbAuliq(aprobation:xbautliqp) {
  return this._comu.PostTransaction<Transaction>("api/XbbAuliq", aprobation);
  }
  print(item:PrintLiq){
    return this._comu.PostTransaction<Transaction>(`api/XbBauliq/BuildPrintLink`, item);
  }
}

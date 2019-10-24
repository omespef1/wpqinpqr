import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { ToTransaction, Transaction } from '../../../classes/gn/ToTransaction';

@Injectable({
  providedIn: 'root'
})
export class XbauliqService {

  constructor(private _comu:ComunicationsService) {

   }


  GetXbAuliq(emp_codi: number, cli_coda:string,par_fech:string){
   return this._comu.GetTransaction<Transaction>(`api/XbbAuliq?emp_codi=${emp_codi}&cli_coda=${cli_coda}&par_fech=${par_fech}`);
  }

  SetXbAuliq(param: any) {
  return this._comu.Post("api/XbbAuliq", param);
  }
}

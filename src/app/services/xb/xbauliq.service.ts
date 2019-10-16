import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { ToTransaction } from '../../../classes/gn/ToTransaction';

@Injectable({
  providedIn: 'root'
})
export class XbauliqService {

  constructor(private _comu:ComunicationsService) {

   }


  GetXbAuliq(emp_codi: number, cli_coda:string){
   return this._comu.GetTransaction<ToTransaction>(`/XbAuliq?emp_codi=${emp_codi}&cli_coda=${cli_coda}`);
  }
}

import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { Transaction } from '../../../classes/gn/ToTransaction';

@Injectable({
  providedIn: 'root'
})
export class FainaclService {

  constructor(private _http:ComunicationsService) { }

  GetFaInacl(emp_codi:number,cli_coda:string){
   return this._http.GetTransaction<Transaction>(`api/Fainacl?emp_codi=${emp_codi}&cli_coda=${cli_coda}`);
  }
}

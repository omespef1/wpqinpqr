import { Injectable } from '@angular/core';
import { ComunicationsService } from "src/services/comunications.service";
import { Faclien } from '../../../classes/fa/faclien';

@Injectable({
  providedIn: 'root'
})
export class FaclienService {

  constructor(private _http: ComunicationsService) {

   }


   GetFaclien(emp_codi:number,cli_coda:string){
    return this._http.GetTransactionSafe<Faclien>(`api/faclien?emp_codi=${emp_codi}&cli_coda=${cli_coda}`);
   }
}

import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { Transaction2 } from '../../../classes/gn/ToTransaction';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GnarbolService {

  constructor(private _comu:ComunicationsService) { }


  GetGnArbol(emp_codi:number,tar_codi:number):Observable<Transaction2>{
    return this._comu.GetTransaction<Transaction2>(`api/gnarbol/GetArbolPorTipo?emp_codi=${emp_codi}&tar_codi=${tar_codi}`);
  }


}

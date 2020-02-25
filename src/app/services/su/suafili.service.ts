import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import {  Transaction2 } from '../../../classes/gn/ToTransaction';

@Injectable({
  providedIn: 'root'
})
export class SuafiliService {

  constructor(private _comu:ComunicationsService) { }

  GetSuAfili(emp_codi:number,afi_docu:string){
     return this._comu.GetTransaction<Transaction2>(`api/suafili?emp_codi=${emp_codi}&afi_docu=${afi_docu}`)
  }
}

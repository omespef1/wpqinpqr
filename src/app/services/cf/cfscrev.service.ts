import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { Transaction2 } from "src/classes/gn/toTransaction";
import { cfscrev } from "src/classes/cf/cfscrev";

@Injectable({
  providedIn: 'root'
})
export class CfscrevService {

  constructor(private _comu:ComunicationsService) { }

  SetCfScrev(credit:cfscrev){
    return this._comu.PostTransaction<Transaction2>(`api/CfScrev`,credit);
   }
}

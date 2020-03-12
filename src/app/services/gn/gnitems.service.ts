import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { gnItem } from '../../../classes/models';

@Injectable({
  providedIn: 'root'
})
export class GnitemsService {

  constructor(private _comu:ComunicationsService) { }



  GetGnItems(tit_cont:number){
    return this._comu.GetTransactionSafe<gnItem[]>(`api/GnItems?tit_cont=${tit_cont}`);
  }

}

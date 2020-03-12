import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { Transaction2 } from '../../../classes/gn/ToTransaction';
import { gntipdo } from '../../../classes/gn/gntipdo';

@Injectable({
  providedIn: 'root'
})
export class GntipdoService {

  constructor(private _comu:ComunicationsService) { }


  GetGnTipdo() {
    return this._comu.GetTransactionSafe<gntipdo[]>(`api/gntipdo`);
  }
}

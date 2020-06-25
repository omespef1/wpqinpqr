import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { ToTransaction, Transaction } from 'src/classes/gn/toTransaction';

@Injectable({
  providedIn: 'root'
})
export class GnmenuService {

  constructor(private _comu: ComunicationsService) { }

  loadMenu() {
    return this._comu.GetTransaction<Transaction>(`/api/gnacrol/AcrolLoad?reql=N`);
  }
 }

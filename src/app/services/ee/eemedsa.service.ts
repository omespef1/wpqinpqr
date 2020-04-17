import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Injectable({
    providedIn: 'root'
  })
  export class EemedsaService {

    constructor(private _comu: ComunicationsService) { }

    loadServiciosEncuesta() {
        return this._comu.GetTransaction<any>(`api/GnItems?tit_cont=546`);
      }
  }


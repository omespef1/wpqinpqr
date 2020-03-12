import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { Gndivpo } from "src/classes/gn/gndivpo";

@Injectable({
  providedIn: 'root'
})
export class GndivpoService {

  constructor(private _comu: ComunicationsService) { 


  }

  GetGnDivpo(){
    return this._comu.GetTransactionSafe<Gndivpo[]>("api/GnDivpo");
  }

}

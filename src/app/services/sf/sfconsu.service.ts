import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';
import { Sfconsu } from 'src/classes/sf/sfconsu';

@Injectable({
    providedIn: 'root'
})

export class SfConsuService {

    constructor(private _comu: ComunicationsService) {
    }

    loadInitInfo(sfconsu: Sfconsu, emp_codi: number) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/sfconsu/SfConsuInfo?emp_codi=${emp_codi}&tip_codi=${sfconsu.tip_codi}&afi_docu=${sfconsu.afi_docu}`);
    }
}

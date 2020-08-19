import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Injectable({
    providedIn: 'root'
})

export class CsfconctService {

    constructor(private _comu: ComunicationsService) {
    }

    loadInitInfo() {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/sfconsu/SfConsuInfo`);
    }
}


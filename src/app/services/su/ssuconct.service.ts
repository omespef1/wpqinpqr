import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { ToTransaction, Transaction2 } from 'src/classes/gn/toTransaction';
import { Suconct } from 'src/classes/su/suconct';


@Injectable({
    providedIn: 'root'
})

export class SsuconctService {

    constructor(private _comu: ComunicationsService) {
    }

    loadInitInfo(ter_coda: string, emp_codi: number) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/suconct/SfLoadInitInfo?ter_coda=${ter_coda}&emp_codi=${emp_codi}`);
    }

    loadSumDimco(ter_coda: string, emp_codi: number, dim_feci: string, dim_fecf: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/suconct/SfLoadSuDimco?ter_coda=${ter_coda}&emp_codi=${emp_codi}&dim_feci=${dim_feci}&dim_fecf=${dim_fecf}`);
    }

    print(_ssuconct: Suconct) {
        return this._comu.PostTransaction<ToTransaction>(`api/suconct/BuildPrintLink`, _ssuconct);
    }
}


import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { ToTransaction, Transaction2 } from 'src/classes/gn/toTransaction';
import { Cfconct } from 'src/classes/cf/cfconct';


@Injectable({
    providedIn: 'root'
})

export class ScfconctService {

    constructor(private _comu: ComunicationsService) {
    }

    loadInitInfo(ter_coda: string, emp_codi: number) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/sfconct/SfLoadInitInfo?ter_coda=${ter_coda}&emp_codi=${emp_codi}`);
    }

    loadSumDimco(ter_coda: string, emp_codi: number, dim_feci: string, dim_fecf: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/sfconct/SfLoadSuDimco?ter_coda=${ter_coda}&emp_codi=${emp_codi}&dim_feci=${dim_feci}&dim_fecf=${dim_fecf}`);
    }

    print(_scfconct: Cfconct) {
        console.log(_scfconct);
        return this._comu.PostTransaction<ToTransaction>(`api/sfconct/BuildPrintLink`, _scfconct);
    }
}


import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Injectable({
    providedIn: 'root'
})

export class ArcaceaService {

    constructor(private _comu: ComunicationsService) {
    }

    printCertificado(ter_coda: string, emp_codi: number, periodo: string, reporte: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/arcacea/printCertificado?ter_coda=${ter_coda}&emp_codi=${emp_codi}&periodo=${periodo}&reporte=${reporte}`);
    }
}

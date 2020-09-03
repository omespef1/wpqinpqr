import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Injectable({
    providedIn: 'root'
})

export class SucacerService {

    constructor(private _comu: ComunicationsService) {
    }

    printCertificado(ter_coda: string, emp_codi: number, reporte: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/sucacer/printCertificado?ter_coda=${ter_coda}&emp_codi=${emp_codi}&reporte=${reporte}`);
    }

    printCertificadoNoAfiliado(tna_docu: string, tna_nomb: string, emp_codi: number) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/sucacer/printCertificadoNoAfiliado?tna_docu=${tna_docu}&tna_nomb=${tna_nomb}&emp_codi=${emp_codi}`);
    }
}

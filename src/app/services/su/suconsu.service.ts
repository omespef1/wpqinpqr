import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Injectable({
    providedIn: 'root'
})

export class SuconsuService {

    constructor(private _comu: ComunicationsService) {
    }

    getInfoAfilitrab(emp_codi: number, usu_codi: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConsu/afiliatrabLoad?emp_codi=${emp_codi}&usu_codi=${usu_codi}`);
    }

    getInfoNovedades(emp_codi: number, afi_cont: number, rad_feci: string, rad_fecf: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConsu/afilNovedadLoad?emp_codi=${emp_codi}&afi_cont=${afi_cont}&rad_feci=${rad_feci}&rad_fecf=${rad_fecf}`);
    }

    getInfoAportes(emp_codi: number, afi_cont: number, rpi_peri: string, rpi_perf: string, apo_coda: string, apo_razr: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConsu/afiAportesLoad?emp_codi=${emp_codi}&afi_cont=${afi_cont}&rpi_peri=${rpi_peri.replace('-', '')}&rpi_perf=${rpi_perf.replace('-', '')}&apo_coda=${apo_coda}&apo_razr=${apo_razr}`);
    }

    getInfoSubsidios(emp_codi: number, hgi_peri: string, hgi_perf: string, afi_docu: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConsu/afiSubsidiosLoad?emp_codi=${emp_codi}&hgi_peri=${hgi_peri.replace('-', '')}&hgi_perf=${hgi_perf.replace('-', '')}&afi_docu=${afi_docu}`);
    }

    printSubsidio(emp_codi: number, hgi_peri: string, hgi_perf: string, afi_docu: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConsu/BuildSubRepor?emp_codi=${emp_codi}&hgi_peri=${hgi_peri.replace('-', '')}&hgi_perf=${hgi_perf.replace('-', '')}&afi_docu=${afi_docu}`);
    }

    printAportes(emp_codi: number, rpi_peri: string, rpi_perf: string, afi_docu: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConsu/BuildApoRepor?emp_codi=${emp_codi}&rpi_peri=${rpi_peri.replace('-', '')}&rpi_perf=${rpi_perf.replace('-', '')}&afi_docu=${afi_docu}`);
    }
}

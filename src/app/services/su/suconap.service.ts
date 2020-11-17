import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Injectable({
    providedIn: 'root'
})

export class SuconapService {

    constructor(private _comu: ComunicationsService) {
    }

    getInfoArApovo(emp_codi: number, apo_coda: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/arApovoLoad?emp_codi=${emp_codi}&usu_codi=${apo_coda}`);
    }

    getInfoAfilitrab(emp_codi: number, tip_codi: number, afi_docu: string, apo_cont: number) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/afiliatrabLoad?emp_codi=${emp_codi}&tip_codi=${tip_codi}&afi_docu=${afi_docu}&apo_cont=${apo_cont}`);
    }

    getInfoNovedades(emp_codi: number, apo_coda: string, rad_feci: string, rad_fecf: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/afilNovedadLoad?emp_codi=${emp_codi}&apo_coda=${apo_coda}&rad_feci=${rad_feci}&rad_fecf=${rad_fecf}`);
    }

    getInfoNovedadesTrab(emp_codi: number, tip_codi: number, afi_docu: string, rad_feci: string, rad_fecf: string, apo_coda: string) {

        if (tip_codi === undefined)
            tip_codi = 0;

        if (afi_docu === undefined)
            afi_docu = '';

        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/afilNovedadTrabLoad?emp_codi=${emp_codi}&tip_codi=${tip_codi}&afi_docu=${afi_docu}&rad_feci=${rad_feci}&rad_fecf=${rad_fecf}&apo_coda=${apo_coda}`);
    }

    getInfoAportesTrab(emp_codi: number, apo_coda: string, rad_feci: string, rad_fecf: string, afi_docu: string, tip_codi: number) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/infoAportesTrabLoad?emp_codi=${emp_codi}&tip_codi=${tip_codi}&afi_docu=${afi_docu}&rad_feci=${rad_feci.replace('-', '')}&rad_fecf=${rad_fecf.replace('-', '')}&apo_coda=${apo_coda}`);
    }

    getInfoSubsidiosTrab(emp_codi: number, apo_coda: string , hgi_peri: string, hgi_perf: string, afi_docu: string, tip_codi: number) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/afiSubsidiosTrabLoad?emp_codi=${emp_codi}&hgi_peri=${hgi_peri.replace('-', '')}&hgi_perf=${hgi_perf.replace('-', '')}&afi_docu=${afi_docu}&tip_codi=${tip_codi}&apo_coda=${apo_coda}`);
    }

    getInfoAportesEmp(emp_codi: number, apo_coda: string, rad_feci: string, rad_fecf: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/infoAportesEmpLoad?emp_codi=${emp_codi}&apo_coda=${apo_coda}&rad_feci=${rad_feci.replace('-', '')}&rad_fecf=${rad_fecf.replace('-', '')}`);
    }

    getInfoAportesFiscal(emp_codi: number, rpi_peri: string, apo_coda: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/infoAportesFiscal?emp_codi=${emp_codi}&rpi_peri=${rpi_peri}&apo_coda=${apo_coda}`);
    }

    getInfoDevoluciones(emp_codi: number, apo_coda: string, rad_feci: string, rad_fecf: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/InfoDevoluciones?emp_codi=${emp_codi}&rad_feci=${rad_feci}&rad_fecf=${rad_fecf}&apo_coda=${apo_coda}`);
    }

    getInfoDetalleDevolucion(emp_codi: number, rad_cont: number) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/InfoDetalleDevolucion?emp_codi=${emp_codi}&rad_cont=${rad_cont}`);
    }

    getInfoSubsidiosEmp(emp_codi: number, apo_coda: string , hgi_peri: string, hgi_perf: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/empSubsidiosLoad?emp_codi=${emp_codi}&hgi_peri=${hgi_peri.replace('-', '')}&hgi_perf=${hgi_perf.replace('-', '')}&apo_coda=${apo_coda}`);
    }

    printReportAportes(emp_codi: number, apo_coda: string, rad_feci: string, rad_fecf: string, afi_docu: string, tip_codi: number) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/printReportAportes?emp_codi=${emp_codi}&tip_codi=${tip_codi}&afi_docu=${afi_docu}&rad_feci=${rad_feci.replace('-', '')}&rad_fecf=${rad_fecf.replace('-', '')}&apo_coda=${apo_coda}`);
    }

    printReportSubsidio(emp_codi: number, apo_coda: string , hgi_peri: string, hgi_perf: string, afi_docu: string, tip_codi: number) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/printReportSubsidio?emp_codi=${emp_codi}&hgi_peri=${hgi_peri.replace('-', '')}&hgi_perf=${hgi_perf.replace('-', '')}&afi_docu=${afi_docu}&tip_codi=${tip_codi}&apo_coda=${apo_coda}`);
    }

    printReportAportesEmpresa(emp_codi: number, apo_coda: string, rad_feci: string, rad_fecf: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/printReportAportesEmpresa?emp_codi=${emp_codi}&rad_feci=${rad_feci.replace('-', '')}&rad_fecf=${rad_fecf.replace('-', '')}&apo_coda=${apo_coda}`);
    }

    printReportAportesFiscal(emp_codi: number, rpi_peri: string, apo_coda: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/printReportAportesFiscal?emp_codi=${emp_codi}&rpi_peri=${rpi_peri}&apo_coda=${apo_coda}`);
    }

    printReportSubsidioEmpresa(emp_codi: number, apo_coda: string , hgi_peri: string, hgi_perf: string) {
        // tslint:disable-next-line:max-line-length
        return this._comu.GetTransaction<ToTransaction>(`api/SuConap/printReportSubsidioEmpresa?emp_codi=${emp_codi}&hgi_peri=${hgi_peri.replace('-', '')}&hgi_perf=${hgi_perf.replace('-', '')}&apo_coda=${apo_coda}`);
    }
}

import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { SfForpo } from 'src/classes/sf/sfforpo';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Injectable({
  providedIn: 'root'
})

export class SfForpoService {

  constructor(private _comu: ComunicationsService) {
   }

   loadInitInfo(emp_codi: number) {
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoInitInfo?emp_codi=${emp_codi}`);
  }

   loadInfoModalidad(emp_codi: number) {
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoInfoModalidad?emp_codi=${emp_codi}`);
  }

  loadInfoRadicado(emp_codi: number) {
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoInfoRadicado?emp_codi=${emp_codi}`);
  }

  loadInfoIdAfiliados(emp_codi: number) {
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoIdPostulante?emp_codi=${emp_codi}`);
  }

  loadInfoIdConyuge(emp_codi: number, afi_cont: number) {
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoIdConyuge?emp_codi=${emp_codi}&afi_cont=${afi_cont}`);
  }

  loadInfoIdPerca(emp_codi: number, afi_cont: number) {
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoIdPerca?emp_codi=${emp_codi}&afi_cont=${afi_cont}`);
  }

  loadInfoPerca(emp_codi: number, afi_trab: number, afi_cont: number, afi_docu: string) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoOtrosM?emp_codi=${emp_codi}&afi_trab=${afi_trab}&afi_cont=${afi_cont}&afi_docu=${afi_docu}`);
  }

  loadInfoAfiliados(emp_codi: number, afi_cont: number, valid: boolean) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoInfoPostulante?emp_codi=${emp_codi}&afi_cont=${afi_cont}&validTope=${valid}`);
  }

  loadValidInfoAfiliados(emp_codi: number, afi_cont: number) {
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoValidPostulante?emp_codi=${emp_codi}&afi_cont=${afi_cont}`);
  }

  loadInfoAportante(emp_codi: number, rad_nume: number, for_cont: number) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoGetInfo?emp_codi=${emp_codi}&rad_nume=${rad_nume}&for_cont=${for_cont}`);
  }

  loadInfoOtros(emp_codi: number, afi_trab: number, afi_cont: number, afi_docu: string) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoOtrosM?emp_codi=${emp_codi}&afi_trab=${afi_trab}&afi_cont=${afi_cont}&afi_docu=${afi_docu}`);
  }

  loadInfoGnItems(tit_cont: number) {
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoGnItems?tit_cont=${tit_cont}`);
  }

  ValidInfoSuConyu(emp_codi: number, afi_cont: number) {
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoValidInfoConyu?emp_codi=${emp_codi}&afi_cont=${afi_cont}`);
  }

  loadInfoModvi(emp_codi: number, mod_cont: number, for_sala: number) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoInfoModvi?emp_codi=${emp_codi}&mod_cont=${mod_cont}&for_sala=${for_sala}`);
  }

  saveInfoFovis(forpo: SfForpo) {
    // tslint:disable-next-line:max-line-length
    return this._comu.PostTransaction<ToTransaction>(`api/Fovis/SfForpoSaveInfo`, forpo);
  }

  loadInfoConcepto(emp_codi: number, con_tipo: string) {
      // tslint:disable-next-line:max-line-length
      return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoGetConcepto?emp_codi=${emp_codi}&con_tipo=${con_tipo}`);
  }

  loadParentesco() {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoGetParentesco`);
  }
}

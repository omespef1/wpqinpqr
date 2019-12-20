import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Injectable({
  providedIn: 'root'
})

export class SfForpoService {

  constructor(private _comu: ComunicationsService) {
   }

   loadInfoInitFovis(emp_codi: number) {
     return this._comu.GetTransaction<ToTransaction>(`/api/Fovis/SfForpoInitInfo?emp_codi=${emp_codi}`);
   }

   loadInfoModalidad(emp_codi: number) {
    return this._comu.GetTransaction<ToTransaction>(`/api/Fovis/SfForpoInfoModalidad?emp_codi=${emp_codi}`);
  }

  loadInfoRadicado(emp_codi: number) {
    return this._comu.GetTransaction<ToTransaction>(`/api/Fovis/SfForpoInfoRadicado?emp_codi=${emp_codi}`);
  }

  loadInfoIdAfiliados(emp_codi: number) {
    return this._comu.GetTransaction<ToTransaction>(`/api/Fovis/SfForpoIdPostulante?emp_codi=${emp_codi}`);
  }

  loadInfoIdConyuge(emp_codi: number, afi_cont: number) {
    return this._comu.GetTransaction<ToTransaction>(`/api/Fovis/SfForpoIdConyuge?emp_codi=${emp_codi}&afi_cont=${afi_cont}`);
  }

  loadInfoIdPerca(emp_codi: number, afi_cont: number) {
    return this._comu.GetTransaction<ToTransaction>(`/api/Fovis/SfForpoIdPerca?emp_codi=${emp_codi}&afi_cont=${afi_cont}`);
  }

  loadInfoAfiliados(emp_codi: number, afi_cont: number) {
    return this._comu.GetTransaction<ToTransaction>(`/api/Fovis/SfForpoInfoPostulante?emp_codi=${emp_codi}&afi_cont=${afi_cont}`);
  }

  loadValidInfoAfiliados(emp_codi: number, afi_cont: number) {
    return this._comu.GetTransaction<ToTransaction>(`/api/Fovis/SfForpoValidPostulante?emp_codi=${emp_codi}&afi_cont=${afi_cont}`);
  }

  loadInfoAportante(emp_codi: number, rad_nume: number, for_cont: number) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`/api/Fovis/SfForpoGetInfo?emp_codi=${emp_codi}&rad_nume=${rad_nume}&for_cont=${for_cont}`);
  }

  loadInfoGnItems(tit_cont: number) {
    return this._comu.GetTransaction<ToTransaction>(`/api/Fovis/SfForpoGnItems?tit_cont=${tit_cont}`);
  }

  ValidInfoSuConyu(emp_codi: number, afi_cont: number) {
    return this._comu.GetTransaction<ToTransaction>(`/api/Fovis/SfForpoValidInfoConyu?emp_codi=${emp_codi}&afi_cont=${afi_cont}`);
  }
}

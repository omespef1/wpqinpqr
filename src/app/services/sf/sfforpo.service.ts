import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';
import { SfFovis } from "src/classes/sf/sffovis";
import { SfPrint } from "src/classes/sf/sfprint";

@Injectable({
  providedIn: 'root'
})

export class SfForpoService {

  constructor(private _comu: ComunicationsService) {
   }

   loadInfoModalidad(emp_codi: number) {
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoInfoModalidad?emp_codi=${emp_codi}`);
  }

  loadInfoRadicado(emp_codi: number) {
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoInfoRadicado?emp_codi=${emp_codi}`);
  }

  loadInfoIdAfiliados(emp_codi: number, usu_codi: string) {
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoIdPostulante?emp_codi=${emp_codi}&afi_docu=${usu_codi}`);
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

  loadValidInfoAfiliados(emp_codi: number, afi_cont: number) {
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoValidPostulante?emp_codi=${emp_codi}&afi_cont=${afi_cont}`);
  }

  loadInfoOtros(emp_codi: number, afi_trab: number, afi_docu: string) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoOtrosM?emp_codi=${emp_codi}&afi_trab=${afi_trab}&afi_docu=${afi_docu}`);
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

  saveInfoFovis(forpo: SfFovis) {
    // tslint:disable-next-line:max-line-length
    return this._comu.PostTransaction<ToTransaction>(`api/Fovis/SfForpoSaveInfo`, forpo);
  }

  updateInfoFovis(forpo: SfFovis) {
    // tslint:disable-next-line:max-line-length
    return this._comu.PostTransaction<ToTransaction>(`api/Fovis/SfForpoUpdateInfo`, forpo);
  }

  updateInfoFovisRecursos(forpo: SfFovis) {
    // tslint:disable-next-line:max-line-length
    return this._comu.PostTransaction<ToTransaction>(`api/Fovis/SfForpoUpdateInfoRecursos`, forpo);
  }

  loadInfoConcepto(emp_codi: number, con_tipo: string) {
      // tslint:disable-next-line:max-line-length
      return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoGetConcepto?emp_codi=${emp_codi}&con_tipo=${con_tipo}`);
  }

  loadParentesco() {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoGetParentesco`);
  }

  loadInfoTratamiento(emp_codi: number) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoGetTratamiento?emp_codi=${emp_codi}`);
  }

  loadSfparam(emp_codi: number) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoGetSfParam?emp_codi=${emp_codi}`);
  }

  loadTipoDocumento(emp_codi: number) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoGetTDocumento?emp_codi=${emp_codi}`);
  }

  loadValiNomenclatura() {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoGetNomencla`);
  }

  loadInfoConstructora(emp_codi: number) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoGetConstructora?emp_codi=${emp_codi}`);
  }

  loadInfoFromForpo(emp_codi: number, afi_cont: number, for_cont: number) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoGetInfoForpo?emp_codi=${emp_codi}&afi_cont=${afi_cont}&for_cont=${for_cont}`);
  }

  loadInfoFromAfili(emp_codi: number, afi_cont: number) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<ToTransaction>(`api/Fovis/SfForpoGetInfoPostulante?emp_codi=${emp_codi}&afi_cont=${afi_cont}`);
  }

  printReport(forpo: SfPrint) {
    // tslint:disable-next-line:max-line-length
    return this._comu.PostTransaction<ToTransaction>(`api/Fovis/SfForpoPrintReporte`, forpo);
  }
}

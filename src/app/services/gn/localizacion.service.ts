import { Injectable } from '@angular/core';
import { ComunicationsService } from 'src/services/comunications.service';
import { GnPais } from 'src/classes/gn/gnpaise';
import { GnRegio } from 'src/classes/gn/gnregio';
import { GnDepar } from 'src/classes/gn/gndepar';
import { GnLocal } from 'src/classes/gn/gnlocal';
import { GnBarri } from 'src/classes/gn/gnbarri';
import { GnMunic } from 'src/classes/gn/gnmunic';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  constructor(private _comu: ComunicationsService) {
  }

   loadInfoPaises() {
     return this._comu.GetTransaction<GnPais[]>(`api/GnPaise`);
   }

   loadInfoRegiones(pai_codi: string) {
    return this._comu.GetTransaction<GnRegio[]>(`api/GnRegio?pai_codi=${pai_codi}`);
   }

   loadInfoDepartamentos(pai_codi: string, reg_codi: string) {
    return this._comu.GetTransaction<GnDepar[]>(`api/GnDepar?pai_codi=${pai_codi}&reg_codi=${reg_codi}`);
   }

   loadInfoMunicipios(pai_codi: string, reg_codi: string, dep_codi: string) {
    return this._comu.GetTransaction<GnMunic[]>(`api/GnMunic/InfoGnMunic?pai_codi=${pai_codi}&reg_codi=${reg_codi}&dep_codi=${dep_codi}`);
   }

   loadInfoLocalidad(pai_codi: string, reg_codi: string, dep_codi: string, mun_codi: string) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<GnLocal[]>(`api/GnLocal?pai_codi=${pai_codi}&reg_codi=${reg_codi}&dep_codi=${dep_codi}&mun_codi=${mun_codi}`);
   }

   loadInfoBarrio(pai_codi: string, reg_codi: string, dep_codi: string, mun_codi: string, loc_codi: string) {
    // tslint:disable-next-line:max-line-length
    return this._comu.GetTransaction<GnBarri[]>(`api/GnBarri?pai_codi=${pai_codi}&reg_codi=${reg_codi}&dep_codi=${dep_codi}&mun_codi=${mun_codi}&loc_codi=${loc_codi}`);
   }
}

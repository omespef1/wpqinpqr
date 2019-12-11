import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';

@Injectable({
  providedIn: 'root'
})
export class GnempreService {

  constructor(private _comu:ComunicationsService) {


   
   }

   GetGnEmpre(usu_codi:string){
    return this._comu.Get(`api/gnempre?usu_codi=${usu_codi}`);
   }
   GetLogo(emp_codi:number) {
    return this._comu.Get(`api/GnLogo?emp_codi=${emp_codi}`)
  }
  }

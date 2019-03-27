import { Injectable } from '@angular/core';
import {ComunicationsService} from '../comunications.service';

@Injectable({
  providedIn: 'root'
})
export class WgnfpassService {

  constructor(private _comu:ComunicationsService) { }


  SetPasswordWithToken(passord:string, token:string){
   
    let objRequest = { Password: passord};
    return this._comu.PostToken(`api/gnusuar`,objRequest,token);
  }
  

}

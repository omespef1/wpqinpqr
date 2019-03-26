import { Injectable } from '@angular/core';
import {ComunicationsService} from '../comunications.service';

@Injectable({
  providedIn: 'root'
})
export class WgnfpassService {

  constructor(private _comu:ComunicationsService) { }


  GetUserWithCodeLink(){

    let promise : Promise<any> = new Promise((resolve,reject)=>{
      setTimeout(() => {
          resolve();
      }, 5000);
    })
    return promise;
    //return this._comu.Get(`gnlogin?emp_codi`)
  }
  

}

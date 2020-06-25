import { Injectable } from '@angular/core';
import {ComunicationsService} from '../comunications.service';

@Injectable({
  providedIn: 'root'
})
export class WgnfpassService {

  constructor(private _comu: ComunicationsService) { }

  SetPasswordWithToken(password: string, token: string, newUser: string) {
    const objRequest = { Password: password, Username: newUser};
    return this._comu.PostToken(`api/gnusuar`, objRequest, token);
  }
}

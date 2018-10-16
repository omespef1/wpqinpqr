import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {ServiceUrl} from '../assets/config/config';

@Injectable({
  providedIn: 'root'
})
export class ComunicationsService {


  constructor(private http: HttpClient) { }

  Get(urlController:string){

    let url = `${ServiceUrl}${urlController}`;
  return  this.http.get(url);
  }


}

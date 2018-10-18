import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {ServiceUrl} from '../assets/config/config';

@Injectable({
  providedIn: 'root'
})
export class ComunicationsService {


  constructor(private http: HttpClient) { }

  Get(urlController:string){
    const constOptions = {
  headers: new HttpHeaders({

    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
    }
    let url = `${ServiceUrl}${urlController}`;
  return  this.http.get(url);
  }

Post(urlController:string, params:any){
  let constOptions = {
headers: new HttpHeaders({
  'Access-Control-Allow-Origin':'*'
})
  }
  let url = `${ServiceUrl}${urlController}`;
    return this.http.post(url, params,constOptions);
}
}

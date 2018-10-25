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

open(urlController:string){
 window.open(`${ServiceUrl}${urlController}`);
}
download(urlController:string){
  let constOptions = {
headers: new HttpHeaders({
  'Access-Control-Allow-Origin':'*'
})
  }
  this.http.get(`${ServiceUrl}${urlController}`,{responseType: 'arraybuffer'} )
      .subscribe(response => this.downLoadFile(response, "image/png"));
}
downLoadFile(data: any, type: string) {
        var blob = new Blob([data], { type: type});
        var url = window.URL.createObjectURL(blob);
        var pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
            alert( 'Please disable your Pop-up blocker and try again.');
        }

}


Get(){
this.
}
}

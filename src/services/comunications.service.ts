import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../app/env.service';
//models
import { ToTransaction, ToTransactionSafe } from '../classes/models';
@Injectable({
  providedIn: 'root'
})
export class ComunicationsService {

  constructor(private http: HttpClient, private env: EnvService) { }

  Get(urlController: string, emp_codi = 0) {
    let url = `${this.env.apiUrl}${urlController}`;
    url += `&emp_codi=${emp_codi}`;
    return this.http.get(url);
  }
  GetTransaction<T>(urlController: string, emp_codi: number = 0) {
    let url = `${this.env.apiUrl}${urlController}`;
    if (emp_codi !== 0)  {
      url += `&emp_codi=${emp_codi}`;
    }
    return this.http.get<T>(url);
  }

  GetTransactionSafe<T>(urlController: string, emp_codi: number = 0) {
    let url = `${this.env.apiUrl}${urlController}`;
    if (emp_codi !== 0)  {
      url += `&emp_codi=${emp_codi}`;
    }
    return this.http.get<ToTransactionSafe<T>>(url);
  }
  
  async getAsync(urlController: string) {
    await this.http.get<ToTransaction>(`${this.env.apiUrl}${urlController}`).subscribe((resp: ToTransaction) => {
      if (resp.Retorno == 0) {
        return resp.ObjTransaction;
      }
    })

  }

  Post(urlController: string, params: any) {
    let constOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }
    let url = `${this.env.apiUrl}${urlController}`;    
    return this.http.post(url, params, constOptions);
  }

  PostTransaction<T>(urlController: string, params: any) {
    let constOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }
    let url = `${this.env.apiUrl}${urlController}`;    
    return this.http.post<T>(url, params, constOptions);
  }

  PostUpload(urlController: string, params: any) {
    let constOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'        
      })
    }
    let url = `${this.env.apiUrl}${urlController}`;    
    return this.http.post(url, params,constOptions);
  }

  PostToken(urlController: string, params: any, token: string = "") {
    let constOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'authorization': `Bearer ${token}`
      })
    }

    let url = `${this.env.apiUrl}${urlController}`;    
    return this.http.post(url, params, constOptions);
  }

  open(urlController: string) {
    window.open(`${this.env.apiUrl}${urlController}`);
  }

  download(urlController: string) {

    this.http.get(`${this.env.apiUrl}${urlController}`, { responseType: 'arraybuffer' })
      .subscribe(response => this.downLoadFile(response, "image/png"));
  }
  downLoadFile(data: any, type: string) {
    var blob = new Blob([data], { type: type });
    var url = window.URL.createObjectURL(blob);
    var pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }

  }



}

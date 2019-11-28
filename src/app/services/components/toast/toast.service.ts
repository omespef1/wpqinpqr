import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];
 
  // Push new Toasts to array with content and options
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }
 
  // Callback method to remove Toast DOM element from view
  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }



  showStandard(message:string) {
    this.show(message, {
      delay: 2000,
      autohide: true
    });
  }
 
  showSuccess(header:string,message:string) {
    this.show(message, {
      classname: 'bg-success text-light',
      delay: 3000 ,
      autohide: true,
      headertext: header
    });
  }
  showError(message:string) {
    this.show(message, {
    classname: 'bg-success text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Error'
    });
  }
}


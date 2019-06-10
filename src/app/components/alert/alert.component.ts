import { Component, OnInit,Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
safeHtml:SafeHtml;
@Input() message:string;
  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit() {
  }



  showMessage(msg:string){  
    this.message = msg;
   
    document.getElementById("btnModal").click();
  }
  showHtmlMessage(msg:string){
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(msg);
    document.getElementById("btnModal").click();
  }
  show(){
    document.getElementById("btnModal").click();
  }
}

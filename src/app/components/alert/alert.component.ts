import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
safeHtml: SafeHtml;
@Input() message: string;
@Output() _ok: EventEmitter<string>;

  constructor(private sanitizer: DomSanitizer) {
    this._ok = new EventEmitter();
   }

  ngOnInit() {
  }

  showMessage(msg: string) {
    document.getElementById('btnModal').click();
  }
  showHtmlMessage(msg: string) {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(msg);
    document.getElementById('btnModal').click();
  }
  show() {
    document.getElementById('btnModal').click();
  }

  ok() {
    this._ok.emit();
  }
}

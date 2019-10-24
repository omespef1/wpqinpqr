import { Component, OnInit, Input } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  safeHtml: SafeHtml;

  @Input() message: string;
    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
    }
    showMessage(msg: string) {
      this.message = msg;
      document.getElementById('btnModal').click();
    }
    showHtmlMessage(msg: string) {
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(msg);
      document.getElementById('btnModal').click();
    }
    show() {
      document.getElementById('btnModal').click();
    }
  }

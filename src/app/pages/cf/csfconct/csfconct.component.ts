import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CsfconctService } from 'src/app/services/cf/csfconct.service';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';

@Component({
  selector: 'app-csfconct',
  templateUrl: './csfconct.component.html',
  styles: []
})
export class CsfconctComponent implements OnInit {

  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;
  msg = '';
  showDetail = false;

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private route: ActivatedRoute, private _sfConsu: CsfconctService ) {
  }

  ngOnInit() {
  }

}

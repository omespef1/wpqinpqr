import { Component, OnInit ,Input,EventEmitter,Output} from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {


  @Input() rightButton:string;
  @Input() modalTitle:string;
  @Input() modalBody:string;
  @Output() buttonClick:EventEmitter<string>
  constructor() {
    this.buttonClick = new EventEmitter();
   }

  ngOnInit() {
  }
  show(){
   document.getElementById('alert_button').click();
  }

  executeAction(value:string){
    this.buttonClick.emit(value);
  }

}

import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

   @Input() leftButton:string;
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
    document.getElementById("dialogButton").click();
  }

  executeAction(selection:string){
      this.buttonClick.emit(selection);
  }

}

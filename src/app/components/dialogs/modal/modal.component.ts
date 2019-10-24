import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() title = 'Title';
  @Input() subTitle = 'subTitle';
  @Output() accept: EventEmitter<string>;
  
  constructor() {
    this.accept = new EventEmitter();
   }

  ngOnInit() {

  }

  present() {
    document.getElementById('btnModalGeneral').click();
  }

   dismiss() {
    document.getElementById('btnModalGeneral').click();
   }

   ok() {
    this.accept.emit();
   }
}

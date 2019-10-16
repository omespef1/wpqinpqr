import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-doctos',
  templateUrl: './modal-doctos.component.html',
  styleUrls: ['./modal-doctos.component.css']
})
export class ModalDoctosComponent implements OnInit {

  @Input() title = 'Title';
  @Input() subTitle = 'subTitle';
  @Output() accept: EventEmitter<string>;
  @Input() tamano: string;
  @Input() selectorName: string;

  constructor() {
    this.accept = new EventEmitter();
   }

  ngOnInit() {
  }

  present() {
   document.getElementById('btnModalDoctos').click();
  }

   dismiss() {
    document.getElementById('btnModalDoctos').click();
   }

   ok() {
    this.accept.emit();
   }
}

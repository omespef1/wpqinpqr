import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title: string = 'Title';   
    @Input() subTitle: string = 'subTitle';
    @Output() accept:EventEmitter<string>
  constructor() { }

  ngOnInit() {
  }
 present(){
   document.getElementById("btnModalContent").click();
 }
 dismiss(){
  document.getElementById("btnModalContent").click();
 }

 ok(){
  this.accept.emit();
}
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gnempre',
  templateUrl: './gnempre.component.html',
  styleUrls: ['./gnempre.component.css']
})
export class GnempreComponent implements OnInit {
  @Input() title: string = 'Title';   
  @Input() subTitle: string = 'subTitle';
  @Output() accept:EventEmitter<string>
  
constructor() {
  this.accept = new EventEmitter();
 }

ngOnInit() {
}
present(){
 document.getElementById("btnModalGeneral").click();
}
dismiss(){
document.getElementById("btnModalGeneral").click();
}

ok(){
this.accept.emit();
}
}

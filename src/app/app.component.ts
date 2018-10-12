import { Component } from '@angular/core';
import  {pqinpqr} from '../classes/pqinpqr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pqr:pqinpqr= new pqinpqr();
  constructor(){

  }
  onSubmit(){
    
  }
}

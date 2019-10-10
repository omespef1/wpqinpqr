import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-xbauliq',
  templateUrl: './xbauliq.component.html',
  styleUrls: ['./xbauliq.component.css']
})
export class XbauliqComponent implements OnInit {
   today:Date = new Date();
   loading=false;
   logo:string;

  constructor() { }

  ngOnInit() {
  }

}

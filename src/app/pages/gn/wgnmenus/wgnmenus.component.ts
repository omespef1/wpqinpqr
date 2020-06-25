import { Component, OnInit, Input } from '@angular/core';
import { GnmenuService } from 'src/app/services/gn/gnmenu.service';
import { Router } from '@angular/router';
import { Gnmenu } from 'src/classes/gn/gnmenu';

@Component({
  selector: 'app-wgnmenus',
  templateUrl: './wgnmenus.component.html',
  styleUrls: ['./wgnmenus.component.css']
})
export class WgnmenusComponent implements OnInit {

  menus: Gnmenu = new Gnmenu();

  constructor(private _service: GnmenuService, private router: Router) { }

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    this._service.loadMenu().subscribe(resp => {
      this.menus = resp.ObjTransaction;
    });
  }


}

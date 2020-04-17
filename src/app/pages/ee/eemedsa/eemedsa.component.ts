import { Component, OnInit } from '@angular/core';
import { EemedsaService } from 'src/app/services/ee/eemedsa.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { gnItem } from 'src/classes/models';

@Component({
  selector: 'app-eemedsa',
  templateUrl: './eemedsa.component.html',
  styles: []
})
export class EemedsaComponent implements OnInit {

  public GnItemsIteServ: gnItem[];

  constructor( private _service: EemedsaService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.loadServicios();
  }

  loadServicios() {
    this._service.loadServiciosEncuesta().subscribe(resp => {
      this.GnItemsIteServ = resp.ObjTransaction;
    });
  }

}

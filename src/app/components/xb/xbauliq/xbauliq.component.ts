import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { XbauliqService } from "src/app/services/xb/xbauliq.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ComunicationsService } from "../../../../services/comunications.service";
import { GnempreService } from "../../../services/gn/gnempre.service";
import { ModalComponent } from "../../dialogs/modal/modal.component";
import { companies } from "src/classes/models";
import { XbAuliq } from "../../../../classes/xb/xbauliq";
import { GnempreComponent } from "../../gn/gnempre/gnempre.component";

@Component({
  selector: "app-xbauliq",
  templateUrl: "./xbauliq.component.html",
  styleUrls: ["./xbauliq.component.css"]
})
export class XbauliqComponent implements OnInit {
  @ViewChild(GnempreComponent) _EmpreModal: GnempreComponent;
  companies: companies[];
  today: Date = new Date();
  cacxcob: XbAuliq[] = [];
  loading = false;
  logo: string;
  emp_codi: number;
  constructor(
    private _service: XbauliqService,
    private spinner: NgxSpinnerService,
    private _gnempre: GnempreService
  ) {}

  ngOnInit() {
    this.loadCompanies();
  }

  GetAutliq() {
    this._service.GetXbAuliq(this.emp_codi, "88284896").subscribe(resp => {
      if (resp.retorno == 0) {
        this.cacxcob = resp.objTransaction;
      }
    });
  }

  loadCompanies() {
    this.spinner.show();
    this._gnempre.GetGnEmpre(`seven12`).subscribe((resp: any) => {
      this.companies = resp.objTransaction;
      this.spinner.hide();
      this._EmpreModal.present();
    });
  }
}

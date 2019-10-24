import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { XbauliqService } from "src/app/services/xb/xbauliq.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ComunicationsService } from "../../../../services/comunications.service";
import { GnempreService } from "../../../services/gn/gnempre.service";
import { ModalComponent } from "../../dialogs/modal/modal.component";
import { companies, ToTransaction } from "src/classes/models";
import { XbAuliq } from "../../../../classes/xb/xbauliq";
import { GnempreComponent } from "../../gn/gnempre/gnempre.component";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { error } from "util";
import * as moment from 'moment';
import { GnterceService } from '../../../services/gn/gnterce.service';
@Component({
  selector: "app-xbauliq",
  templateUrl: "./xbauliq.component.html",
  styleUrls: ["./xbauliq.component.css"]
})
export class XbauliqComponent implements OnInit {
  @ViewChild(GnempreComponent) _EmpreModal: GnempreComponent;
  companies: companies[];
  cacxcob: XbAuliq[] = [];
  loading = false;
  logo: string;
  emp_codi: number;
  client: string;
  ter_noco:string;
  usu_codi: string;
  par_fech: Date = new Date();
  today: Date= new Date();
  constructor(
    private _service: XbauliqService,
    private spinner: NgxSpinnerService,
    private _gnempre: GnempreService,
    private route: ActivatedRoute,
    private _terce:GnterceService
  ) {}

  async ngOnInit() {
    await this.GetUrlParams();
    this.GetGnTerce();
    this.loadCompanies();
  }

  GetAutliq() {
    this.loading = true;
    this._service.GetXbAuliq(this.emp_codi, this.client, moment(this.par_fech).format("YYYY-MM-DD")).subscribe(resp => {
      this.loading = false;
      console.log(resp);
      if (resp.Retorno === 0) {
        this.cacxcob = resp.ObjTransaction;
      }
    });
  }

  

  loadCompanies() {
    this.spinner.show();
    this._gnempre.GetGnEmpre(this.usu_codi).subscribe((resp: any) => {
      this.companies = resp.objTransaction;
      this.spinner.hide();
      this._EmpreModal.present();
    });
  }

  GetGnTerce(){
    this.spinner.show();
    this._terce.GetGnTerce(this.usu_codi).subscribe(resp=>{
      this.spinner.hide();
      if(resp.Retorno==0){
        this.ter_noco = resp.ObjTransaction.ter_noco;
      }
    })
  }

  async GetUrlParams() {
    try {
      this.route.queryParamMap.subscribe(queryParams=>{
        console.log(queryParams.get("client"));
        if (queryParams.get("client") == null)
          throw new error("Acceso no autorizado");
        this.client = atob(queryParams.get("client"));
        if (queryParams.get("usu_codi") == null)
          throw new error("Acceso no autorizado");
        this.usu_codi = atob(queryParams.get("usu_codi"));
      });
    } catch (err) {
        console.log(err);
    }
  }
  SetXbAutliq(){
  }
}

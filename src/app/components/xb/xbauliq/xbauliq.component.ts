import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { XbauliqService } from "src/app/services/xb/xbauliq.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ComunicationsService } from "../../../../services/comunications.service";
import { GnempreService } from "../../../services/gn/gnempre.service";
import { ModalComponent } from "../../dialogs/modal/modal.component";
import { companies, ToTransaction } from "src/classes/models";
import {
  XbAuliq,
  xbpceca,
  xbautliqp,
  PrintLiq
} from "../../../../classes/xb/xbauliq";
import { GnempreComponent } from "../../gn/gnempre/gnempre.component";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { error } from "util";
import * as moment from "moment";
import { GnterceService } from "../../../services/gn/gnterce.service";
import { XbpcecaService } from "../../../services/xb/xbpceca.service";
import { faddina } from "../../../../classes/fa/faddina";
import { FaddinaService } from "../../../services/fa/faddina.service";
import { FainaclService } from "../../../services/fa/fainacl.service";
import { fainacl } from "../../../../classes/fa/fainacl";
import { FaclienService } from "../../../services/fa/faclien.service";
import { Faclien } from "../../../../classes/fa/faclien";
// import { ToastService } from '../../../services/components/toast/toast.service';
import { ToastrService } from 'ngx-toastr';
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
  ter_noco: string;
  usu_codi: string;
  par_fech: Date = new Date();
  today: Date = new Date();
  service = { ite_ctse: 0, ite_nose: "" };
  faddina: faddina[] = [];
  fainacl: fainacl;
  faclien: Faclien;
  xbpceca: xbpceca = new xbpceca();
  constructor(
    private _service: XbauliqService,
    private spinner: NgxSpinnerService,
    private _gnempre: GnempreService,
    private route: ActivatedRoute,
    private _terce: GnterceService,
    private _xbpceca: XbpcecaService,
    private _faddina: FaddinaService,
    private _fainacl: FainaclService,
    private _faclien: FaclienService,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    await this.GetUrlParams();
    this.GetGnTerce();
    this.loadCompanies();
  }

  GetSettings() {
    this.GetXbPceca();
    this.GetFaddina();
    this.GetFaInacl();
  }
  GetXbPceca() {
    this._xbpceca.GetXbPceca(this.emp_codi).subscribe(resp => {
      console.log(resp);
      if (resp.Retorno == 0) {
        this.xbpceca = resp.ObjTransaction;
      }
    });
  }
  GetAutliq() {
    this.loading = true;
    this._service
      .GetXbAuliq(
        this.emp_codi,
        this.client,
        moment(this.par_fech).format("YYYY-MM-DD"),
        this.service.ite_ctse
      )
      .subscribe(resp => {
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

  GetGnTerce() {
    this.spinner.show();
    this._terce.GetGnTerce(this.usu_codi).subscribe(resp => {
      this.spinner.hide();
      if (resp.Retorno === 0) {
        this.ter_noco = resp.ObjTransaction.ter_noco;
      }
    });
  }

  GetFaclien() {
    this._faclien.GetFaclien(this.emp_codi, this.client).subscribe(resp => {
      if (resp.Retorno === 0) this.faclien = resp.ObjTransaction;
    });
  }
  async GetUrlParams() {
    try {
      this.route.queryParamMap.subscribe(queryParams => {
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

  GetFaInacl() {
    this._fainacl.GetFaInacl(this.emp_codi, this.client).subscribe(resp => {
      if (resp.Retorno == 0) {
        this.fainacl = resp.ObjTransaction;
      }
    });
  }
  SetXbAutliq() {
    this.loading = true;
    const aprobar = this.cacxcob.filter(c => c.liq_apro == true);

    const cuentas: xbautliqp = {
      emp_codi: this.emp_codi,
      cli_coda: this.client,
      cuentas: aprobar,
      usu_codi: this.usu_codi,
      par_fech: this.par_fech
    };

    this._service.SetXbAuliq(cuentas).subscribe(resp => {
      this.loading = false;
      if (resp.Retorno === 0) {
        for (const aproba of cuentas.cuentas) {
          aproba.print = true;
        }
      }
      else {
        this.toastr.success(resp.TxtRetorno, 'Error');
      }
        
    });
  }

  CuentasXaprobar() {
    const aprobar = this.cacxcob.filter(c => c.liq_apro == true);
    return aprobar.length === 0;
  }

  GetTotalContribucion() {
    const saldos = this.cacxcob
      .filter(
        item =>
          item.liq_apro === true && item.top_codi === this.xbpceca.top_coco
      )
      .reduce((sum, current) => sum + current.cxc_sald, 0);
    const interesesMora = this.cacxcob
      .filter(
        item =>
          item.liq_apro === true && item.top_codi === this.xbpceca.top_coco
      )
      .reduce((sum, current) => sum + current.cxc_inmo, 0);
    const intereseAnteriores = this.cacxcob
      .filter(
        item =>
          item.liq_apro === true && item.top_codi === this.xbpceca.top_coco
      )
      .reduce((sum, current) => sum + current.cxc_inan, 0);

    return saldos + intereseAnteriores + interesesMora;
  }

  GetTotalMultas() {
    const saldos = this.cacxcob
      .filter(
        item =>
          item.liq_apro === true && item.top_codi === this.xbpceca.top_core
      )
      .reduce((sum, current) => sum + current.cxc_sald, 0);
    const interesesMora = this.cacxcob
      .filter(
        item =>
          item.liq_apro === true && item.top_codi === this.xbpceca.top_core
      )
      .reduce((sum, current) => sum + current.cxc_inmo, 0);
    const intereseAnteriores = this.cacxcob
      .filter(
        item =>
          item.liq_apro === true && item.top_codi === this.xbpceca.top_core
      )
      .reduce((sum, current) => sum + current.cxc_inan, 0);

    return saldos + intereseAnteriores + interesesMora;
  }

  GetFaddina() {
    this._faddina.GetFaddina(this.emp_codi, this.client).subscribe(resp => {
      if (resp.Retorno === 0) this.faddina = resp.ObjTransaction;
    });
  }

  BuildPrint(item: XbAuliq) {
    try {
      this.loading = true;
      const newReport: PrintLiq = new PrintLiq();
      newReport.usu_codi = this.usu_codi;
      newReport.cli_coda = this.client;
      newReport.cxc_info = item;
      newReport.mun_nomb = this.faclien.mun_nomb;
      newReport.emp_codi = this.emp_codi;
      newReport.ina_refe = this.fainacl.ina_refe;
      newReport.ite_nose = this.service.ite_nose;
      this._service.print(newReport).subscribe(resp => {
        if (resp.Retorno === 0) {
          window.open(resp.ObjTransaction, "_black");
        }
      }, () => this.loading= false);
    } catch (error) {
      this.loading = false;
    }
    
  }

  // showSuccess(msg:string,header:string) {
  //   this.toastService.show(msg, {
  //     classname: 'bg-success text-light',
  //     delay: 2000 ,
  //     autohide: true,
  //     headertext: header
  //   });
  // }
}

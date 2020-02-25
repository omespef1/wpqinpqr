import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SuafiliService } from "../../../services/su/suafili.service";
import {
  ToTransaction,
  Transaction2
} from "../../../../classes/gn/ToTransaction";
import { Gnarbol } from "../../../../classes/gn/gnarbol";
import { GnarbolService } from "../../../services/gn/gnarbol.service";
import { NewTableSearchComponent } from "../../../components/tools/new-table-search/new-table-search.component";
import { CftasasService } from "../../../services/cf/cftasas.service";
import { cftasas } from "src/classes/cf/cftasas";
import { cfmodcr } from "../../../../classes/cf/cfmodcr";
import { CfmodcrService } from "../../../services/cf/cfmodcr.service";
import { CrRtmclService } from "../../../services/cr/crrtmcl.service";
import { cfscrevOut } from "src/classes/cf/cfsrevOut";
import { rtrtmcl } from '../../../../classes/cr/crrtmcl';
import { calicre } from "src/classes/ca/calicre";
import { SutrayeService } from '../../../services/su/sutraye.service';
import { suafili } from '../../../../classes/su/suafili';

@Component({
  selector: "app-scfscrev",
  templateUrl: "./scfscrev.component.html",
  styleUrls: ["./scfscrev.component.css"]
})
export class ScfscrevComponent implements OnInit {
  @ViewChild("modalSucursalesInfoBasica")
  _sucursalesInfoBasica: NewTableSearchComponent;
  @ViewChild("modalCfTasas") _modalCfTasas: NewTableSearchComponent;
  @ViewChild("modalCfModcr") _modalCfModcr: NewTableSearchComponent;
  scfscrev: cfscrevOut = new cfscrevOut();
  suafili:suafili = new suafili();
  cftasas: cftasas[] = [];
  tasaInfoCred = new cftasas();
  lineaCred:calicre = new calicre();
  cfmodcr: cfmodcr[] = [];
  modalidadInfoCred: cfmodcr = new cfmodcr();
  activeTab = 0;
  sucursales: Gnarbol[] = [];
  sucursalInfoBasica: Gnarbol = new Gnarbol("", "", 0, "", "");
  emp_codi = 102;
  today = new Date();
  afi_docu = "88284896";
  plazoInfoCred:number[]=[];

  constructor(
    private _suafili: SuafiliService,
    private _gnarbol: GnarbolService,
    private _cftasas: CftasasService,
    private _cfmodcr: CfmodcrService,
    private _crttmcl: CrRtmclService,
    private _sutraye:SutrayeService
  ) {}

  ngOnInit() {
    this.ReadSuAfili();
    this.getSucursalesInfoBasica();
    this.getCfTasas();
    this.getCfModcr();
  }

  SetScfScrev() {}

  async ReadSuAfili() {
    const result = <Transaction2>(
      await this._suafili.GetSuAfili(this.emp_codi, this.afi_docu).toPromise()
    );
    console.log(result.ObjTransaction);
    if (result != undefined && result.Retorno == 0) {
      // this.scfscrev = result.ObjTransaction;
      this.suafili = result.ObjTransaction;
    }
  }

  async getSucursalesInfoBasica() {
    const result = <Transaction2>(
      await this._gnarbol.GetGnArbol(this.emp_codi, 2).toPromise()
    );
    if (result != undefined && result.Retorno == 0) {
      this.sucursales = result.ObjTransaction;
    }
  }

  showSucursalesInfoBasica() {
    console.log(this.sucursales);
    // this._sucursalesInfoBasica.btnModalQb = 'btnSucursalInfoBasica';
    // this._sucursalesInfoBasica.ModalQb = 'modalSucursalInfoBasica';
    this._sucursalesInfoBasica.render(this.sucursales);
    this._sucursalesInfoBasica.show();
  }
  showCfTasasModal() {
    console.log(this.cftasas);
    this._modalCfTasas.render(this.cftasas);
    this._modalCfTasas.show();
  }

  showCfModcrModal() {
    console.log(this.cfmodcr);
    this._modalCfModcr.render(this.cfmodcr);
    this._modalCfModcr.show();
  }
  async getCfTasas() {
    const tasasTran = await this._cftasas.GetCfTasas(this.emp_codi).toPromise();
    if (tasasTran != undefined && tasasTran.Retorno == 0) {
      this.cftasas = tasasTran.ObjTransaction;
    }
  }

  SetSucursalBasica(row: any) {
    console.log(row);

    this.sucursalInfoBasica = row;
  }

  SetCfTasas(row: any) {
    this.tasaInfoCred = row;
    this.searchLine();
  }

  SetCfModcr(row: any) {
    console.log(row);
    this.modalidadInfoCred = row;
    this.searchLine();
  }

  async getCfModcr() {
    const modcrTran = await this._cfmodcr.GetCfmodcr(this.emp_codi).toPromise();
    if (modcrTran != undefined && modcrTran.Retorno == 0) {
      this.cfmodcr = modcrTran.ObjTransaction;
    }
  }

  searchLine() {

    if(this.modalidadInfoCred.mod_cont>0 && this.tasaInfoCred.tas_cont>0){
    this._crttmcl
      .GetCrRtmcl(
        this.emp_codi,
        this.tasaInfoCred.tas_cont,
        this.modalidadInfoCred.mod_cont,
        this.scfscrev.dcl_icac
      )
      .subscribe(resp => {
          if(resp!=undefined && resp.Retorno == 0){
            let infoLinea:rtrtmcl = resp.ObjTransaction;            
            this.lineaCred = { lic_cont:infoLinea.lic_cont, lic_nomb:infoLinea.lic_nomb } ;
            this.loadPlaz(infoLinea.rtm_plaz)
          }
      });
    }
  }

  loadPlaz(max:number){
    for(let i=1;i<= max;i++){
      this.plazoInfoCred.push(i);
    }
  }

  GeSuTraye(){
    this._sutraye.GetSuTraye(this.emp_codi,this.scfscrev)
  }
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SuafiliService } from "../../../services/su/suafili.service";
import {
  ToTransaction,
  Transaction2
} from "../../../../classes/gn/ToTransaction";
import { Gnarbol } from "../../../../classes/gn/gnarbol";
import { GnarbolService } from "../../../services/gn/gnarbol.service";
import { NewTableSearchComponent } from '../../../components/tools/new-table-search/new-table-search.component';
import { CftasasService } from "../../../services/cf/cftasas.service";
import { cftasas } from "src/classes/cf/cftasas";
import { cfmodcr } from "../../../../classes/cf/cfmodcr";
import { CfmodcrService } from "../../../services/cf/cfmodcr.service";
import { CrRtmclService } from "../../../services/cr/crrtmcl.service";
import { cfscrevOut } from "src/classes/cf/cfsrevOut";
import { rtrtmcl } from "../../../../classes/cr/crrtmcl";
import { calicre } from "src/classes/ca/calicre";
import { SutrayeService } from "../../../services/su/sutraye.service";
import { suafili } from "../../../../classes/su/suafili";
import { sutraye } from "../../../../classes/su/sutraye";
import { infocodeu } from "src/classes/su/infocodeu";
import { CfcodeuService } from "../../../services/cf/cfcodeu.service";
import { GntipdoService } from "../../../services/gn/gntipdo.service";
import { gntipdo } from "../../../../classes/gn/gntipdo";
import { Cfcodeu } from "src/classes/cf/cfcodeu";
import { ComunicationsService } from "../../../../services/comunications.service";
import { GndivpoService } from "../../../services/gn/gndivpo.service";
import { Gndivpo } from "../../../../classes/gn/gndivpo";
import { cfscrev } from "src/classes/cf/cfscrev";
import { cfrefen } from "../../../../classes/cf/cfrefen";
import { gnItem } from "../../../../classes/models";
import { GnitemsService } from "../../../services/gn/gnitems.service";
import { CfscrevService } from "src/app/services/cf/cfscrev.service";
import { ToastService } from '../../../services/utils/toast.service';

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
  @ViewChild("modalDivPolInfCodRe")
  _modalDivPolInfCodRe: NewTableSearchComponent;
  @ViewChild("modalDivPolInfLab") _modalDivPolInfLab: NewTableSearchComponent;
  @ViewChild("modalDivPolInfCodExp") _modalDivPolInfCodExp: NewTableSearchComponent;
  @ViewChild("DivPolrRefPers")_modalDivPolrRefPers: NewTableSearchComponent;
  @ViewChild("DivPolrRefFami")_modalDivPolrRefFami: NewTableSearchComponent;
  @ViewChild("DivPolCiudNac")_DivPolCiudNac: NewTableSearchComponent;
  @ViewChild("DivPolCiudInfEmpl")_DivIndEmpl: NewTableSearchComponent;
  
  
  // Variable de consulta para informacion básica del afiliado
  suafili: suafili = new suafili();
  // Variable de consulta para tasas
  cftasas: cftasas[] = [];
  // Variable de consulta para tasa seleccionada
  tasaInfoCred = new cftasas();
  // Variable para meses disponibles
  plazoInfoCred: number[] = [];
  // Variable de consulta para línea de crédito
  lineaCred: calicre = new calicre();
  // Variable de consulta para modalidades
  cfmodcr: cfmodcr[] = [];
  // Variable de consulta para modalidades
  modalidadInfoCred: cfmodcr = new cfmodcr();
  // Variable valor crédito
  inf_vcre = 0;
  // variable plazo
  inf_plaz = 0;
  // Variable fecha de pago primera cuota
  afi_fprc: Date = new Date();
  // Variable labora?
  afi_lab = false;
  activeTab = 0;
  gn;
  // Variable de consulta para sucursales
  sucursales: Gnarbol[] = [];
  sucursalInfoBasica: Gnarbol = new Gnarbol("", "", 0, "", "");
  emp_codi = 102;
  today = new Date();
  afi_docu = "88284896";
  informacionLaboral: sutraye = new sutraye();
  informacionCodeudor: infocodeu = new infocodeu();
  tiposDocumento: gntipdo[] = [];
  // Variable para controlar cuando el conductor ya existe o cuando se está creando uno nuevo
  codeudorExiste: false;
  // Variable que carga la división política
  divisionPolitica: Gndivpo[];
  // Variable para manejar el nuevo codeudor generado el que se va a actualizar
  codeudor: Cfcodeu = new Cfcodeu();
  // Varibale para manejar la solicitud de crédito
  credito: cfscrev = new cfscrev();
  // Variable que indica si ya se guardó la información del creédito;
  creditoGuardado = false;
  // Variable para controlar si se muestra el tab de información laboral
  trabaja: boolean = false;
  // Variable de referencia personal
  refpers: cfrefen = new cfrefen();
  // Variable que contiene los items de parentezco
  itemsParentesco: gnItem[] = [];
// Nombre de la ciudad seleccioanda en referencias personales
  mun_nombRP: string;
  // Variable de referencia familiar
  mun_nombRF:string;
  // Variable para controlar icono mostrado en boton enviar solicitud
  sendingCred=false;

  reffami:cfrefen= new cfrefen();
  constructor(
    private _suafili: SuafiliService,
    private _gnarbol: GnarbolService,
    private _cftasas: CftasasService,
    private _cfmodcr: CfmodcrService,
    private _crttmcl: CrRtmclService,
    private _sutraye: SutrayeService,
    private _cfcodeu: CfcodeuService,
    private _gntipdo: GntipdoService,
    private _gndivpo: GndivpoService,
    private _gnitems: GnitemsService,
    private _cfscrev:CfscrevService,
    private toastService:ToastService
  ) {}




  ngOnInit() {
    this.ReadSuAfili();
    this.getSucursalesInfoBasica();
    this.getCfTasas();
    this.getCfModcr();
    this.GetGnTipdo();
    this.GetGnDivpo();
    this.GetParentescos();
  }

  async ReadSuAfili() {
    const result = <Transaction2>(
      await this._suafili.GetSuAfili(this.emp_codi, this.afi_docu).toPromise()
    );
    console.log(result.ObjTransaction);
    if (result !== undefined && result.Retorno === 0) {
      // this.scfscrev = result.ObjTransaction;
      this.suafili = result.ObjTransaction;
      this.GeSuTraye();
    }
  }

  async getSucursalesInfoBasica() {
    const result = <Transaction2>(
      await this._gnarbol.GetGnArbol(this.emp_codi, 2).toPromise()
    );
    if (result !== undefined && result.Retorno === 0) {
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

  showDivision() {
    console.log(this.divisionPolitica);
    this._modalCfModcr.render(this.divisionPolitica);
    this._modalCfModcr.show();
  }

  showDivisionInfLaboral() {
    console.log(this.divisionPolitica);
    this._modalDivPolInfLab.render(this.divisionPolitica);
    this._modalDivPolInfLab.show();
  }

  showDivisionInfCodRe() {
    console.log(this.divisionPolitica);
    this._modalDivPolInfCodRe.render(this.divisionPolitica);
    this._modalDivPolInfCodRe.show();
  }
  showDivIndEmpl(){

  }
  showDivisionRefPers() {
    console.log(this.divisionPolitica);
    this._modalDivPolrRefPers.render(this.divisionPolitica);
    this._modalDivPolrRefPers.show();
  }
  showDivisionRefFami() {
    console.log(this.divisionPolitica);
    this._modalDivPolrRefFami.render(this.divisionPolitica);
    this._modalDivPolrRefFami.show();
  }
  showDivPolInfCodExp() {
    this._modalDivPolInfCodExp.render(this.divisionPolitica);
    this._modalDivPolInfCodExp.show();
  }
  showDivPolCiudNac() {
    this._DivPolCiudNac.render(this.divisionPolitica);
    this._DivPolCiudNac.show();
  }

  showDivisionDivIndEmpl(){
    this._DivIndEmpl.render(this.divisionPolitica);
    this._DivIndEmpl.show();
  }
  async getCfTasas() {
    const tasasTran = await this._cftasas.GetCfTasas(this.emp_codi).toPromise();
    if (tasasTran !== undefined && tasasTran.Retorno === 0)
      this.cftasas = tasasTran.ObjTransaction;
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
  SetDivPolInfCodRe(row: Gndivpo) {
    console.log(row);
    this.codeudor.pai_codr = row.pai_codi;
    this.codeudor.reg_codr = row.reg_codi;
    this.codeudor.dep_codr = row.dep_codi;
    this.codeudor.mun_codr = row.mun_codi;
    this.informacionCodeudor.mun_codc = row.mun_nomb;
  }

  SetDivPolInfLab(row: any) {
    console.log(row);
    this.credito.pai_codu = row.pai_codi;
    this.credito.reg_codu = row.reg_codi;
    this.credito.dep_codu = row.dep_codi;
    this.credito.mun_codu = row.mun_codi;
    this.informacionLaboral.mun_nomb = row.mun_nomb;
  }
  SetDivPolInfCodExp(row: any) {
    console.log(row);
    this.codeudor.pai_cocc = row.pai_codi;
    this.codeudor.reg_cocc = row.reg_codi;
    this.codeudor.dep_cocc = row.dep_codi;
    this.codeudor.mun_cocc = row.mun_codi;
    this.informacionCodeudor.mun_cocn = row.mun_nomb;
  }
  SetDivPolrRefPers(row:any){
    this.refpers.pai_codi = row.pai_codi;
    this.refpers.reg_codi = row.reg_codi;
    this.refpers.dep_codi = row.dep_codi;
    this.refpers.mun_codi = row.mun_codi;
    this.mun_nombRP = row.mun_nomb;

  }
  SetDivPolrRefFami(row:any){
    this.reffami.pai_codi = row.pai_codi;
    this.reffami.reg_codi = row.reg_codi;
    this.reffami.dep_codi = row.dep_codi;
    this.reffami.mun_codi = row.mun_codi;
    this.mun_nombRF = row.mun_nomb;

  }

  SetDivPolCiudNac(row:any){
    this.codeudor.pai_codn = row.pai_codi;
    this.codeudor.reg_codn = row.reg_codi;
    this.codeudor.dep_codn = row.dep_codi;
    this.codeudor.mun_codn = row.mun_codi;
    this.informacionCodeudor.mun_conn = row.mun_nomb;
  }
  SetDivPolCiudInfEmpl(row:any){
    this.codeudor.pai_codc = row.pai_codi;
    this.codeudor.reg_codc = row.reg_codi;
    this.codeudor.dep_codc = row.dep_codi;
    this.codeudor.mun_codc = row.mun_codi;
    this.codeudor.mun_cemp = row.mun_nomb;
  }
  async getCfModcr() {
    const modcrTran = await this._cfmodcr.GetCfmodcr(this.emp_codi).toPromise();
    if (modcrTran !== undefined && modcrTran.Retorno === 0) {
      this.cfmodcr = modcrTran.ObjTransaction;
    }
  }

  searchLine() {
    if (this.modalidadInfoCred.mod_cont > 0 && this.tasaInfoCred.tas_cont > 0) {
      this._crttmcl
        .GetCrRtmcl(
          this.emp_codi,
          this.tasaInfoCred.tas_cont,
          this.modalidadInfoCred.mod_cont,
          this.suafili.dcl_icac
        )
        .subscribe(resp => {
          if (resp !== undefined && resp.Retorno === 0) {
            const infoLinea: rtrtmcl = resp.ObjTransaction;
            this.lineaCred = {
              lic_cont: infoLinea.lic_cont,
              lic_nomb: infoLinea.lic_nomb
            };
            this.loadPlaz(infoLinea.rtm_plaz);
            this.credito.top_codi = infoLinea.top_codi;
          }
        });
    }
  }

  loadPlaz(max: number) {
    for (let i = 1; i <= max; i++) this.plazoInfoCred.push(i);
  }

  GeSuTraye() {
    this._sutraye
      .GetSuTraye(this.emp_codi, this.suafili.afi_cont)
      .subscribe(resp => {
        console.log(resp.ObjTransaction);
        this.informacionLaboral = resp.ObjTransaction;
      });
  }

  searchCodeu() {
    this._cfcodeu
      .GetCfCodeu(this.emp_codi, this.informacionCodeudor.cod_dnum)
      .subscribe(resp => {
        if (resp !== undefined && resp.Retorno === 0) {
          console.log(this.informacionCodeudor);
          if (resp.ObjTransaction != null)
            this.informacionCodeudor = resp.ObjTransaction;
          else this.informacionCodeudor = new infocodeu();
        }
      });
  }

  private GetGnTipdo(): void {
    this._gntipdo.GetGnTipdo().subscribe(resp => {
      if (resp !== undefined && resp.Retorno === 0) {
        this.tiposDocumento = resp.ObjTransaction;
      }
    });
  }

  private SetCfCodeu() {
    this.codeudor.cod_dnum = this.informacionCodeudor.cod_dnum;
    this.codeudor.tip_codi = this.informacionCodeudor.tip_codi;
    this.codeudor.cod_sexo = this.informacionCodeudor.cod_sexo;
    this.codeudor.cod_nom1 = this.informacionCodeudor.cod_nom1;
    this.codeudor.cod_nom2 = this.informacionCodeudor.cod_nom2;
    this.codeudor.cod_ape1 = this.informacionCodeudor.cod_ape1;
    this.codeudor.cod_ape2 = this.informacionCodeudor.cod_ape2;
    this.codeudor.cod_prof = this.informacionCodeudor.cod_prof;
    this.codeudor.cod_nest = this.informacionCodeudor.cod_nest;
    this.codeudor.mun_codn = this.informacionCodeudor.mun_codn;
  }

  GetGnDivpo() {
    this._gndivpo.GetGnDivpo().subscribe(resp => {
      if (resp !== undefined && resp.Retorno === 0)
        this.divisionPolitica = resp.ObjTransaction;
    });
  }
  SetScfScrev() {}

  GoTab(pageNumber: number) {
    console.log("pulsado");
    switch (pageNumber) {
      case 1:
        document.getElementById("nav-info-basic").click();
        break;
      case 2:
        document.getElementById("nav-info-lab").click();
        break;
      case 3:
        document.getElementById("nav-info-codeu").click();
        break;
      case 4:
        document.getElementById("nav-info-codeu-lab").click();
        break;
      case 5:
        document.getElementById("nav-info-codeu-lab-indep").click();
        break;
      case 6:
        document.getElementById("nav-ref-pers").click();
        break;
      case 7:
        document.getElementById("nav-ref-fami").click();
    }
  }

  private GetParentescos(): void {
    this._gnitems.GetGnItems(249).subscribe(resp => {
      if (resp !== undefined && resp.Retorno == 0) {
        this.itemsParentesco = resp.ObjTransaction;
      }
    });
  }

  SendRequest(){
    this.sendingCred=true;
    this.credito.emp_codi = this.emp_codi;    
    this.credito.cli_codi = this.suafili.cli_codi;
  this.credito.tip_codi = this.suafili.tip_codi;
  this.credito.arb_sucu = this.sucursalInfoBasica.arb_cont;
  this.credito.scr_gene = this.suafili.afi_gene;
  this.credito.scr_dire = this.suafili.afi_dire;
  this.credito.scr_tele = this.suafili.afi_tele;
  this.credito.scr_mail = this.suafili.afi_mail;
  this.credito.lic_cont = this.lineaCred.lic_cont;
  this.credito.scr_nent = this.informacionLaboral.apo_razs;
  this.credito.scr_teem = Number(this.informacionLaboral.dsu_tele);
  this.credito.scr_diem = this.informacionLaboral.dsu_dire;
  this.credito.pai_codu = this.informacionLaboral.pai_codi;
  this.credito.dep_codu = this.informacionLaboral.dep_codi;
  this.credito.reg_codu = this.informacionLaboral.reg_codi;
  this.credito.mun_codu = this.informacionLaboral.mun_codi;
  this.credito.scr_sala = this.informacionLaboral.tra_salb;
  this.credito.scr_care = this.informacionLaboral.itn_carg;
    this._cfscrev.SetCfScrev(this.credito).subscribe(resp=>{
     this.sendingCred=false;
      if(resp!=undefined && resp.Retorno==0){
        
      }
      else {
        this.showError();
      }
    })
    

  }

  showError() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Error!!!'
    });

 
}
}

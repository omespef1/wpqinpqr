import { gnarbol } from "./gn/gnarbol";

export interface gnItem {
  ite_nomb: string;
  ite_codi: string;
  ite_cont: number;
}
export class pqinpqr {


  public emp_codi: number=0;
  public inp_cont: number;
  public inp_nide: string = "";
  public inp_nomb: string = "";
  public inp_apel: string = "";
  public inp_ntel: string = "";
  public inp_mail: string = "";
  public ite_tpqr: string = "";
  public inp_mpqr: string = "";
  public ite_tipi: string = "";
  public ite_stip: string = "";
  public inp_tido: string = "";
  public inp_dire: string = "";
  public inp_ncel: string = "";
  public pai_codi: number;
  public dep_codi: number;
  public mun_codi: string;
  public reg_codi: number;
  public inp_mres: string = "";
  public ite_frec: string = "";
  public inp_gper: number;
  public adj_file: File = null;
  public inp_tcli: string;
  public arb_sucu: string;
  public arb_nomb: string;
  public con_cont: number;
  public arb_care: number;
  public usu_codi: string;
  public cas_cont: number;
  public inp_fech: Date;
  public dig_valo: string;
  seguimientos: any[];
}
export class ask {
  askText: string;
  askOptions: option[];
  answer:string;
  constructor(
    askText: string,
    askOptions: option[],
    answer:string=""

  ) {
    this.askText = askText;
    this.askOptions = askOptions;
    this.answer = answer;
  }


}

export class option {
  answerText: string;
  checked: boolean;
  constructor(answerText: string = "", checked: boolean = false) {
    this.answerText = answerText;
    this.checked = checked;
  }
}

export class pqEncue {
  enc_cont:number;
  inp_cont:number;
  tip_codi:number;
  enc_docu :string;
  enc_nomb :string;
  enc_apel:string;
  enc_preg :string;
  enc_resp :string;
  enc_fech:Date;
  emp_codi:number;
  constructor(
    enc_cont:number=0,
    inp_cont:number=0 ,
    tip_codi:number=0 ,
    enc_docu :string="",
    enc_nomb :string="",
    enc_apel:string="",
    enc_preg :string="",
    enc_resp :string="",
    enc_fech:Date = null
  ){

  }
}
export interface ToTransaction{
  Retorno:number;
  TxtError:string,
  ObjTransaction:any
}
export interface  ToTransactionSafe<T> {
  Retorno: number;
  TxtError: string;
  ObjTransaction: T;
}

export interface companies {
  emp_nomb:string;
  emp_codi:number;
}

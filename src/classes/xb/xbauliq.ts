export class XbAuliq {
  emp_codi:number;
  ite_ctse: number;
  cts_nomb: string;
  rcx_vige: number;
  top_codi: number;
  top_nomb: string;
  cxc_desc: string;
  cxc_tota: number;
  cxc_sald: number;
  dpa_tari:number;
  Par_Fech: Date;
  liq_apro: boolean;
  error: string;
  cxc_inmo: number;
  cxc_inan: number;
  liq_lock:boolean;
  print:boolean;
}
export class xbautliqp {
  emp_codi: number;
  cli_coda: string;
  usu_codi:string;
  par_fech:Date;
  cuentas: XbAuliq[];
}

export class xbpceca {
  emp_codi: number;
  top_coco: number;
  pce_deco: string;
  pro_coco: number;
  bod_coco: number;
  dsp_coco: string;
  top_como: number;
  pce_demo: string;
  pro_como: number;
  bod_como: number;
  dsp_como: string;
  pce_numberm: number;
  top_core: number;
  pce_demu: string;
  pro_comu: number;
  pce_cosd: number;
  top_cocp: number;
  usu_codp: string;
  pce_crgp: string;
  top_cocm: number;
  arb_suco: number;
  arb_ceco: number;
  arb_arco: number;
  arb_prco: number;
  arb_sumo: number;
  arb_cemo: number;
  arb_armo: number;
  arb_prmo: number;
  pce_digr: number;
  top_comi: number;
  arb_sumi: number;
  arb_cemi: number;
  arb_armi: number;
  arb_prmi: number;
  pro_comi: number;
}

export class PrintLiq {
  emp_nomb :number;
   emp_codi :number;
  usu_codi :string;
   cli_coda :string;
   cli_noco :string;
   cli_dire :string;
  mun_nomb :string;
   dep_nomb :string;
   ite_nose :string;
  ina_refe :string;
  cxc_info :XbAuliq;

}

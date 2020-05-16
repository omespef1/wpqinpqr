export class SfFovis {

    public for_cont: number;
    public for_nume: number;
    public for_fech = new Date;
    public for_fasi: Date;
    public for_esta: string;
    public for_fvig: Date;
    public for_fpro: Date;
    public mod_cont: number;
    public for_insf: string;
    public rad_cont: number;
    public rad_nume: number;
    public num_sala: string;
    public val_tdat = false;

    public InfoAportante: InfoAportante  = new InfoAportante();
    public InfoConyuge: InfoAportante  = new InfoAportante();
    public InfoEmpresa: InfoEmpresa = new InfoEmpresa();
    public InfoGnmasal: Gnmasal = new Gnmasal();
}

export class InfoAportante {

    public afi_edad: number;
    public ite_tipp: string;
    public ite_ocup: string;
    public for_sala = 0;
    public for_cond: string;
    public for_post: number;
    public tip_codi: number;
    public afi_cont: number;
    public afi_docu: string;
    public tip_nomb: string;
    public afi_nom1: string;
    public afi_nom2: string;
    public afi_ape1: string;
    public afi_ape2: string;
    public afi_fecn: string;
    public afi_esci: string;
    public afi_cate: string;
    public afi_dire: string;
    public afi_gene: string;
    public ite_codi_tp: string;
    public ite_nomb_tp: string;
    public ite_codi_oc: string;
    public ite_nomb_oc: string;

    public pai_codi: string;
    public pai_nomb: string;
    public reg_codi: string;
    public reg_nomb: string;
    public dep_codi: string;
    public dep_nomb: string;
    public loc_codi: string;
    public loc_nomb: string;
    public mun_codi: string;
    public mun_nomb: string;
    public bar_codi: string;
    public bar_nomb: string;

    public afi_mail: string;
    public afi_tele: string;
    public afi_tel2: string;
    public afi_cony: string;

    public for_tdat: string;
    public for_ting: number;
    public for_timh: number;
    public for_nmie: number;
    public for_apr: number;
    public afi_cond: string;
    public apo_razs: string;
    public afi_ipil: number;
    public mpa_nomb: string;
}

export class InfoEmpresa {
    public apo_coda = '';
    public apo_razs: string;
    public tia_codi: string;
    public tia_nomb: string;
    public dep_codi: string;
    public dep_nomb: string;
    public mun_codi: string;
    public mun_nomb: string;
    public dsu_dire: string;
}

export class InfoModvi {
    public mod_cont: string;
    public mod_nomb: string;
    public tco_codi: number;
    public tco_nomb: string;
}

export class InfoDmodv {
    public dmo_rsmd: number;
    public dmo_rsmh: number;
    public dmo_fsvs: number;
    public dfo_vsol: number;
    public mod_cspm = '';
    public tco_zona = '';
}

export class Gnmasal {
    public mas_vrsm = 0;
    public mas_vrsi = 0;
}

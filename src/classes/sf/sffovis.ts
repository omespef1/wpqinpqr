export class SfFovis {

    public InfoAportante: InfoAportante  = new InfoAportante();
    public InfoConyuge: InfoAportante  = new InfoAportante();
    public InfoNovedades: InfoNovedades[] = [];
    public InfoTrayectoria: InfoTrayectoria[] = [];
    public InfoSuPerca: InfoSuPerca[] = [];
    public InfoOtrosMiembros: InfoOtrosMiembros[] = [];
    public InfoModvi: InfoModvi  = new InfoModvi();
}

export class InfoAportante {
    public for_cont: number;
    public for_nume: number;
    public for_fech = new Date;
    public for_esta: string;
    public for_fvig: Date;
    public for_fpro: Date;
    public mod_cont: string;
    public for_insf: string;
    public rad_cont: number;
    public afi_edad: number;
    public for_fasi: Date;
    public ite_tipp: string;
    public ite_ocup: string;
    public for_sala: number;
    public for_cond: string;
    public for_post: number;
    public mod_nomb: string;
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
    public rad_nume: number;
    public ite_codi_tp: string;
    public ite_nomb_tp: string;
    public ite_codi_oc: string;
    public ite_nomb_oc: string;
    public tco_codi: number;
    public tco_nomb: string;
    public tco_zona: string;
    public bar_nomb: string;
    public loc_nomb: string;
    public mun_nomb: string;
    public dep_nomb: string;
    public reg_nomb: string;
    public pai_nomb: string;
    public pai_codi: number;
    public reg_codi: number;
    public dep_codi: number;
    public mun_codi: number;
    public loc_codi: number;
    public bar_codi: number;
    public afi_mail: string;
    public afi_tele: string;
    public afi_cony: string;
    public mod_cspm: string;
    public for_tdat: string;
    public for_ting: number;
    public for_timh: number;
    public for_nmie: number;
    public for_apr: number;
    public afi_cond: string;
    public apo_razs: string;
    public afi_ipil: string;

    constructor() {
        this.for_cond = '';
        this.for_sala = 0;
        this.for_timh = 0;
    }
}

export class InfoConyuge {
    public for_cont: number;
    public dfo_cont: number;
    public afi_cont: number;
    public dfo_tipo: string;
    public dfo_docu: string;
    public dfo_nom1: string;
    public dfo_nom2: string;
    public dfo_ape1: string;
    public dfo_ape2: string;
    public dfo_fecn: Date;
    public dfo_esci: string;
    public dfo_gene: string;
    public dfo_cond: string;
    public dfo_sala: number;
    public dfo_ipil: number;
    public apo_razs: string;
    public ite_codi_tp: number;
    public ite_nomb_tp: string;
    public ite_codi_oc: number;
    public ite_nomb_oc: string;
}

export class InfoNovedades {
    public top_codi: number;
    public top_nomb: string;
    public ret_nume: number;
    public ret_fech: Date;
    public ret_desc: string;
    public ret_esta: string;
    public codigo: string;
    public programa: string;
}

export class InfoTrayectoria {
    public for_cont: number;
    public rad_cont: string;
    public dfo_fech: Date;
    public rad_nume: number;
    public rad_fech: Date;
    public cra_codi: number;
    public cra_nomb: string;
    public secuencia: number;
}

export class InfoSuPerca {
    public for_cont: number;
    public dfo_cont: number;
    public afi_cont: number;
    public dfo_tipo: string;
    public dfo_docu: string;
    public dfo_nom1: string;
    public dfo_nom2: string;
    public dfo_ape1: string;
    public dfo_ape2: string;
    public mpa_nomb: string;
    public dfo_fecn: Date;
    public dfo_esci: string;
    public dfo_gene: string;
    public dfo_cond: string;
    public dfo_sala: number;
    public ite_codi_tp: number;
    public ite_nomb_tp: string;
    public ite_codi_oc: number;
    public ite_nomb_oc: string;

    constructor () {
        this.dfo_docu = '';
    }

}

export class InfoOtrosMiembros {
    public for_cont: number;
    public dfo_cont: number;
    public afi_cont: number;
    public dfo_tipo: string;
    public dfo_docu: string;
    public dfo_nom1: string;
    public dfo_nom2: string;
    public dfo_ape1: string;
    public dfo_ape2: string;
    public mpa_nomb: string;
    public dfo_fecn: Date;
    public dfo_esci: string;
    public dfo_gene: string;
    public dfo_cond: string;
    public dfo_sala: number;
    public ite_codi_tp: number;
    public ite_nomb_tp: string;
    public ite_codi_oc: number;
    public ite_nomb_oc: string;
    public ite_codi_pa: string;
    public ite_nomb_pa: string;

    constructor () {
        this.dfo_docu = '';
    }
}

export class InfoModvi {
    public dmo_rsmd: number;
    public dmo_rsmh: number;
    public dmo_fsvs: number;
}


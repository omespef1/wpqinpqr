export class SfFovis {

    public emp_codi: number;
    public for_cont: number;
    public for_nume: number;
    public for_esta: string;
    public for_insf: string;
    public for_tdat: string;
    public mod_cont: number;
    public mod_nomb: string;
    public tco_codi: number;
    public tco_nomb: string;

    public infoHogar: InfoDfoih = new InfoDfoih();
    public postulante: InfoAportante  = new InfoAportante();
    public conyuge: InfoAportante  = new InfoAportante();
    public InfoSfDfomhP: InfoAportante[] = [];
    public InfoSfDfomhO: InfoAportante[] = [];
    public InfoEmpresa: InfoEmpresa[] = [];
    public InfoGnmasal: Gnmasal = new Gnmasal();

    public InfodforeA: SfDfore[] = [];
    public InfodforeR: SfDfore[] = [];

    constructor() {
        this.for_tdat = 'N';
    }
}

export class InfoAportante {

    public dfo_cont: number;
    public afi_edad: number;
    public for_sala = 0;
    public for_cond = '';
    public tip_codi: number;
    public tip_nomb: string;
    public afi_cont: number;
    public afi_docu: string;
    public afi_nom1: string;
    public afi_nom2: string;
    public afi_ape1: string;
    public afi_ape2: string;
    public afi_fecn = '';
    public afi_esci = '';
    public afi_cate: string;
    public afi_dire: string;
    public afi_gene = '';
    public ite_ocup: number;
    public ite_codi: string;
    public ite_nomb: string;
    public afi_mail: string;
    public afi_tele: string;
    public afi_tel2: string;
    public apo_razs: string;
    public for_ipil: number;
    public ite_pare: number;
    public mpa_codi: string;
    public mpa_nomb: string;
    public ite_tipp: number;
    public dep_codi: string;
    public dep_nomb: string;
    public mun_codi: string;
    public mun_nomb: string;
    public bar_codi: string;
    public bar_nomb: string;

    constructor() {
        this.afi_cont = 0;
    }
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
    public tra_prin: string;
}

export class InfoModvi {
    public mod_cont: number;
    public mod_nomb: string;
    public tco_codi: number;
    public tco_nomb: string;
}

export class InfoDfoih {
    public dmo_rsmd: number;
    public dmo_rsmh: number;
    public dmo_fsvs: number;
    public dfo_vsol: number;
    public dep_codi: string;
    public dep_nomb: string;
    public mun_codi: string;
    public mun_nomb: string;
    public bar_codi: string;
    public bar_nomb: string;
    public dfo_tele: string;
    public dfo_nitc: number;
    public dfo_fesc: Date;
    public dfo_matr: string;
    public dfo_escr: string;
    public dfo_lurb = 'N';
    public dfo_nomc = '';
    public dfo_nomp = '';
    public dfo_vpre: number;
    public dfo_vlot: number;
    public dfo_vtvi: number;
    public dfo_tota = 0;
    public mod_cspm = '';
    public tco_zona: string;
    public num_sala: number;

    public for_ting: number;
    public for_timh: number;
    public for_nmie: number;
    public pvd_codi = 0;
}

export class Gnmasal {
    public mas_vrsm = 0;
    public mas_vrsi = 0;
}

export class SfDfore {
    public dfo_cont: number;
    public dfo_tipo: string;
    public dfo_sald: number;
    public con_cont: number;
    public con_codi: number;
    public con_nomb: string;
    public Infoddfor: SfDdfor[];
}

export class SfDdfor {
    public ddf_cont: number;
    public dfo_cont: number;
    public dfo_tipo: string;
    public con_codi: number;
    public ddf_entc: string;
    public ddf_entd: string;
    public ddf_numc: string;
    public ddf_feca: Date;
    public ddf_feci: Date;
    public ddf_fecc: Date;

    constructor() {
        this.con_codi = 0;
        this.ddf_entc = '';
        this.ddf_entd = '';
        this.ddf_numc = '';
        this.ddf_feca = null;
        this.ddf_feci = null;
        this.ddf_fecc = null;
    }
}

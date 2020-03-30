import { InfoAportante, SfFovis } from './sffovis';

export class SfForpo {
    public InfoAportante: SfFovis  = new SfFovis();
    public InfoSfDfomhP: InfoAportante[] = [];
    public InfoSfDfomhO: InfoAportante[] = [];
    public InfoHogar: InfoHogar  = new InfoHogar();
    public Infodfore: SfDfore[] = [];
    public Infoddfor: SfDdfor[] = [];
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
}

export class InfoHogar {

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
    public dfo_dire: string;
    public dfo_tele: string;
    public dfo_vsol: number;
    public dfo_vpre: number;
    public dfo_vlot: number;
    public dfo_vtvi: number;
    public dfo_tota = 0;
    public dfo_fesc: Date;
    public dfo_matr: string;
    public dfo_escr: string;
    public dfo_lurb = 'N';
    public dfo_nitc: number;
    public dfo_nomc = '';
    public dfo_nomp = '';
}

export class SfDfore {
    public dfo_tipo: string;
    public dfo_sald: number;
    public con_cont: number;
    public con_codi: number;
    public con_nomb: string;
}

export class SfDdfor {
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
    }
}


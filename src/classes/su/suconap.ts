export class ArApovoInfo {
    public apo_cont: number;
    public apo_coda: string;
    public apo_razs: string;
    public apo_fcha: string;
    public tip_abre: string;
    public tip_abrr: string;
    public ter_coda: string;
    public ter_noco: string;
    public arsucurinfo: ArSucurInfo[];
}

export class ArSucurInfo {
    public tip_desc: string;
    public dsu_dire: string;
    public pai_nomb: string;
    public dep_nomb: string;
    public mun_nomb: string;
    public loc_nomb: string;
    public bar_nomb: string;
    public dsu_tele: string;
    public dsu_celu: string;
}

export class AfiliTrab {
    public tip_codi: number;
    public tip_nomb: string;
    public afi_cont: number;
    public afi_docu: string;
    public afi_fecn: string;
    public tip_abre: string;
    public afi_noco: string;
    public afi_dire: string;
    public afi_tele: string;
    public afi_celu: string;
    public pai_nomb: string;
    public dep_nomb: string;
    public mun_nomb: string;
    public loc_nomb: string;
    public bar_nomb: string;
    public superca: Superca[];
}

export class Superca {
    public afi_docu: string;
    public afi_fecn: string;
    public tip_abre: string;
    public afi_noco: string;
    public mpa_nomb: string;
    public rad_fech: string;
}

export class RnRadic {
    public rad_cont: number;
    public rad_nume: number;
    public rad_fech: string;
    public cra_nomb: string;
    public rad_esta: string;
    public rad_fecc: string;
}

export class ArDpil {
    public apo_coda: string;
    public apo_razs: string;
    public rpi_peri: number;
    public rpi_nura: string;
    public rpi_fchp: string;
    public dri_sapb: number;
    public rde_esta: string;
    public apo_valo: number;
    public rpi_mora: number;
    public dri_sibc: number;
    public afi_noco: string;
}

export class SuHgicm {
    public hgi_perp: number;
    public hgi_fech: string;
    public hgi_valg: number;
    public afi_docu: string;
    public afi_noco: string;
    public hgi_esta: string;
    public hgi_nutr: number;
    public hgi_nube: number;
}

export class ArRdevo {
    public rpi_peri: number;
    public rpi_nura: string;
    public rde_tipo: string;
    public ter_noco: string;
    public ter_coda: string;
    public rde_devo: number;
}

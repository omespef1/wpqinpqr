export class AfiliTrab {

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
    public sutraye: Sutraye[];
    public superca: Superca[];
}

export class Sutraye {
    tip_abre: string;
    apo_coda: string;
    apo_razs: string;
    tra_fchi: string;
    tra_fcha: string;
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
    public rpi_sapb: number;
    public rde_esta: string;
    public apo_valo: number;
}

export class Sfconsu {
    public tip_codi: number;
    public tip_nomb: string;
    public afi_docu: string;
}

export class SuAfili {
    public afi_cont: number;
    public afi_nom1: string;
    public afi_nom2: string;
    public afi_ape1: string;
    public afi_ape2: string;
    public sfforpo: Sfforpo[];
}

export class Sfforpo {
    public for_nume: number;
    public for_fech: string;
    public for_fasi: string;
    public for_esta: string;
    public dfo_vsol: number;
}

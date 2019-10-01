export class EeReles {
    public num_preg: number;
    public rel_cont: number;
    public rel_nomb: string;
    public Secciones: EeDrele[];
}

export class EeDrele {
    public drp_cont: number;
    public dre_secc: number;
    public sec_nomb: string;
    public Preguntas: EeDrsee[];
}

export class EeDrsee {
    public pre_cont: number;
    public drs_preg: string;
    public drs_clas: string;
    public drs_orde: number;
}

export class Ctdtrda {
    public ite_cont: number;
    public ite_nomb: string;
    public ite_chkd: boolean;
    public emp_codi: number;
    public rev_cont: number;

    constructor() {
        this.ite_chkd = false;
    }
}

export class ObjTratamiento {
     emp_codi: number;
     rev_cont: number;
     detail: Ctdtrda[];
}

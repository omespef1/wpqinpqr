import { RnDdocu } from './rnddocu';

export class RnDperc {

    public dpe_docu: string;
    public dpe_nom1: string;
    public dpe_nom2: string;
    public dpe_ape1: string;
    public dpe_ape2: string;
    public mpa_codi: string;
    public mpa_nomb: string;
    public lst_ddoc: RnDdocu[];

    constructor(
    ) {
        this.dpe_docu = '';
        this.dpe_nom1 = '';
        this.dpe_nom2 = '';
        this.dpe_ape1 = '';
        this.dpe_ape2 = '';
        this.mpa_codi = '';
        this.mpa_nomb = '';
        this.lst_ddoc = [];
    }
}

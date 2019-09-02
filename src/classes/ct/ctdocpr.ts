
export class Ctdocpr {
    constructor(
        public pro_nreg: number,
        public pro_ddoc: string,
        public pro_fent: Date,
        public pro_fven: Date,
        public pro_obse: string,
        public pro_adju: string | ArrayBuffer,
        public fil_name = '',
        public rev_apro = 'N'
    ) {}
}

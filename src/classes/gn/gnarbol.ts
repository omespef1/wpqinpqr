export interface gnarbol {
    arb_codi: string;
    arb_nomb: string;
    arb_cont: number;
    dpa_grup: string;
    dpa_codi: string;
}

export class Gnarbol {
    constructor(
        public arb_codi: String,
        public arb_nomb: String,
        public arb_cont: number,
        public dpa_codi: String,
        public dpa_grup: String,
    ) {}
}


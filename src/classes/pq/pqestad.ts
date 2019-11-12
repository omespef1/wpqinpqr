import { Gnarbol } from '../gn/gnarbol';
import { Gnitems } from '../gn/gnitems';

export class Pqestad {
   public seccional: Gnarbol[];
   public formRecib: Gnitems[];
   public tipoDePqr: Gnitems[];
   public areaRespo: Gnarbol[];
   public tipificac: Gnitems[];
   public subtipifi: Gnitems[];
   public grupPerte: Gnarbol[];

   public fec_inic = new Date();
   public fec_fina = new Date();

   public selSecc: string;
   public selForm: string;
   public selTpqr: string;
   public selArea: string;
   public selTipi: string;
   public selSubT: string;
   public selGrup: string;

   constructor() {
      this.seccional = [];
      this.formRecib = [];
      this.tipoDePqr = [];
      this.areaRespo = [];
      this.tipificac = [];
      this.subtipifi = [];

      this.selSecc = '';
      this.selForm = '';
      this.selTpqr = '';
      this.selArea = '';
      this.selTipi = '';
      this.selSubT = '';
      this.selGrup = '';
  }
}

export class InfoPqEstad {
   public ite_nomb: string;
   public arb_nomb: string;
   public dat_nomb: string;
   public cantidad: number;
   public porcentaje: number;
}



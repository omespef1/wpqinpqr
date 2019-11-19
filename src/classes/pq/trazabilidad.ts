import { Gnarbol } from '../gn/gnarbol';
import { Gnitems } from '../gn/gnitems';

export class Trazabilidad {
   public seccional: Gnarbol[];
   public formRecib: Gnitems[];
   public tipoDePqr: Gnitems[];
   public areaRespo: Gnarbol[];
   public tipificac: Gnitems[];
   public subtipifi: Gnitems[];
   public grupPerte: Gnarbol[];
   public fec_inic: Date;
   public fec_fina: Date;
   public inp_cont: string;
   public cas_cont: string;
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
      this.grupPerte = [];

      this.selSecc = '';
      this.selForm = '';
      this.selTpqr = '';
      this.selArea = '';
      this.selTipi = '';
      this.selSubT = '';
      this.selGrup = '';
  }
}

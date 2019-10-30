import { Gnarbol } from '../gn/gnarbol';
import { Gnitems } from '../gn/gnitems';

export class Pqestad {
   public seccional: Gnarbol[];
   public formRecib: Gnitems[];
   public tipoDePqr: Gnitems[];
   public areaRespo: Gnarbol[];
   public tipificac: Gnitems[];
   public subtipifi: Gnitems[];

   public fec_inic = new Date('2019-01-01');
   public fec_fina = new Date('2019-10-31');
   public filter: string;
   public type: string;

   constructor() {
      this.seccional = [];
      this.formRecib = [];
      this.tipoDePqr = [];
      this.areaRespo = [];
      this.tipificac = [];
      this.subtipifi = [];
  }
}

export class InfoPqEstad {
   public ite_nomb: string;
   public cantidad: number;
   public porcentaje: string;
}



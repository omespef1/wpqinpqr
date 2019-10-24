import { Gnarbol } from '../gn/gnarbol';
import { Gnitems } from '../gn/gnitems';

export class Pqestad {
   public seccional: Gnarbol[];
   public formRecib: Gnitems[];
   public tipoDePqr: Gnitems[];
   public areaRespo: Gnarbol[];
   public tipificac: Gnitems[];
   public subtipifi: Gnitems[];

   constructor() {
      this.seccional = [];
      this.formRecib = [];
      this.tipoDePqr = [];
      this.areaRespo = [];
      this.tipificac = [];
      this.subtipifi = [];
  }
}



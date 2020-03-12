import { Injectable } from "@angular/core";
import { ComunicationsService } from "../../../services/comunications.service";
import { Transaction2 } from "src/classes/gn/toTransaction";
import { ScfscrevRoutingModule } from "../../pages/cf/scfscrev/scfscrev-routing.module";
import { Cfcodeu } from "src/classes/cf/cfcodeu";

@Injectable({
  providedIn: "root"
})
export class CfcodeuService {
  constructor(private _comu: ComunicationsService) {}

  GetCfCodeu(emp_codi: number, cod_dnum: string) {
    return this._comu.GetTransaction<Transaction2>(
      `api/CfCodeu?emp_codi=${emp_codi}&cod_dnum=${cod_dnum}`
    );
  }

  SetCfCodeu(codeudor: Cfcodeu) {
    return this._comu.PostTransaction<Transaction2>(`api/CfCodeu`, codeudor);
  }

}

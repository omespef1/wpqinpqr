import { Injectable } from "@angular/core";
import { ComunicationsService } from "../../../services/comunications.service";
import { Transaction2 } from "../../../classes/gn/ToTransaction";

@Injectable({
  providedIn: "root"
})
export class CrRtmclService {
  constructor(private _comu: ComunicationsService) {}

  GetCrRtmcl(
    emp_codi: number,
    tas_cont: number,
    mod_cont: number,
    ite_cont: number
  ) {
    return this._comu.GetTransaction<Transaction2>(
      `api/crrtmcl?emp_codi=${emp_codi}&tas_cont=${tas_cont}&mod_cont=${mod_cont}&ite_cont=${ite_cont}`
    );
  }
}

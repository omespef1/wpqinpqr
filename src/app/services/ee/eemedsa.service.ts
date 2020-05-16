import { Injectable } from '@angular/core';
import { ComunicationsService } from '../../../services/comunications.service';
import { ToTransaction } from 'src/classes/gn/toTransaction';

@Injectable({
    providedIn: 'root'
  })
  export class EemedsaService {

    constructor(private _comu: ComunicationsService) { }

    loadServiciosEncuesta() {
        return this._comu.GetTransaction<any>(`api/GnItems?tit_cont=546`);
    }

    loadPorcentajeXServicio(ree_serv: any, fec_inic: string, fec_fina: string) {
      if (ree_serv === undefined)
        ree_serv = 0;
      return this._comu.GetTransaction<ToTransaction>(`api/EeMedsa/InfoServicio?ser_cont=${ree_serv}&fini=${fec_inic}&ffin=${fec_fina}`);
    }

    loadSatisfaccion(ree_serv: any, fec_inic: string, fec_fina: string) {
      if (ree_serv === undefined)
        ree_serv = 0;
      // tslint:disable-next-line:max-line-length
      return this._comu.GetTransaction<ToTransaction>(`api/EeMedsa/InfoSatisfaccion?ser_cont=${ree_serv}&fini=${fec_inic}&ffin=${fec_fina}`);
    }

    loadOportunidad(ree_serv: any, fec_inic: string, fec_fina: string) {
      if (ree_serv === undefined)
        ree_serv = 0;
      // tslint:disable-next-line:max-line-length
      return this._comu.GetTransaction<ToTransaction>(`api/EeMedsa/InfoOportunidad?ser_cont=${ree_serv}&fini=${fec_inic}&ffin=${fec_fina}&rem_cont=0`);
    }

    loadSatisDetalle(sec_cont: number) {
      return this._comu.GetTransaction<ToTransaction>(`api/EeMedsa/InfoDetalleSatis?sec_cont=${sec_cont}`);
    }
  }

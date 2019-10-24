import { RnDperc } from './rndperc';
import { Rnradtd } from './rnradtd';

export class RnRadic {

    public emp_codi: number;
    public usu_codi: string;
    public cen_codi: string;
    public tia_cont: number;
    public tia_codi: number;
    public tia_nomb: string;
    public tip_coda: number;
    public tip_nomb: string;
    public apo_coda: string;
    public apo_razs: string;
    public apo_tele: string;
    public gru_cont: number;
    public gru_codi: string;
    public gru_nomb: string;
    public cra_cont: number;
    public cra_codi = undefined;
    public cra_nomb: string;
    public dsu_tele: string;
    public rad_tdat = 'N';
    public rad_obse: string;
    public ite_depe: string;

    public tip_codi: number;
    public tip_noma: string;
    public afi_docu: string;
    public afi_nom1: string;
    public afi_nom2: string;
    public afi_ape1: string;
    public afi_ape2: string;
    public afi_fecn: Date;
    public afi_tele: string;
    public rad_dire: string;
    public rad_emai: string;

    // Geografía
    public rad_pais: number;
    public pai_nomb: string;
    public rad_regi: number;
    public reg_nomb: string;
    public rad_depa: number;
    public dep_nomb: string;
    public rad_muni: number;
    public mun_nomb: string;
    public rad_loca: number;
    public loc_nomb: string;
    public rad_barr: number;
    public bar_nomb: string;

    // Núcleo familiar
    public rndperc: RnDperc[] = [];

    // Tratamiento de Datos
    public radtdat: Rnradtd[] = [];
}

export class Ctpropo {

    public emp_codi = 0;
    public usu_codi: string;
    public rev_esta = 'E';
    public rev_cont = '';
    public rev_apda: string;

    // Datos Básicos
    public pro_codi = '';
    public pro_dive: number;
    public tip_codi = '';
    public pro_nomb = '';
    public pro_apel: string;
    public pro_noco: string;
    public pro_inds = 'N';

    // Localizacion
    public pro_dire: string;
    public pro_ntel: string;
    public pro_mail: string;
    public pro_nfax: string;
    public pro_naci: string;

    // Información Legal
    public pro_nroe = '';
    public pro_note = '';
    public pro_fesc = new Date;
    public pro_nroc = '';
    public pro_feci = new Date;
    public pro_rmer = '';
    public pro_nmer = '';

    // Información Económica
    public pro_vlrc = 0;
    public pro_vlrp = 0;
    public pro_vlra = 0;
    public pro_actc = 0;
    public pro_vlri = 0;
    public pro_pasc = 0;
    public pro_ingr = 0;
    public pro_gast = 0;
    public pro_util = 0;
    public pro_vlrk = 0;
    public pro_vlrd = 0;
    public pro_perc = new Date;

    // Representante Legal
    public pro_nomr: string;
    public pro_nror: string;
    public pro_tipr = '';
    public pro_expe: string;

    // Experiencia General
    public pro_exgr: string;

    // Otros

    public cam_cont = '';
    public pro_niva = '';
    public ite_cont = '';
    public pro_pweb: string;
    public pro_dirn: string;
    public pro_clap: string;

    // Geografía
    public pro_pais = '';
    public pro_regi = '';
    public pro_depa = '';
    public pro_muni = '';
    public pro_loca = '';

     // Constitución Escritura
     public pro_pair = '';
     public pro_regr = '';
     public pro_depr = '';
     public pro_munr = '';
     public pro_locr = '';

     // Actividades
     public arb_cont: number;
     public arb_codi: string;
     public arb_nomb: string;

     // Vigencia de Documentos
     public pro_nreg: number;
     public pro_ddoc: string;
     public pro_fent: Date;
     public pro_fven: Date;
     public pro_obse: string;

     // Clasificación del proveedor

     public pro_claf = 'A';
     public pro_clad = 'N';
     public pro_riva = 'N';
}

import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { CreacionComponent } from './components/creacion/creacion.component';
import { EccotizComponent } from './components/ec/eccotiz/eccotiz.component';
import { SocoxcnComponent } from './components/so_socio/socoxcn/socoxcn.component';
import { CtpropoComponent } from './components/ct/ctpropo/ctpropo.component';
import { CtconsuComponent } from './components/ct/ctconsu/ctconsu.component';
import { EerelesComponent } from './components/ee/eereles/eereles.component';
import { WgnfpassComponent } from './pages/gn/wgnfpass/wgnfpass.component';
import { RnradicComponent } from './components/rn/rnradic/rnradic.component';


const app_routes: Routes = [
   { path: 'consulta', component: ConsultaComponent },
   { path: 'creacion', component: CreacionComponent },
   { path: 'eccotiz', component: EccotizComponent },
   { path: 'socoxcn', component: SocoxcnComponent },
   { path: 'wgnfpass', component: WgnfpassComponent },
   { path: 'ctpropo', component: CtpropoComponent },
   { path: 'ctconsu', component: CtconsuComponent },
   { path: 'eereles', component: EerelesComponent },
   { path: 'rnradic', component: RnradicComponent },
   { path: 'pqestad' , loadChildren : './pages/pq/pqestad/pqestad.module#PqestadModule' },
   { path: 'trazabilidad' , loadChildren : './pages/pq/trazabilidad/trazabilidad.module#TrazabilidadModule' },
   { path: 'xbauliq' , loadChildren : './components/xb/xbauliq/xbauliq.module#XbauliqModule' },
   { path: 'sfforpo' , loadChildren : './pages/sf/sfforpo/sfforpo.module#SfforpoModule' },
   { path: 'eeremes' , loadChildren : './pages/ee/eeremes/eeremes.module#EeremesModule' },
   { path: 'eemedsa' , loadChildren : './pages/ee/eemedsa/eemedsa.module#EemedsaModule' },
   { path: 'scfscrev', loadChildren : './pages/cf/scfscrev/scfscrev.module#ScfscrevModule' },
   { path: 'wgnmenus', loadChildren : './pages/gn/wgnmenus/wgnmenus.module#WgnmenusModule'},
   { path: 'sfconsu' , loadChildren : './pages/sf/sfconsu/sfconsu.module#SfconsuModule'},
   { path: 'csfconct' , loadChildren : './pages/cf/csfconct/csfconct.module#CsfconctModule'},
   { path: '**', pathMatch: 'full', redirectTo: 'wgnmenus' }
];

export const app_routing = RouterModule.forRoot(app_routes);

import { RouterModule, Routes } from '@angular/router';
import {ConsultaComponent} from './components/consulta/consulta.component';
import {CreacionComponent} from './components/creacion/creacion.component';
import {EccotizComponent} from './components/ec/eccotiz/eccotiz.component';
import {SocoxcnComponent} from './components/so_socio/socoxcn/socoxcn.component';
import {WgnfpassComponent} from './pages/gn/wgnfpass/wgnfpass.component';
const app_routes: Routes = [
  { path: 'consulta', component: ConsultaComponent },
  { path: 'creacion', component: CreacionComponent },
  { path: 'eccotiz', component: EccotizComponent },
   { path: 'socoxcn', component: SocoxcnComponent },
   { path: 'wgnfpass', component: WgnfpassComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'creacion' }
];

export const app_routing = RouterModule.forRoot(app_routes);

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//Services
import {ComunicationsService} from '../services/comunications.service';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { CreacionComponent } from './components/creacion/creacion.component';
//RUTAS
import {appr_routes} from './app-routes';
@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
    CreacionComponent
  ],
  imports: [
    FormsModule,                               // <========== Add this line!
    BrowserModule,
    Ng4LoadingSpinnerModule.forRoot(),
      HttpClientModule,
      AngularFontAwesomeModule,
      appr_routes
  ],
  providers: [
    ComunicationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

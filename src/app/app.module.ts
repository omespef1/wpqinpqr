import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//Services
import {ComunicationsService} from '../services/comunications.service';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { CreacionComponent } from './components/creacion/creacion.component';
//RUTAS
import {app_routing} from './app.routes';
import { AlertComponent } from './components/alert/alert.component';
import { EstadosPipe } from './pipes/estados.pipe';
@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
    CreacionComponent,
    AlertComponent,
    EstadosPipe
  ],
  imports: [
    FormsModule,                               // <========== Add this line!
    BrowserModule,
  NgxSpinnerModule,
      HttpClientModule,
      AngularFontAwesomeModule,
      app_routing,

  ],
  providers: [
    ComunicationsService,
    AlertComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

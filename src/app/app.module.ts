import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
//Services
import {ComunicationsService} from '../services/comunications.service';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { CreacionComponent } from './components/creacion/creacion.component';
//RUTAS
import {app_routing} from './app.routes';
import { AlertComponent } from './components/alert/alert.component';
import { EstadosPipe } from './pipes/estados.pipe';
import { EccotizComponent } from './components/ec/eccotiz/eccotiz.component';
//Angular material
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
    CreacionComponent,
    AlertComponent,
    EstadosPipe,
    EccotizComponent
  ],
  imports: [
    FormsModule,                               // <========== Add this line!
    BrowserModule,
  NgxSpinnerModule,
      HttpClientModule,
      AngularFontAwesomeModule,
      app_routing,
      BrowserAnimationsModule,
      MatDatepickerModule,
      MatNativeDateModule

  ],
  providers: [
     {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    ComunicationsService,
    AlertComponent,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

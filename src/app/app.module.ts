import { BrowserModule,Title } from '@angular/platform-browser';
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
import { SocoxcnComponent } from './components/so_socio/socoxcn/socoxcn.component';
import { EstadosPipe } from './pipes/estados.pipe';
import { EccotizComponent } from './components/ec/eccotiz/eccotiz.component';
//Angular material
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule,MatFormFieldModule,MatInputModule,MatTableModule,MatPaginatorModule} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { TarjetasPipe } from './pipes/socoxcn/tarjetas.pipe';
import { EnvServiceProvider } from './env.service.provider';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import {ModalComponent} from './components/dialogs/modal/modal.component';
import { TableSearchComponent } from './components/tools/table-search/table-search.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { WgnfpassComponent } from './pages/gn/wgnfpass/wgnfpass.component';




export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD/MM/YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
    CreacionComponent,
    AlertComponent,
    EstadosPipe,
    EccotizComponent,
    SocoxcnComponent,
    TarjetasPipe,
    ConfirmDialogComponent,
    ModalComponent,
    TableSearchComponent,
    AlertDialogComponent,
    WgnfpassComponent,
    ModalComponent
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
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatPaginatorModule

  ],
  providers: [
     {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
     {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
   {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ComunicationsService,
    AlertComponent,
    MatNativeDateModule,
    Title,
    EnvServiceProvider,
    ConfirmDialogComponent,
    ModalComponent,
    TableSearchComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

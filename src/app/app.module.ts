import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// Services
import { ComunicationsService } from '../services/comunications.service';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { CreacionComponent } from './components/creacion/creacion.component';
// RUTAS
import { app_routing } from './app.routes';
import { AlertComponent } from './components/alert/alert.component';

import { SocoxcnComponent } from './components/so_socio/socoxcn/socoxcn.component';
import { EstadosPipe } from './pipes/estados.pipe';
import { EccotizComponent } from './components/ec/eccotiz/eccotiz.component';
import { CtpropoComponent } from './components/ct/ctpropo/ctpropo.component';
import { CtconsuComponent } from './components/ct/ctconsu/ctconsu.component';
// Angular material
import { MatDatepickerModule } from '@angular/material/datepicker';
// tslint:disable-next-line:max-line-length
import { MatNativeDateModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TarjetasPipe } from './pipes/socoxcn/tarjetas.pipe';
import { EnvServiceProvider } from './env.service.provider';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { ModalComponent } from './components/dialogs/modal/modal.component';
import { TableSearchComponent } from './components/tools/table-search/table-search.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { WgnfpassComponent } from './pages/gn/wgnfpass/wgnfpass.component';
import { EerelesComponent } from './components/ee/eereles/eereles.component';

// plugins
import { FileUploadModule } from 'ng2-file-upload';
import { TableSearchGenericComponent } from './components/tools/table-search-generic/table-search-generic.component';
import { ModalDoctosComponent } from './components/rn/rnradic/modal-doctos/modal-doctos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddressToolComponent } from './components/tools/address-tool/address-tool.component';
import { RnradicComponent } from './components/rn/rnradic/rnradic.component';
import { PagesComponent } from './pages/pages.component';
import { SuconapComponent } from './pages/su/suconap/suconap.component';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    ConfirmDialogComponent,
    EstadosPipe,
    EccotizComponent,
    SocoxcnComponent,
    TarjetasPipe,
    ModalComponent,
    TableSearchComponent,
    AlertDialogComponent,
    WgnfpassComponent,
    ModalComponent,
    CtpropoComponent,
    CtconsuComponent,
    EerelesComponent,
    TableSearchGenericComponent,
    ModalDoctosComponent,
    AddressToolComponent,
    RnradicComponent,
    PagesComponent
    // ToastComponent
  ],
  imports: [
    FormsModule,                               // <========== Add this line!
    BrowserModule,
    NgxPaginationModule,
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
    MatPaginatorModule,
    MatSortModule,
    FileUploadModule,
    BrowserModule
    // NgbModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ComunicationsService,
    AlertComponent,
    MatNativeDateModule,
    Title,
    EnvServiceProvider,
    ConfirmDialogComponent,
    ModalComponent,
    TableSearchComponent,
    ModalDoctosComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}

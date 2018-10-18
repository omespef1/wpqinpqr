import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//Services
import {ComunicationsService} from '../services/comunications.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,                               // <========== Add this line!
    BrowserModule,
    Ng4LoadingSpinnerModule.forRoot(),
      HttpClientModule,
      AngularFontAwesomeModule
  ],
  providers: [
    ComunicationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

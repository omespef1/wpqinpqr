import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GnempreComponent } from '../components/gn/gnempre/gnempre.component';
import { AlertMessageComponent } from '../components/dialogs/alert-message/alert-message.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GnempreComponent,
    AlertMessageComponent
  ],
  exports: [ GnempreComponent, AlertMessageComponent]
})
export class SharedModule { }

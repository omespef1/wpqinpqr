import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GnempreComponent } from '../components/gn/gnempre/gnempre.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GnempreComponent
  ],
  exports: [ GnempreComponent]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucacerComponent } from './sucacer.component';
import { SucacerRoutingModule } from './sucacer-routing-module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    SucacerRoutingModule,
    FormsModule,
    SharedModule,
    ModalModule
  ],
  declarations: [SucacerComponent]
})
export class SucacerModule { }

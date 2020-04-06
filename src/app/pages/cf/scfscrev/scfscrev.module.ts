import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScfscrevRoutingModule } from './scfscrev-routing.module';
import { ScfscrevComponent } from './scfscrev.component';
import { FormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';
import { ModalModule } from '../../../shared/modal/modal.module';



@NgModule({
  imports: [
    CommonModule,
    ScfscrevRoutingModule,
    FormsModule,
    SharedModule,
    ModalModule
  ],
   declarations: [ScfscrevComponent]
})
export class ScfscrevModule { }

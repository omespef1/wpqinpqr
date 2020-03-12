import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScfscrevRoutingModule } from './scfscrev-routing.module';
import { ScfscrevComponent } from './scfscrev.component';
import { FormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';
import { ToastModule } from '../../../shared/toast/toast.module';



@NgModule({
  imports: [
    CommonModule,
    ScfscrevRoutingModule,
    FormsModule,
    SharedModule,ToastModule
  ],
   declarations: [ScfscrevComponent]
})
export class ScfscrevModule { }

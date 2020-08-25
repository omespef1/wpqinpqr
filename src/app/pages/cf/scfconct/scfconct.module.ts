import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScfconctRoutingModule } from './scfconct-routing.module';
import { ScfconctComponent } from './scfconct.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    ScfconctRoutingModule,
    FormsModule,
    SharedModule,
    ModalModule
  ],
  declarations: [ScfconctComponent]
})
export class ScfconctModule { }

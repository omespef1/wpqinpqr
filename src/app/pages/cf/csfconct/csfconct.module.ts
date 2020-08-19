import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { CsfconctRoutingModule } from './csfconct-routing.module';
import { CsfconctComponent } from './csfconct.component';

@NgModule({
  imports: [
    CommonModule,
    CsfconctRoutingModule,
    FormsModule,
    SharedModule,
    ModalModule
  ],
  declarations: [CsfconctComponent]
})
export class CsfconctModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SsuconctRoutingModule } from './ssuconct-routing.module';
import { SsuconctComponent } from './ssuconct.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    SsuconctRoutingModule,
    FormsModule,
    SharedModule,
    ModalModule
  ],
  declarations: [SsuconctComponent]
})
export class SsuconctModule { }

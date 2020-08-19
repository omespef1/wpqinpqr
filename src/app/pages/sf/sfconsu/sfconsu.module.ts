import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SfconsuRoutingModule } from './sfconsu-routing.module';
import { SfconsuComponent } from './sfconsu.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ModalModule } from '../../../shared/modal/modal.module';


@NgModule({
  imports: [
    CommonModule,
    SfconsuRoutingModule,
    FormsModule,
    SharedModule,
    ModalModule
  ],
  declarations: [SfconsuComponent]
})
export class SfconsuModule { }



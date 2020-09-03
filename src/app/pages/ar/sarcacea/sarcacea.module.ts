import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { SarcaceaComponent } from './sarcacea.component';
import { SarcaceaRoutingModule } from './sarcacea-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SarcaceaRoutingModule,
    FormsModule,
    SharedModule,
    ModalModule
  ],
  declarations: [SarcaceaComponent]
})
export class SarcaceaModule {

}

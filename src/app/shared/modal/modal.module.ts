import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressToolGenericComponent } from "src/app/components/tools/address-tool-generic/address-tool-generic.component";
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,FormsModule
  ],
  declarations: [
    AddressToolGenericComponent
  ],
  exports:[
    AddressToolGenericComponent
  ]
})
export class ModalModule { }

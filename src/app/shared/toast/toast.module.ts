import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../../components/tools/toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    ToastComponent
  ],
  exports:[
    ToastComponent
  ]
})
export class ToastModule { }

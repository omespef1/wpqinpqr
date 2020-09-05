import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SsuconctRoutingModule } from './ssuconct-routing.module';
import { SsuconctComponent } from './ssuconct.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { MatDatepickerModule, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    CommonModule,
    SsuconctRoutingModule,
    FormsModule,
    SharedModule,
    ModalModule,
    MatDatepickerModule,
    MomentDateModule
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
  declarations: [SsuconctComponent]
})
export class SsuconctModule { }

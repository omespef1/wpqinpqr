import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfforpoComponent } from './sfforpo.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { MatDatepickerModule, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateModule } from '@angular/material-moment-adapter';

const routes: Routes = [
  {
    path: '',
    component: SfforpoComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
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
  declarations: [
    SfforpoComponent
  ],
  exports: [
  ]
})
export class SfforpoModule { }


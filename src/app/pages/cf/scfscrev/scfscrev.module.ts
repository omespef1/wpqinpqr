import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScfscrevRoutingModule } from './scfscrev-routing.module';
// import { ScfscrevComponent } from './scfscrev.component';
import { FormsModule } from "@angular/forms";
import { MatInputModule, MatTableModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ScfscrevRoutingModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule
  ],
  //  declarations: [ScfscrevComponent]
})
export class ScfscrevModule { }

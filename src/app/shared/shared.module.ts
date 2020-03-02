import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GnempreComponent } from '../components/gn/gnempre/gnempre.component';
import { AlertMessageComponent } from '../components/dialogs/alert-message/alert-message.component';
import { PieChartComponent } from '../components/charts/pie-chart/pie-chart.component';
import { GroupByPipe } from '../pipes/groupdata.pipe';
import { NewTableSearchComponent } from '../components/tools/new-table-search/new-table-search.component';
// tslint:disable-next-line:max-line-length
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPaginationModule
  ],
  declarations: [
    GnempreComponent,
    AlertMessageComponent,
    PieChartComponent,
    GroupByPipe,
    NewTableSearchComponent
  ],
  exports: [ GnempreComponent, AlertMessageComponent, PieChartComponent, GroupByPipe, NewTableSearchComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPaginationModule]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GnempreComponent } from '../components/gn/gnempre/gnempre.component';
import { AlertMessageComponent } from '../components/dialogs/alert-message/alert-message.component';
import { PieChartComponent } from '../components/charts/pie-chart/pie-chart.component';
import { BarChartComponent } from '../components/charts/bar-chart/bar-chart.component';
import { GroupByPipe } from '../pipes/groupdata.pipe';
import { NewTableSearchComponent } from '../components/tools/new-table-search/new-table-search.component';
// tslint:disable-next-line:max-line-length
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { ResultDialogComponent } from '../components/dialogs/result-dialog/result-dialog.component';
import { DatagridToolComponent } from '../components/tools/datagrid-tool/datagrid-tool.component';

@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatSortModule
  ],
  declarations: [
    GnempreComponent,
    AlertMessageComponent,
    PieChartComponent,
    BarChartComponent,
    GroupByPipe,
    NewTableSearchComponent,
    ResultDialogComponent,
    DatagridToolComponent
  ],
  exports: [ GnempreComponent,
    AlertMessageComponent,
    PieChartComponent,
    BarChartComponent,
    GroupByPipe,
    NewTableSearchComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPaginationModule,
    ResultDialogComponent,
    DatagridToolComponent,
    MatSortModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GnempreComponent } from '../components/gn/gnempre/gnempre.component';
import { AlertMessageComponent } from '../components/dialogs/alert-message/alert-message.component';
import { PieChartComponent } from '../components/charts/pie-chart/pie-chart.component';
import { GroupByPipe } from '../pipes/groupdata.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    GnempreComponent,
    AlertMessageComponent,
    PieChartComponent,
    GroupByPipe
  ],
  exports: [ GnempreComponent, AlertMessageComponent, PieChartComponent, GroupByPipe]
})
export class SharedModule { }

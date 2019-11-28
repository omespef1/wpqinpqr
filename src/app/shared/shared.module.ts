import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GnempreComponent } from '../components/gn/gnempre/gnempre.component';
import { AlertMessageComponent } from '../components/dialogs/alert-message/alert-message.component';
import { PieChartComponent } from '../components/charts/pie-chart/pie-chart.component';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    GnempreComponent,
    AlertMessageComponent,
    PieChartComponent,
  ],
  exports: [ GnempreComponent, AlertMessageComponent, PieChartComponent]
})
export class SharedModule { }

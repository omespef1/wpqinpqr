import { AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html'
})
export class PieChartComponent implements AfterViewInit   {

  @ViewChild('pieChart') pieChart: ElementRef;
  @Input() infoData: any[] = [];

  drawChart = () => {

    const data =   google.visualization.arrayToDataTable(this.infoData);


  const options = {
    title: 'Estadisticas PQR',
    legend: {position: 'right'},
    is3D: true
  };

  const chart = new google.visualization.PieChart(this.pieChart.nativeElement);
  chart.draw(data, options);
}

  ngAfterViewInit() {

    if (this.infoData !== undefined) {
      google.load('visualization', '1', {packages: ['corechart', 'controls', 'table']});
      google.setOnLoadCallback(this.drawChart);
    }
  }
}

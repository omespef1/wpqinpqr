import { AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styles: []
})

export class BarChartComponent implements AfterViewInit {

  @ViewChild('barChart') barChart: ElementRef;

  @Input()
  public infoData: any[] = [];

  @Input()
  public vAxisTittle = '';

  @Input()
  public hAxisTittle = '';

  @Input()
  public showCodi = '';

  @Input()
  public showValue = '';

  public options: any = {};

  data = new google.visualization.DataTable();
  stringData = '';

  drawChart = () => {

    this.data.addColumn('string', 'codigo');
    this.data.addColumn('string', 'porcentaje');

    this.loadChart();

    this.options = {
      width: 800,
      legend: { position: 'none' },
      chart: {
        title: '',
        subtitle: ''
      },
      vAxis: {
        title: this.vAxisTittle, titleTextStyle: {italic: false},
        viewWindowMode: 'explicit',
        viewWindow: {
          max: 100,
          min: 0
        }
      },
      hAxis: {
        title: this.hAxisTittle,
        titleTextStyle: {italic: false}
      },
      axes: {
        x: {
          0: { side: 'top', label: 'none'} // Top x-axis.
        }
      },
      bar: { groupWidth: '90%' }
    };
  }

  loadChart() {
    for (let i = 0; i < this.infoData.length; i++) {
      // tslint:disable-next-line:max-line-length
      this.stringData += '["' + this.infoData[i][this.showCodi] + '", {v:' + this.infoData[i][this.showValue] + ', f: "' + this.infoData[i][this.showValue] + '"}]';

      if (i < this.infoData.length - 1)
        this.stringData += ',';
    }
  }

  ngAfterViewInit() {

    if (this.data !== undefined) {
      this.drawChart();
      google.setOnLoadCallback(this.drawChart);

      const dataArray = [
        ['codigo', this.vAxisTittle]
      ];

      // tslint:disable-next-line:no-eval
      const newDataArray = dataArray.concat(eval('[' + this.stringData + ']'));
      const data = google.visualization.arrayToDataTable(newDataArray);
      const chart = new google.visualization.ColumnChart(this.barChart.nativeElement);
      chart.draw(data, this.options);
    }
  }
}

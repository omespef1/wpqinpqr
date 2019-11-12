import { AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html'
})
export class PieChartComponent implements AfterViewInit {

  @ViewChild('pieChart') pieChart: ElementRef;

  @Input()
  public infoData: any[] = [];

  @Input()
  public data = new google.visualization.DataTable();

  @Input()
  public columnNames: Array<string>;

  @Input()
  public title: string;

  @Input()
  public options: any = {};

  @Input()
  public isGrouped: boolean;

  drawChart = () => {

    this.data = new google.visualization.DataTable();

    if (this.isGrouped) {
      this.data.addColumn('string', 'Forma de Recibido');
      this.data.addColumn('number', 'Cantidad');
      this.loadChartGrouped();
    } else {
      this.data.addColumn('string', 'Seccional');
      this.data.addColumn('number', 'Cantidad');
      this.loadChart();
    }

    this.options = {
      title: this.title,
      legend: { position: 'right' },
      is3D: true
    };
  }

  loadChart() {
    let stringData = '[';
    for (let i = 0; i < this.infoData.length; i++) {
      stringData += '["' + this.infoData[i].dat_nomb + '",' + this.infoData[i].cantidad + ']';
      if (i < this.infoData.length - 1)
        stringData += ',';
    }
    stringData += ']';
    this.data.addRows(JSON.parse(stringData));
  }

  loadChartGrouped() {

    let stringData = '[';
    let mySource: any;

    mySource = this.infoData;
    this.title = mySource.key;

    let contador = 0;
    for (const item2 of mySource.value) {
      stringData += `["${item2.ite_nomb}",${item2.cantidad}]`;

      if (mySource.value.length - 1 !== contador)
        stringData += ',';

      contador += 1;
    }
    stringData += ']';
    this.data.addRows(JSON.parse(stringData));
  }

  ngAfterViewInit() {
    if (this.data !== undefined) {
      this.drawChart();
      google.setOnLoadCallback(this.drawChart);
      const chart = new google.visualization.PieChart(this.pieChart.nativeElement);
      chart.draw(this.data, this.options);
    }
  }
}

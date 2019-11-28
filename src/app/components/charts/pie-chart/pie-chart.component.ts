import { AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';
import { InfoPqEstad } from 'src/classes/pq/pqestad';

declare var google: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html'
})
export class PieChartComponent implements AfterViewInit {

  @ViewChild('pieChart') pieChart: ElementRef;

  @Input()
  public infoData: InfoPqEstad[] = [];

  @Input()
  public columnNames: Array<string>;

  @Input()
  public title: string;

  @Input()
  public options: any = {};

  @Input()
  public isGrouped = false;

  data = new google.visualization.DataTable();
  stringData = '';

  drawChart = () => {
    if (this.isGrouped) {
      this.data.addColumn('string', 'Forma de Recibido');
      this.data.addColumn('number', 'Cantidad');
      this.loadChartGrouped();
    } else {
      this.data = new google.visualization.DataTable();
      this.data.addColumn('string', 'Nombre');
      this.data.addColumn('number', 'Cantidad');
      this.data.addColumn('number', 'Porcentaje');
      this.loadChart();
    }

    this.options = {
      title: this.title,
      legend: { position: 'right', textStyle: { fontSize: 10 }},
      is3D: true,
      chartArea: {left: '20%', width: '80%'},
      sliceVisibilityThreshold: 0.0001,
      tooltip: {
        showColorCode: true,
        text: 'value',
      },
      pieSliceText: 'value',
    };
  }

  loadChart() {

    for (let i = 0; i < this.infoData.length; i++) {
      // tslint:disable-next-line:max-line-length
      this.stringData += '["' + this.infoData[i].dat_nomb + '", {v:' + this.infoData[i].porcentaje + ', f: "' + this.infoData[i].porcentaje + '%"}]';

      if (i < this.infoData.length - 1)
      this.stringData += ',';
    }
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

      const dataArray = [
        ['nombre', 'cantidad']
      ];

      // tslint:disable-next-line:no-eval
      const newDataArray = dataArray.concat(eval('[' + this.stringData + ']'));
      const data = google.visualization.arrayToDataTable(newDataArray);
      const chart = new google.visualization.PieChart(this.pieChart.nativeElement);
      chart.draw(data, this.options);
    }
  }
}

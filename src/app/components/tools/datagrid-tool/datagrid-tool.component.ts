import {Component, OnInit, ViewChild, Input, EventEmitter, Output, OnDestroy, AfterViewInit} from '@angular/core';
import {MatPaginator,  MatTableDataSource, MatTable} from '@angular/material';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-datagrid-tool',
  templateUrl: './datagrid-tool.component.html',
  styleUrls: ['./datagrid-tool.component.css']
})
export class DatagridToolComponent implements AfterViewInit {

  dataSource = new MatTableDataSource();
  @Output() rowCLick: EventEmitter<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() Title: string;
  @Input() pageSize: number;
  @Input() ModalQb: string;
  @Input() btnModalQb = '';
  @Input() displayedColumns: string[] = []; // Vector del cual se obtienen los valores que se mostraran en la tabla
  @Input() showColumns: string[] = []; //  Nombre de las columnas a mostrar en la tabla
  @Input() id = '';
  element: HTMLElement;

  constructor() {
    this.dataSource = new MatTableDataSource();
    this.rowCLick = new EventEmitter();
    console.log(this.dataSource);
  }

  render(source: any) {
    this.dataSource = new MatTableDataSource(source);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  DataSelected(row: any) {
    this.rowCLick.emit(row);
  }

  show() {
    this.element = document.getElementById(this.btnModalQb) as HTMLElement;
    this.element.click();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getShowColumn(i: number) {
    return  this.showColumns[i];
  }
}

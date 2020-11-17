import {Component, ViewChild, Input, EventEmitter, Output} from '@angular/core';
import {MatPaginator,  MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-datagrid-tool',
  templateUrl: './datagrid-tool.component.html',
  styleUrls: ['./datagrid-tool.component.css']
})
export class DatagridToolComponent {

  private paginator: MatPaginator;
  private sort: MatSort;
  dataSource = new MatTableDataSource();
  @Output() rowCLick: EventEmitter<any>;
  // @ViewChild(MatSort) sort: MatSort;
  @Input() pageSize: number;
  @Input() displayedColumns: string[] = []; // Vector del cual se obtienen los valores que se mostraran en la tabla
  @Input() showColumns: string[] = []; //  Nombre de las columnas a mostrar en la tabla

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
     this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
 }

  constructor() {
    this.dataSource = new MatTableDataSource();
    this.rowCLick = new EventEmitter();
  }

  render(source: any) {
    this.dataSource = new MatTableDataSource(source);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  DataSelected(row: any) {
    this.rowCLick.emit(row);
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

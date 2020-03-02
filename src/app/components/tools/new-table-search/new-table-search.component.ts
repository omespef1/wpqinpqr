import {Component, OnInit, ViewChild, Input, EventEmitter, Output, OnDestroy} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatTable} from '@angular/material';

@Component({
  selector: 'app-new-table-search',
  templateUrl: './new-table-search.component.html',
  styleUrls: ['./new-table-search.component.css']
})

export class NewTableSearchComponent {

  dataSource = new MatTableDataSource();
  @Output() rowCLick: EventEmitter<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() Title: string;
  @Input() ModalQb: string;
  @Input() btnModalQb = '';
  @Input() displayedColumns: string[] = []; // Vector del cual se obtienen los valores que se mostraran en la tabla
  @Input() showColumns: string[] = []; //  Nombre de las columnas a mostrar en la tabla
  @Input() id = '';
  data = true;
  element: HTMLElement;

  constructor() {
    this.dataSource = new MatTableDataSource();
    this.rowCLick = new EventEmitter();
  }

  render(source: any) {
    if (source === null || source === undefined)
     this.data = false;
     else
     this.data = true;
    this.dataSource = new MatTableDataSource(source);
    this.dataSource.paginator = this.paginator;
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

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }

  getShowColumn(i: number) {
    return  this.showColumns[i];
  }
}

import {Component, OnInit, ViewChild, Input,EventEmitter,Output} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource,MatTable} from '@angular/material';
//Modelo

import {ctcontr} from '../../../../classes/ct/ctcontr';

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.css']
})
export class TableSearchComponent implements OnInit {

  displayedColumns: string[] = ['con_ncon', 'con_desc','con_nume','con_fech','top_codi','top_nomb','ter_coda','ter_noco'];
  dataSource: MatTableDataSource<ctcontr>;
  @Output() rowCLick:EventEmitter<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('#GenericTable') genericTable :MatTable<ctcontr[]>;
  @Input() mySource:ctcontr[];
  @Input() Title:string;
  constructor() {  
    this.rowCLick= new EventEmitter();
    //  this.mySource = [
    //    {con_cont:0,con_desc:'holas',con_fech:new Date(),con_ncon:0,con_nume:0,ter_coda:'',ter_noco:'',top_codi:0,top_nomb:'0'}
    //  ]
    //  this.dataSource = new MatTableDataSource(this.mySource);
  }

  render(source:any){
    this.dataSource = new MatTableDataSource(source);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }
  DataSelected(row:any){
    console.log(row);
    this.rowCLick.emit(row);

  }
  show(){
    document.getElementById('btnModalQb').click();
  }

  ngOnInit() {
 
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


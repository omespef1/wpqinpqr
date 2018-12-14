import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource,MatTable} from '@angular/material';
//Modelo

import {ctcontr} from '../../../../classes/ct/ctcontr';

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.css']
})
export class TableSearchComponent implements OnInit {

  displayedColumns: string[] = ['con_cont', 'con_ncon', 'con_desc'];
  dataSource: MatTableDataSource<ctcontr>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() mySource:ctcontr[];
  constructor() {  
    //  this.mySource = [
    //    {con_cont:0,con_desc:'holas',con_fech:new Date(),con_ncon:0,con_nume:0,ter_coda:'',ter_noco:'',top_codi:0,top_nomb:'0'}
    //  ]
    //  this.dataSource = new MatTableDataSource(this.mySource);
  }

  render(){
    
    this.dataSource = new MatTableDataSource(this.mySource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
    
    console.log('finisg');
    
    
    
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


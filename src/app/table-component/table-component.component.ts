import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { PeriodicElement } from '../app.component';


interface paginationDetail {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule],
})
export class TableComponentComponent implements AfterViewInit {
  @Input() columnDefinitions!: any[];
  @Input() ELEMENT_DATA!: any[];
  @Input() isPaginationVisible = true;
  @Input() pageSize! : number
  @Output() paginationResult = new EventEmitter<paginationDetail>(); 

  columnNames: any;
  dataSource: any;
  paginationDetail! : paginationDetail;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnInit() {
    this.columnNames = this.columnDefinitions?.map((column) => column.name);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  togglePaginationVisibility() {
    this.isPaginationVisible = !this.isPaginationVisible;
  }
  
  pageEvents(event : any) {
    this.paginationDetail.currentPage= event.pageIndex;
    this.paginationDetail.totalPages=(event.length % event.pageSize == 0) ? (event.length / event.pageSize) : (event.length / event.pageSize)+1
    this.paginationDetail.totalItems = event.length;
    this.paginationDetail.itemsPerPage = event.pageSize;
    this.paginationResult.emit(this.paginationDetail)
  }
}

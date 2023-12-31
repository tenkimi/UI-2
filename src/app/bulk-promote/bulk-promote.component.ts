import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';

export interface platformElement {
  api: string;
  name: string;
  organization: string;
  ait: string;
  status: string;
  catlog: string;
}

const PLATFORM_DATA: platformElement[] = [
  {
    api: 'API 1',
    name: 'Name 1',
    organization: 'Organization 1',
    ait: 'Value 1',
    status: 'Status 1',
    catlog: 'Catlog 1',
  },
  {
    api: 'API 1',
    name: 'Name 1',
    organization: 'Organization 1',
    ait: 'Value 1',
    status: 'Status 1',
    catlog: 'Catlog 1',
  },
  {
    api: 'API 1',
    name: 'Name 1',
    organization: 'Organization 1',
    ait: 'Value 1',
    status: 'Status 1',
    catlog: 'Catlog 1',
  },
];

@Component({
  selector: 'app-bulk-promote',
  templateUrl: './bulk-promote.component.html',
  styleUrls: ['./bulk-promote.component.css'],
})
export class BulkPromoteComponent implements AfterViewInit {
  organizationSelected = '';
  aitSelected = '';
  statusSelected = '';
  organizationOptions = [
    { value: 'dream', viewValue: 'DREAM' },
    { value: 'dream', viewValue: 'DREAM' },
  ];
  aitOptions = [{ value: '123456', viewValue: '123456' }];
  statusOptions = [
    { value: 'no-errors', viewValue: 'No Errors' },
    { value: 'with-errors', viewValue: 'With Errors' },
  ];

  displayedColumns: string[] = [
    'select',
    'api',
    'name',
    'organization',
    'ait',
    'status',
    'catlog',
  ];
  dataSource = new MatTableDataSource<platformElement>(PLATFORM_DATA);
  selection = new SelectionModel<platformElement>(true, []);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: platformElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.api + 1
    }`;
  }
}

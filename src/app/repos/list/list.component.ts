import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ReposService } from '../repos.service';

@Component({
  selector: 'app-repos-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.scss' ]
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  pageSizeOptions: number[] = [5, 10, 20];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  loading = false;

  @ViewChild('username') usernameRef: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: ReposService,
    private router: Router,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    fromEvent(this.usernameRef.nativeElement, 'keyup')
      .pipe(
        map((evt: any) => evt.target.value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        text.length ? this.getRepos(text) : this.clear();
      });
  }

  getRepos(username: string) {
    this.loading = true;
    this.service
      .getRepos(username)
      .subscribe(
        data => this.dataSource.data = data,
        error => this.showError(error.message),
        () => this.loading = false
      );
  }

  viewReadme(repo: string) {
    this.router.navigate([
      'repos/readme',
      this.usernameRef.nativeElement.value,
      repo]
    );
  }

  clear() {
    this.dataSource.data = [];
  }

  showError(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000
    });
  }

}

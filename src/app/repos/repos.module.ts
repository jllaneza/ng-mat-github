import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatPaginatorModule,
  MatTableModule,
  MatToolbarModule} from '@angular/material';

import { ReposRoutingModule } from './repos-routing.module';
import { ReposService } from './repos.service';
import { ListComponent } from './list/list.component';
import { ReadmeComponent } from './readme/readme.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    ReposRoutingModule
  ],
  declarations: [ListComponent, ReadmeComponent],
  providers: [ReposService]
})
export class ReposModule { }

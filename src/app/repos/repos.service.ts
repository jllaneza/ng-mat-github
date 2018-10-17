import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ReposService {

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError({
      status: error.status,
      message: 'Something went wrong. please try again later.'});
  }

  getRepos(username: string): Observable<any[]> {
    return this.http
      .get<any[]>(`https://api.github.com/users/${username}/repos`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getReadme(username: string, repo: string): Observable<string> {
    return this.http
      .get(
        `https://raw.githubusercontent.com/${username}/${repo}/master/README.md`,
        { responseType: 'text' }
      )
      .pipe(
        catchError(this.handleError)
      );
  }

}

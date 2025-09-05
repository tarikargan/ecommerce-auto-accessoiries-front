import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(
    private router: Router,
    private http: HttpClient
  ){
  }

  handleError(error: HttpErrorResponse) {
     console.log('handleErrors ', error.error);
     if(error?.error?.message == 'Unauthenticated.'){
      console.log('redirect');

      //  this.router.navigate(['/']);
      localStorage.removeItem('access_token');
       this.router.navigateByUrl('/auth/login');
      //  this.router.navigate(['/']);

     }

    // Return an observable with a user-facing error message.
  return throwError(() => error.error);
}
}

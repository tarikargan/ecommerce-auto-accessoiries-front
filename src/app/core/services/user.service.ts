import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { BehaviorSubject, catchError, Observable, Subject, throwError } from 'rxjs';
import { User } from './../classes/user';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HandleErrorService } from './handleError.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // user:User | null = null;
  // public user = new Subject<User>();
  public user = new BehaviorSubject<User| null>(null);
  private url:string;

  constructor(
    private router:Router,
    private http: HttpClient,
    private _handleErrorsService: HandleErrorService
  ){
    this.url = GLOBAL.url;
  }

  setUser(value:User) {
    this.user.next(value);
  }

  defaultRedirect(){
    if(this.user){
      console.log('auth redirect');

      this.user.pipe(take(1)).subscribe(us =>{
        this.router.navigate(['/'+ us?.role])
      })
    }else{
      console.log('home redirect');
      this.router.navigate(['/']);
    }
  }


  // ===================== GET METHOD ========================
  // ======================
  // =========

  // get auth Info
  getUser():Observable<any>{
    let token:any = localStorage.getItem('access_token');
    // console.log('getuser token ', token);

    const headers    = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": `Bearer ${token}`
    });

    return this.http.get(`${this.url}/api/users/details`,{headers: headers})
    .pipe(
      map((res:any) => res?.data),
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    if(error?.status == 401){
      localStorage.removeItem('access_token');
    }

    if(error.error.message == 'Unauthenticated.'){
      window.location.href = '/auth/login';
    }
    // this.router.navigate(['/'])
    return throwError(() => error.error);
  }
}

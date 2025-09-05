import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, take, throwError } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../classes/user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { ErrorsMessageService } from './ErrorsMessage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;
  idToken: string | null | undefined;
  private url:string;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    // private toastService :toastService,
    private _errorsMessageService: ErrorsMessageService

  ) {
    this.url = GLOBAL.url;

  }

  public getToken() {
    return localStorage.getItem('access_token');
  }

  login(data:any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
    });

    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/api/auth/login`,data,{headers: headers})
      .pipe(take(1), catchError(this.handleError))
      .subscribe((data:any) =>{
        console.log(data);
        localStorage.setItem('ent_User',data.user?.entreprise?.name);
        localStorage.setItem('access_token',data.token);
        this.loginRedirection();
        resolve(data);
      },
      error => {
        // this.toastService.toastrError(error?.message);
        // console.log(error);
        this._errorsMessageService.updateErrorMsg(error?.message);
        reject();
      })
    })
  }

  // register(data:any) {
  //   const headers = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     "Accept": "application/json",
  //   });

  //   return this.http.post(`${this.url}/api/auth/register`,data,{headers: headers}).pipe(
  //     catchError(this.handleError)
  //     );
  // }

  // registerIndex() {
  //   const headers = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     "Accept": "application/json",
  //   });

  //   return this.http.get(`${this.url}/api/auth/register`,{headers: headers}).pipe(
  //     catchError(this.handleError)
  //     );
  // }

  // sendVerifyEmail(data:any) {
  //   const headers = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     "Accept": "application/json",
  //   });

  //   return this.http.post(`${this.url}/api/auth/verify-email`,data,{headers: headers});
  // }

  // verifyEmail(data:any) {
  //   let verifyEmail = {email: data?.email };
  //   let verifyToken = data?.token;

  //   const headers = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     "Accept": "application/json",
  //   });

  //   return this.http.post(`${this.url}/api/auth/verify/${verifyToken}`,verifyEmail,{headers: headers});
  // }

  async loginRedirection() {
    this.userService.getUser().pipe(take(1))
    .subscribe((user:User) => {
      // console.log('user',)
        if (!user) {
          console.log("not logged");
          this.router.navigate(["/auth/login"]);
          return;
        }
        let redirectTo = '/admin';
        console.log('redirect to');

        this.router.navigateByUrl(redirectTo);
    },
    error => this.router.navigate(["/auth/login"])
    )

  }

  logout() {
    const token: any = localStorage.getItem('access_token');
    const headers    = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": `Bearer ${token}`
    });
    return this.http.post(`${this.url}/api/auth/logout`,null,{headers: headers});
  }

  // sendResetPassword(email: any){
  //   const headers    = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     "Accept": "application/json",
  //     "X-Requested-With": "XMLHttpRequest",
  //   });
  //   return this.http.post(`${this.url}/api/auth/forgot-password`,email,{headers: headers})
  // }

  // changePassword(data: any){
  //   const headers    = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     "Accept": "application/json",
  //     "X-Requested-With": "XMLHttpRequest",
  //   });
  //   return this.http.post(`${this.url}/api/auth/reset-password`,data,{headers: headers})
  // }


  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(() => error.error);
  }


}

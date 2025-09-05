import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HandleErrorService } from '../handleError.service';
import { GLOBAL } from '../global';

@Injectable({ providedIn: 'root' })
export class BlogCategoryService {
  pipe(arg0: MonoTypeOperatorFunction<unknown>, arg1: OperatorFunction<unknown, any>) {
    throw new Error('Method not implemented.');
  }
  private url:string;
  constructor(
    private http: HttpClient,
    private _handleErrorsService: HandleErrorService
  ) {
     this.url = GLOBAL.url;
  }

  getAll(){
    const token: any = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    });

    return this.http.get(`${this.url}/api/blog-categories`,{headers: headers}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  get(id: number){
    const token: any = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    });

    return this.http.get(`${this.url}/api/blog-categories/${id}`,{headers: headers}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  create(data: any){
    const token: any = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    });

     return this.http.post(`${this.url}/api/blog-categories`,data,{headers: headers}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  update(id: number, data: any){
    const token: any = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    });

     return this.http.patch(`${this.url}/api/blog-categories/${id}`,data,{headers: headers}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  delete(id: number){
    const token: any = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    });

     return this.http.delete(`${this.url}/api/blog-categories/${id}`,{headers: headers}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }
}

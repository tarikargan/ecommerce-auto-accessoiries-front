import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HandleErrorService } from '../../handleError.service';
import { GLOBAL } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class EtapesService {

  private url:string;
  constructor(
    private http: HttpClient,
    private _handleErrorsService: HandleErrorService
  ){
    this.url = GLOBAL.url;
  }



  getAll(){
    const token: any = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    });

    return this.http.get(`${this.url}/api/etapes`,{headers: headers}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  // get facteurs by emission
  get(id:any):Observable<any>{
    const token: any = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    });

     return this.http.get(`${this.url}/api/etapes/${id}`,{headers: headers}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  // create facteur
  add(data:any):Observable<any>{
    const token: any = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    });

     return this.http.post(`${this.url}/api/etapes`,data,{headers: headers}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  // update facteur
  update(id:any,data:any):Observable<any>{
    const token: any = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    });

     return this.http.patch(`${this.url}/api/etapes/${id}`,data,{headers: headers}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  // update facteur
  delete(id:any):Observable<any>{
    const token: any = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    });

     return this.http.delete(`${this.url}/api/etapes/${id}`,{headers: headers}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }


}

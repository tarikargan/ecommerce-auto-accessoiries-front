import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HandleErrorService } from '../handleError.service';
import { GLOBAL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private url:string;
  constructor(
    private http: HttpClient,
    private _handleErrorsService: HandleErrorService
  ){
    this.url = GLOBAL.url;
  }



  getOwner(){
    const token: any = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    });

    return this.http.get(`${this.url}/api/entreprise/details`,{headers: headers}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }



}

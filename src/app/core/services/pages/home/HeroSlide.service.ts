import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { GLOBAL } from '../../global';
import { HandleErrorService } from '../../handleError.service';

@Injectable({
  providedIn: 'root'
})
export class HeroSlideService {

  private url:string;

  private apiUrl = 'http://localhost:8000/api/hero-slides';

  constructor(
    private http: HttpClient,
    private _handleErrorsService: HandleErrorService
  ) {
    this.url = GLOBAL.url;
  }

  getSlides(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/hero-slides`).pipe(
          catchError((error) => this._handleErrorsService.handleError(error))
        );
  }

  getSlide(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/hero-slides/${id}`,{headers: this.getHeader()}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  createSlide(slide: Omit<any, 'id'>): Observable<any> {
    return this.http.post<any>(`${this.url}/hero-slides`, slide,{headers: this.getHeader()}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  updateSlide(id: number, slide: Partial<any>): Observable<any> {
    return this.http.put<any>(`${this.url}/hero-slides/${id}`, slide,{headers: this.getHeader()}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  deleteSlide(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/hero-slides/${id}`,{headers: this.getHeader()}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  updateOrder(slides: {id: number, order: number}[]): Observable<any> {
    return this.http.patch(`${this.url}/update-order`, { slides },{headers: this.getHeader()}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }


  getHeader(){
    const token: any = localStorage.getItem('access_token');
    return  new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    })
  }
}

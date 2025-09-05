// news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { GLOBAL } from '../../global';
import { HandleErrorService } from '../../handleError.service';

export interface PostsHome {
  id?: number;
  title: string;
  description: string;
  image?: any;
  button_name?: any;
  button_href?: any;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
}

@Injectable({
  providedIn: 'root'
})
export class PostsHomeService {
  private apiUrl = '/api/v1/posts-home';

    private url:string;

  constructor(
    private http: HttpClient,
    private _handleErrorsService: HandleErrorService
  ) {
    this.url = GLOBAL.url;
  }

  getAllPostsHome(): Observable<PostsHome[]> {
    return this.http.get<PostsHome[]>(this.url + this.apiUrl).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  getPostsHome(id: number): Observable<PostsHome> {
    return this.http.get<PostsHome>(`${this.url + this.apiUrl}/${id}`).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
}

  createPostsHome(newsData: FormData): Observable<ApiResponse<PostsHome>> {
    return this.http.post<ApiResponse<PostsHome>>(this.url + this.apiUrl, newsData,{headers: this. getHeader()}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  updatePostsHome(id: number, newsData: FormData): Observable<ApiResponse<PostsHome>> {
    return this.http.patch<ApiResponse<PostsHome>>(`${this.url + this.apiUrl}/${id}`, newsData,{headers: this. getHeader()}).pipe(
      catchError((error) => this._handleErrorsService.handleError(error))
    );
  }

  deletePostsHome(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.url + this.apiUrl}/${id}`,{headers: this. getHeader()}).pipe(
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

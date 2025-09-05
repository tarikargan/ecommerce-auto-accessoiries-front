import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File,entre:any ): Observable<HttpEvent<{}> | any> {
    const formdata: FormData = new FormData();
    formdata.append('file', file, 'converted.webp');
    formdata.append('folder', entre);
    formdata.append('secret', environment.Upload.secret);
    const url = environment.Upload.apiUrl.concat(environment.Upload.uploadScript);
    const req = new HttpRequest('POST', url, formdata, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFileUrl(fileName: string, entre:string) {
    const pictureUrl = environment.Upload.uploadScript.substring(0, environment.Upload.uploadScript.lastIndexOf('/'));

    return `${pictureUrl}/uploads/${entre}/${fileName}`;
  }

}

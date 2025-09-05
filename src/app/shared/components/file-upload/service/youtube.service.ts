import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private readonly apiKey : string = 'AIzaSyB0fhZiJYWx9DEBPCofeNRcxkf9m4uDb94';

  constructor(private http: HttpClient) {}

  isValid(videoLink: string) : boolean {
    return videoLink?.length && (videoLink.indexOf('youtube.com') !== -1 || videoLink.indexOf('youtu.be') !== -1) ? true : false;
  }

  getVideoId(videoLink: string): string | null {
    let videoId = null;
    if (videoLink.indexOf('v=') !== -1) {
      /**
       * Example:
       *    https://www.youtube.com/watch?v=aZ-dSpfdHok
       *    https://www.youtube.com/watch?v=aZ-dSpfdHok&feature=feedrec_grec_index
       */
      videoId = videoLink.split('v=')[1];
      const index = videoId.indexOf('&');
      if (index !== -1) {
        videoId = videoId.substring(0, index);
      }
    } else if (videoLink.indexOf('/') !== -1) {
      /**
       * Example:
       *    https://youtu.be/aZ-dSpfdHok
       *    https://youtu.be/PqkaBUmJpq8?list=PLmmPGQQTKzSZSPd3pa6q9UQ-PkeCx1fam
       */
      const link = videoLink.split('?')[0];
      const params = link.split('/');
      videoId = params[params.length - 1];
    }
    return videoId;
  }

  getVideoInfo(videoId: string): Promise<any> {
    return this.http.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${this.apiKey}&part=snippet,contentDetails`).toPromise();
  }

  getVideoLink(videoId: string) {
    return `https://youtu.be/${videoId}`;
  }

}

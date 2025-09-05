import { Component, OnInit, Input } from '@angular/core';
import { YoutubeService } from '../../service/youtube.service';

@Component({
  selector: 'app-youtube-video-preview',
  templateUrl: './youtube-video-preview.component.html',
  styleUrls: ['./youtube-video-preview.component.scss']
})
export class YoutubeVideoPreviewComponent implements OnInit {

  @Input() video: any;
  data: any = null;

  constructor(public youtubeService: YoutubeService) { }

  ngOnInit() {
    this.getVideoData();
  }

  update(video: string) {
    this.video = video;
    this.getVideoData();
  }

  private getVideoData() {
    if (this.youtubeService.isValid(this.video)) {
      const videoId = this.youtubeService.getVideoId(this.video);
      if (videoId) {
        this.youtubeService.getVideoInfo(videoId).then((data) => {
          this.data = data.items?.length ? data : null;
        });
      } else {
        this.data = null;
      }
    } else {
      this.data = null;
    }
  }

  durationToString(duration: string): string {
    const seconds = this.convertISO8601ToSeconds(duration);

    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);

    const hDisplay = h > 0 ? h + " hr " : "";
    const mDisplay = m > 0 ? m + " min " : "";
    const sDisplay = s > 0 ? s : "";
    return hDisplay + mDisplay + sDisplay;
  }

  private convertISO8601ToSeconds(input: string): number {
    const reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    let hours = 0, minutes = 0, seconds = 0, totalseconds=0;
    if (reptms.test(input)) {
      const matches = reptms.exec(input)!;
      if (matches[1]) hours = Number(matches[1]);
      if (matches[2]) minutes = Number(matches[2]);
      if (matches[3]) seconds = Number(matches[3]);
      totalseconds = hours * 3600  + minutes * 60 + seconds;
    }
    return (totalseconds);
  }

}

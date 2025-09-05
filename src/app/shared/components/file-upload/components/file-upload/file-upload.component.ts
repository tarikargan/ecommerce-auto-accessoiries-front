import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop/ngx-file-drop/ngx-file-drop-entry';
import { environment } from 'src/environments/environment';
// import { UtilitiesService } from './../../../../../core/services/utilitie.service';
import { YoutubeVideoPreviewComponent } from '../youtube-video-preview/youtube-video-preview.component';
// import { TranslateService } from '@ngx-translate/core';
// import { toastService } from './../../../../../core/services/reactiveService/toast.service';
import {
  DataUrl,
  DOC_ORIENTATION,
  NgxImageCompressService
} from 'ngx-image-compress';
import { YoutubeService } from '../../service/youtube.service';
import { NgForm } from '@angular/forms';
// import { ToastrService } from 'src/app/core/services/reactiveService/toastr.service';
import { Media } from 'src/app/core/classes/media';
import { UtilitiesService } from 'src/app/core/services/utilitie.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import imageCompression from 'browser-image-compression';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  environment = environment;
  @Input() title: string = 'platform.upload.dropDoc';
  @Input() files: File[] = [];
  @ViewChild('openDropDown') openDropDown! : ElementRef;

  @Output() filesChange: EventEmitter<File[]>                 = new EventEmitter<File[]>();
  @Output() fileChange: EventEmitter<File>                    = new EventEmitter<File>();
  @Input() existingFiles                          :any;

  @Output() existingFilesChange: EventEmitter<Media | null>  = new EventEmitter<Media | null>();
  @Input() accept                                 :string[]  = [];
  @Input() multiple                               :boolean   = false;
  // @Input() maxFileDocSize: number = 5; // MB
  @Input() maxFileSize                            :number    = 2; // MB
  @Input() ImgRatio                               :number    = 50;
  @Input() ImgQuality                             :number    = 50;



  @Input() required                               :boolean   = false;
  @Input() addYoutubeButton                       :boolean   = true;
  @Input() addAvatar                              :boolean   = false;
  url = '';
  files_                                          :any[]     = [];
  videoLink                                       :any;
  @ViewChild(YoutubeVideoPreviewComponent)
  private videoPreview!: YoutubeVideoPreviewComponent;
  data                                            :any       = null;
  displayFilesDropDown                            :boolean   = false;

  constructor(
    private imageCompress: NgxImageCompressService,
    public utils: UtilitiesService,
    private youtubeService: YoutubeService,
    private _toastrService   : ToastrService
  ) {}

  ngOnInit(): void {
    if (this.addYoutubeButton) {
      if (!this.isAccepted('video')) this.addYoutubeButton = false;
      else {
        if (this.getExistingFiles()[0]) {
          if (this.getExistingFiles()[0].type == 'video/youtube')
            this.videoLink = this.getExistingFiles()[0].url;
        }
      }
    }
  }


  openFiles(event:any){
    // console.log(event.target.classList, event.target.classList);

    if(event.target.classList.contains('preventDefault')){
      return;
    }
    else{
      this.openDropDown.nativeElement.click();
    }

  }
  toggleFilesDropDown(){
    this.displayFilesDropDown = !this.displayFilesDropDown;
  }
  getFilesNumber(){

    if(this.existingFiles && this.existingFiles.length > 0 || this.files.length > 0){
      return this.existingFiles ? this.existingFiles.length + this.files.length : this.files.length;
    }else return 0;
  }
  private isAccepted(fileT: File | string) {
    let fileType = '';
    if (typeof fileT == 'string') fileType = fileT.toLocaleLowerCase();
    else {
      if (fileT.type !== '') fileType = fileT.type.toLocaleLowerCase();
      else fileType = fileT.name.toLocaleLowerCase();
    }
    // const fileType = fileT.toLocaleLowerCase();
    if (!this.accept.length) {
      return true;
    }
    let isAccepted = false;

    this.accept.forEach((type: string) => {
      if (
        ((typeof fileT == 'string' || fileT.type !== '') &&
          fileType.startsWith(type)) ||
        (typeof fileT !== 'string' && fileT.type == '')
      ) {
        if (
          !fileType.endsWith('x-msdownload') &&
          !fileType.endsWith('javascript') &&
          !fileType.endsWith('octet-stream')
        ) {
          isAccepted = true;
          return;
        }
      }
    });
    return isAccepted;
  }

  dropped(files: NgxFileDropEntry[]) {
    if (!this.multiple) {
      this.files = [];
    }
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          // Here you can access the real file
          console.log('file:', droppedFile.relativePath, file);
          this.utils.debug.log('file:', droppedFile.relativePath, file);
          this.fileChange.emit(file);

          // Checking file
          const fileSize = file.size / 1024 / 1024 ; // convert to MB

          if(this.isFileAllowed(file.name)){
            console.log('this.isFileAllowed(file.name):::', this.isFileAllowed(file.name));


          }else{
            this._toastrService.toastError('Type de fichier non accepté, veuillez choisir un autre fichier');
            // console.log('is not accepted');
            return ;
          }
          if (!this.isAccepted(file)) {
            console.log('!this.isAccepted(file):::', this.isAccepted(file));
            // this.utils.snackBar.error(
            //   await this.utils.translate
            //     .get('platform.upload.wrongFileType')
            //     .toPromise()
            // );
          } else if (
            (file.type.startsWith('video') ||
              file.type.startsWith('application') ||
              file.type.startsWith('text') ||
              file.type.startsWith('image') ||
              (file.type == '' && this.isFileAllowed(file.name))) &&
            fileSize > this.maxFileSize
          ) {
            this._toastrService.toastError(`Taille maximum autorisée: ${this.maxFileSize}MB`);
            // this.utils.snackBar.error(
            //   await this.utils.translate
            //     .get('platform.upload.maxFileSize', {
            //       size: `${this.maxFileSize} MB`,
            //     })
            //     .toPromise()
            // );
          } else {
            const options = {
              maxSizeMB: 1,        // Max size in MB
              maxWidthOrHeight: 800, // Max width/height
              useWebWorker: true,
              fileType: 'image/webp' // Convert to WebP
            };

            // console.log({compressedFile});


            var reader = new FileReader();
            reader.readAsDataURL(file); // read file as data url
            reader.onload = async (event) => {
              if (file.type.startsWith('image') && (fileSize>1 || this.addAvatar)) {

                this.url = await this.compressPic(fileSize,
                  event.target!.result!.toString()
                );

                let newFile = this.dataURLtoFile(this.url, file.name);

                const compressedFile = await imageCompression(file, options);
                this.files.push(compressedFile);
                // this.files.push(newFile);
                console.log({compressedFile});

                this.filesChange.emit(this.files);
              } else {
                // called once readAsDataURL is completed
                this.url = event.target!.result!.toString();
                const compressedFile = await imageCompression(file, options);
                this.files.push(compressedFile);
                // this.files.push(file);
                let file_:any = file;
                file_['url']  = this.url;

                this.files_.push(file_);
                this.filesChange.emit(this.files);
              }
            };
          }
        });
      } else {

        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        this.utils.debug.log(droppedFile.relativePath, fileEntry);
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  dataURLtoFile(dataUrl: string, fileName: string) {
    let arr = dataUrl.split(',');
    let mime = arr[0].match(/:(.*?);/)![1];
    let bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  }

  // : Promise<File>
  compressPic(Fsize:number, imgS: string): Promise<string> {
    if(!this.addAvatar) this.ImgQuality = 80;
    return new Promise((resolve, reject) => {
      this.imageCompress
        .compressFile(imgS, DOC_ORIENTATION.Up, this.ImgRatio, this.ImgQuality)
        .then((result_1: DataUrl) => {
          result_1;
          resolve(result_1);
        });
    });
  }

  isFileAllowed(fileName: string) {
    let isFileAllowed = false;
    const allowedFiles = ['.ppt', '.pptx', '.doc', '.docx', '.pdf', '.xlsx', '.jpg', '.jpeg', '.png','.gif', '.bmp', '.csv','.webp'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    // console.log({extension});

    if (undefined !== extension && null !== extension) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }

  getExistingFiles() {
    return this.existingFiles
      ? this.isArray(this.existingFiles)
        ? this.existingFiles
        : [this.existingFiles]
      : [];
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.files_.splice(index, 1);

    this.filesChange.emit(this.files);
    // console.log(this.files);

  }

  deleteExistingFile(index: number) {
    // console.log('delete this.existingFiles');

    if (this.isArray(this.existingFiles)) {
      (this.existingFiles as Media[]).splice(index, 1);
    } else {
      this.existingFiles != null;
    }
    this.existingFilesChange.emit(this.existingFiles);
  }

  clearFiles() {
    this.files = [];
    this.filesChange.emit(this.files);
  }

  clearExistingFiles() {
    // console.log('delete this.existingFiles');
    this.existingFiles = this.isArray(this.existingFiles) ? [] : null;
    this.existingFilesChange.emit(this.existingFiles);
  }

  private isArray(arr: any) {
    return arr instanceof Array;
  }

  openYoutubeDialog(result: any) {
    const media: Media = {
      name: result.title,
      type: 'video/youtube',
      size: '',
      originName: '',
      url: result.url,
    };
    if (this.isArray(this.existingFiles)) {
      (this.existingFiles as Media[]).push(media);
    } else {
      this.existingFiles = media;
    }

    this.existingFilesChange.emit(this.existingFiles);
    this.filesChange.emit(this.existingFiles);
  }

  updateVideoPreview() {
    this.videoPreview?.update(this.videoLink);
  }

  import(form: NgForm): void {
if (form.valid && this.youtubeService.isValid(this.videoLink)) {
      this.getVideoData();
    } else {
      const videoLinkControl = form.controls['videoLink'];
      videoLinkControl.markAsTouched();
      videoLinkControl.setErrors({ invalid: true });
    }
  }

  private getVideoData() {
    if (this.youtubeService.isValid(this.videoLink)) {
      const videoId = this.youtubeService.getVideoId(this.videoLink);
      if (videoId) {
        this.youtubeService.getVideoInfo(videoId).then((data) => {
          this.data = data.items?.length ? data : null;

          let res = {
            title: this.data?.items[0]?.snippet?.title,
            url: this.videoLink,
          };
          this.openYoutubeDialog(res);
        });
      } else {
        this.data = null;
      }
    } else {
      this.data = null;
    }
    // return this.data;
  }

  durationToString(duration: string): string {
    const seconds = this.convertISO8601ToSeconds(duration);

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    const hDisplay = h > 0 ? h + ' hr ' : '';
    const mDisplay = m > 0 ? m + ' min ' : '';
    const sDisplay = s > 0 ? s : '';
    return hDisplay + mDisplay + sDisplay;
  }

  private convertISO8601ToSeconds(input: string): number {
    const reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    let hours = 0,
      minutes = 0,
      seconds = 0,
      totalseconds = 0;
    if (reptms.test(input)) {
      const matches = reptms.exec(input)!;
      if (matches[1]) hours = Number(matches[1]);
      if (matches[2]) minutes = Number(matches[2]);
      if (matches[3]) seconds = Number(matches[3]);
      totalseconds = hours * 3600 + minutes * 60 + seconds;
    }
    return totalseconds;
  }

}

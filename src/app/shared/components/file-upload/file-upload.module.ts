import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YoutubeVideoPreviewComponent } from './components/youtube-video-preview/youtube-video-preview.component';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
// import { YoutubeDialogComponent } from './components/youtube-dialog/youtube-dialog.component';

@NgModule({
  declarations: [
    FileUploadComponent,
    YoutubeVideoPreviewComponent,

  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule
   ],
  exports: [
    FileUploadComponent,
    YoutubeVideoPreviewComponent,
    // YoutubeDialogComponent
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FileUploadModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ContentLoadingModule } from 'src/app/shared/components/content-loading/content-loading.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { FileUploadModule } from "../../../shared/components/file-upload/file-upload.module";
import { ColorPickerModule } from 'ngx-color-picker';
import { CMSComponent } from './cms.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { CarouselHomeFormComponent } from './home/carousel/carousel-home-form/carousel-home-form.component';
import { BaseUiModule } from 'src/app/shared/baseUi/baseUi.module';
import { PostsHomeComponent } from './home/posts-home/posts-home.component';
import { PostshomeFormComponent } from './home/posts-home/postshome-form/postshome-form.component';
import { ProductsHomeComponent } from './home/products-home/products-home.component';
const routes: Routes = [
  {
    path:'', component: CMSComponent
  },
  {
    path:'', redirectTo : '/admin/cms',pathMatch: 'full'
  },

];
@NgModule({
  declarations: [
    CMSComponent,
    HomeComponent,
    CarouselComponent,
    CarouselHomeFormComponent,
    PostsHomeComponent,
    PostshomeFormComponent,
    ProductsHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule,
    ContentLoadingModule,
    PipesModule,
    FileUploadModule,
    ColorPickerModule,
    BaseUiModule
],
  exports: [],
  providers: [],
})
export class CmsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLoadingModule } from 'src/app/shared/components/content-loading/content-loading.module';
import { BlogComponent } from './blog.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { FileUploadModule } from 'src/app/shared/components/file-upload/file-upload.module';
import { QuillModule } from 'ngx-quill';
import { BlogcategoryFormComponent } from './blogcategory-form/blogcategory-form.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes : Routes = [
   {
    path:'',
    component: BlogComponent
   },
   {
    path:'details/:id',
    component: BlogDetailsComponent
   }
]
@NgModule({
  declarations: [
    BlogComponent,
    BlogFormComponent,
    BlogcategoryFormComponent,
    BlogDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    ReactiveFormsModule,
    ContentLoadingModule,
    FileUploadModule,
    FormsModule,
    QuillModule,
   ],
  exports: [],
  providers: [],
})
export class BlogModule {}

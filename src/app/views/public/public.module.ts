import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PopupModule } from 'src/app/shared/components/popup/popup.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundpageComponent } from './not-foundpage/not-foundpage.component';


const routes: Routes = [
  {
   path:'options',
   component:ContactUsComponent,
  },
  {
   path:'**',
   component:NotFoundpageComponent,
  }

];

@NgModule({
  declarations: [
    ContactUsComponent,
    NotFoundpageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  providers: [],
})
export class PublicModule {}

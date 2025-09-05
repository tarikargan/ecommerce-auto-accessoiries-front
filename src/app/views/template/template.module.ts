import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PopupModule } from 'src/app/shared/components/popup/popup.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SettingsComponent } from './settings/settings.component';
import { FileUploadModule } from 'src/app/shared/components/file-upload/file-upload.module';
import { NgApexchartsModule } from 'ng-apexcharts';

const routes: Routes = [
  {
   path:'',
   component: DashboardComponent,
   data: { title: 'dashboard' }
  },
  {
   path:'products',
   loadChildren: () => import('./products/product.module').then(m => m.ProductModule),
   data: { title: 'Options Component' }
  },
  {
   path:'analiytics',
   loadChildren: () => import('./analiytics/analiytics.module').then(m => m.AnaliyticsModule),
   data: { title: 'Options Component' }
  },
  {
   path:'orders',
   loadChildren: () => import('./orders/order.module').then(m => m.OrderModule),
   data: { title: 'Options Component' }
  },
  {
   path:'clients',
   loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
   data: { title: 'Options Component' }
  },
  {
    path:'settings',
    component: SettingsComponent,
    data: { title: 'settings' }
   },
   {
    path:'production-module',
    loadChildren: () => import('./settings/production-module/production-module.module').then(m => m.ProductionModuleModule),
    data: { title: 'production' }
   },
   {
    path:'sales-module',
    loadChildren: () => import('./settings/sales-module/sales-module.module').then(m => m.SalesModuleModule),
    data: { title: 'sales' }
   },
   {
    path:'profile',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    data: { title: 'profile' }
   },
   {
    path:'blogs',
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
    data: { title: 'profile' }
   },
   {
    path:'pages',
    loadChildren: () => import('./CMS/cms.module').then(m => m.CmsModule),
    data: { title: 'profile' }
   },
  {
    path:'', redirectTo : '',pathMatch: 'full'
  },

];

@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PopupModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    FileUploadModule,

    NgApexchartsModule

  ],
  exports: [],
  providers: [],
})
export class TemplateModule {}

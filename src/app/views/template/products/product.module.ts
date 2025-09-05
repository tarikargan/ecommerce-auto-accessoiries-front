import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductQuantitetailleComponent } from './product-quantitetaille/product-quantitetaille.component';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductqutailleFormComponent } from './product-quantitetaille/productqutaille-form/productqutaille-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductSaisonComponent } from './product-saison/product-saison.component';
import { QuillModule } from 'ngx-quill';
import { ContentLoadingModule } from 'src/app/shared/components/content-loading/content-loading.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { FileUploadModule } from "../../../shared/components/file-upload/file-upload.module";
import { ColorPickerModule } from 'ngx-color-picker';
const routes: Routes = [
  {
    path:'',
    component: ProductsComponent,
    data: { title: 'products' }
   },
   {
    path:':id/quantite-taille',
    component: ProductQuantitetailleComponent,
    data: { title: 'products' }
   },
   {
    path:'details',
    component: ProductDetailsComponent,
    data: { title: 'products details' }
   },
  {
    path:'', redirectTo : '/admin/options',pathMatch: 'full'
  },

];
@NgModule({
  declarations: [
    ProductQuantitetailleComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductqutailleFormComponent,
    ProductFormComponent,
    ProductSaisonComponent,
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
    ColorPickerModule
],
  exports: [],
  providers: [],
})
export class ProductModule {}

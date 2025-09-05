import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { MatierepreComponent } from './matierepre/matierepre.component';
import { SaisonComponent } from './saison/saison.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFournisseurComponent } from './fournisseur/form-fournisseur/form-fournisseur.component';
import { PopupModule } from 'src/app/shared/components/popup/popup.module';
import { FormMatierepremiereComponent } from './matierepre/form-matierepremiere/form-matierepremiere.component';
import { PaymentMatiereformComponent } from './matierepre/payement-matierepre/payment-matiereform/payment-matiereform.component';
import { StockComponent } from './stock/stock.component';
import { SaisonFormComponent } from './saison/saison-form/saison-form.component';
import { StockFormComponent } from './stock/stock-form/stock-form.component';;
import { ProductionComponent } from './production/production.component';
import { ProductionFormComponent } from './production/production-form/production-form.component';
import { ProductionQuantitetailleComponent } from './production/production-quantitetaille/production-quantitetaille.component';
import { ProductionqutailleFormComponent } from './production/production-quantitetaille/productionqutaille-form/productionqutaille-form.component';
import { ProductionPaiementComponent } from './production/production-paiement/production-paiement.component';
import { ProductionpaiementFormComponent } from './production/production-paiement/productionpaiement-form/productionpaiement-form.component';
import { ProductionpaiementadvancedFormComponent } from './production/production-paiement/productionpaiementadvanced-form/productionpaiementadvanced-form.component';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { PayementMatierepreComponent } from './matierepre/payement-matierepre/payement-matierepre.component';
import { PaymentadvancedMatiereformComponent } from './matierepre/payement-matierepre/paymentadvanced-matiereform/paymentadvanced-matiereform.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { UnitComponent } from './unit/unit.component';
import { QuillModule } from 'ngx-quill';
import { TailleComponent } from './taille/taille.component';
import { ContentLoadingModule } from 'src/app/shared/components/content-loading/content-loading.module';
import { CatgroryFormComponent } from './categories/catgrory-form/catgrory-form.component';
import { FileUploadModule } from 'src/app/shared/components/file-upload/file-upload.module';
import { SubcategoryFormComponent } from './sub-categories/subcategory-form/subcategory-form.component';
import { VariantFormComponent } from './taille/variant-form/variant-form.component';

const routes: Routes = [
  {
   path:'fournisseurs',
   component: FournisseurComponent,
   data: { title: 'fournisseurs' }
  },
  {
   path:'matiere-promieres',
   component: MatierepreComponent,
   data: { title: 'matiere promieres' }
  },
  {
    path:'matiere-promieres/:id/paiement',
    component: PayementMatierepreComponent,
    data: { title: 'matiere premiere - paiement' }
  },
  {
   path:'productions',
   component: ProductionComponent,
   data: { title: 'productions' }
  },
  {
    path:'productions/:id/quantite-taille',
    component: ProductionQuantitetailleComponent,
    data: { title: 'quantity of production ' }
  },
  {
    path:'productions/:id/paiement',
    component: ProductionPaiementComponent,
    data: { title: 'productions - paiement' }
  },
  {
   path:'saisons',
   component: SaisonComponent,
   data: { title: 'saisons' }
  },
  {
   path:'inventory',
   component: StockComponent,
   data: { title: 'stockes' }
  },
  {
   path:'attributes',
   component: TailleComponent,
   data: { title: 'tailles' }
  },
  {
   path:'categories',
   component: CategoriesComponent,
   data: { title: 'categories' }
  },
  {
   path:'sub-categories',
   component: SubCategoriesComponent,
   data: { title: 'sub categories' }
  },
  {
   path:'unites',
   component: UnitComponent,
   data: { title: 'unit' }
  },
  {
    path:'', redirectTo : '/admin/options',pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    FournisseurComponent,
    MatierepreComponent,
    SaisonComponent,
    FormFournisseurComponent,
    FormMatierepremiereComponent,
    PaymentMatiereformComponent,
    PayementMatierepreComponent,
    StockComponent,
    SaisonFormComponent,
    StockFormComponent,
    ProductionComponent,
    ProductionFormComponent,
    ProductionQuantitetailleComponent,
    ProductionqutailleFormComponent,
    ProductionPaiementComponent,
    ProductionpaiementFormComponent,
    ProductionpaiementadvancedFormComponent,
    PaymentadvancedMatiereformComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    UnitComponent,
    TailleComponent,
    CatgroryFormComponent,
    SubcategoryFormComponent,
    VariantFormComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    PopupModule,
    LoadingModule,
    ContentLoadingModule,
    QuillModule.forRoot(),
    FileUploadModule
   ],
  exports: [],
  providers: [],
})
export class ProductionModuleModule {}

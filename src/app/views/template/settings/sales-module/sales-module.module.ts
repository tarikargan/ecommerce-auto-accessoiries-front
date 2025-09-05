import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtapesComponent } from './etapes/etapes.component';
import { ModeLivraisonComponent } from './mode-livraison/mode-livraison.component';
import { OffresComponent } from './offres/offres.component';
import { SourcesComponent } from './sources/sources.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
   path:'etapes',
   component: EtapesComponent,
   data: { title: 'etapes' }
  },
  {
   path:'sources',
   component: SourcesComponent,
   data: { title: 'sources' }
  },
  {
   path:'offres',
   component: OffresComponent,
   data: { title: 'offres' }
  },
  {
   path:'mode-livraison',
   component: ModeLivraisonComponent,
   data: { title: 'mode de livraison' }
  },
];

@NgModule({
  declarations: [
    EtapesComponent,
    ModeLivraisonComponent,
    OffresComponent,
    SourcesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
   ],
  exports: [],
  providers: [],
})
export class SalesModuleModule {}

import { Component, OnInit } from '@angular/core';

import { take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { SVGArCircleIcon, SVGFrCircleIcon,SVGEnCircleIcon} from 'src/app/core/services/svgIcons';
import { ProduitService } from 'src/app/core/services/produit/produit.service';
import { NavigationExtras, Router } from '@angular/router';
import { ProductionService } from 'src/app/core/services/production-module/productions/productions.service';
// import { ElearningService } from 'src/app/core/services/elearning/elearning.service';
// import { ToggleScrollbarService } from 'src/app/core/services/reactiveService/toggleScrollbar.service';


@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent {
  environment                       :any      = environment;

  languages                         :string[] = [];
  lang                              :any      = 'fr';

  userType                          :string   = 'manager';
  checkedAll                        :boolean  = false;
  // allUsers                          :any;
  activeDropDown                    :any      = '';

  productions                       :any[]    = [];
  sortType                          :string   = '';
  searchValue                       :string   = '';

  showForm                          :boolean  = false;
  loading                           :boolean  = true;
  displayVideo                      :boolean  = false;

  eventType                         :any      = EventTypes.Add;
  editProduct_                      :any;
  indexEditItem                     :any;

  activeQuTailleArea                     :boolean  = false;

  quantiteTailleId                  :any;



  constructor(
    private _ProductionService      :ProductionService,
    private router                  :Router
  ) { }



  ngOnInit(): void {
    this.languages = environment.supportedLanguages;

    this.getAll();
  }

  getAll(){
    this._ProductionService.getAll()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data =>{
      this.loading = false;
      console.log({data});

      this.productions = data;

    },
    eroor => {
      this.loading = false;
    }
    )
  }


  toggleTypeUser(type:any){

  }



  calcQuantity(quantiteTaille:any[]){
    if(quantiteTaille.length > 0){
      let quantite = quantiteTaille.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.quantite, 0);
      return quantite;
    }
    return 0;
  }


  getStyle(quantiteTaille:any[]){
    if(quantiteTaille.length > 0){
      let quantite = quantiteTaille.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.quantite, 0);
      if(quantite > 10){
        return 'bg-white text-green-500';
      }else{
        return 'bg-white text-red-500';
      }
    }
    return 'bg-white text-red-500';
  }

  closeQuTaille(){
    this.activeQuTailleArea   = false;
    this.quantiteTailleId     = null;
  }


  handleQuantiteTaille(id:any){
    this.activeQuTailleArea   = true;
    this.quantiteTailleId     = id;
  }


  closePopup(){
    this.checkedAll             = false;
    this.editProduct_           = null;
    this.indexEditItem          = null;
    this.eventType              = EventTypes.Add;
  }

  addMatierepre(){
    this.showForm = true;
  }

  addedProduct(elearning:any){
    if(typeof elearning === 'object' && elearning !== null){
      this.productions  = [elearning, ...this.productions];
      this.showForm    = false;
    }
  }

  editProduction(item:any,index:any){
    this.eventType       = EventTypes.Edit;
    this.editProduct_    = item;
    this.indexEditItem   = index;
    this.showForm        = true;

  }

  updatedProduct(elearning:any){
    if(typeof elearning === 'object' && elearning !== null){
      this.productions.splice(this.indexEditItem,1,elearning);
      this.closeForm();
    }
  }


  closeForm(){
    this.showForm         = false;
    this.editProduct_     = null;
    this.eventType        = EventTypes.Add;
    this.indexEditItem    = null;
  }


  deleteProduct(id:any){
    if(confirm('are you sure you want to delete this item ?')){
      this._ProductionService.delete(id)
      .pipe(take(1))
      .subscribe(
        data => {
          this.productions = this.productions.filter(el => el?.id !== id)
        },
        error => console.error(error)
      )
    }
  }

  toggeDropDown(id:any){
      this.activeDropDown = this.activeDropDown == id ? '': id;
  }

  switchLang(e:any){
    this.lang = e;

  }



  /**
     * navigate to custom bilan
     * @param id
     */
  displayDetails(id:any){
    let url = 'admin/products/details';
    console.log({url}, id);

    let navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    }

    this.router.navigate([url], navigationExtras);
  }

}


import { Component, OnInit } from '@angular/core';

import { take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { ProduitService } from 'src/app/core/services/produit/produit.service';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  environment                       :any      = environment;

  languages                         :string[] = [];
  lang                              :any      = 'fr';

  userType                          :string   = 'manager';
  checkedAll                        :boolean  = false;
  // allUsers                          :any;
  activeDropDown                    :any      = '';

  products                          :any[]    = [];
  links                             :any      = [];
  meta                              :any      = [];

  sortType                          :string   = '';
  searchValue                       :string   = '';

  showForm                          :boolean  = false;
  loading                           :boolean  = true;
  displayVideo                      :boolean  = false;

  eventType                         :any      = EventTypes.Add;
  editProduct_                      :any;
  indexEditItem                     :any;

  activeQuTailleArea                :boolean  = false;

  quantiteTailleId                  :any;


  // saison options

  displaySaisonPopup                :boolean        = false;
  editProductSaisonId               :any;
  oldSaison                         :any;
  productSaisonindex                :any            = null;



  constructor(
    private _ProduitService         :ProduitService,
    private router                  :Router
  ) { }



  ngOnInit(): void {
    this.languages = environment.supportedLanguages;

    this.getAll();
  }

  getAll(){
    this._ProduitService.getAll()
    .pipe(take(1))
    .subscribe((res:any) =>{
      this.loading = false;
      console.log({res});

      // this.data  = res?.data;
      this.products = res?.data;
      this.links    = res?.links;
      this.meta     = res?.meta;


    },
    eroor => {
      this.loading = false;
    }
    )
  }


  handlePagination(url:any){
    if(url !== null){
      this._ProduitService.getBypaginate(url)
      .pipe(take(1))
      .subscribe((res:any) => {
        console.log(res);

        this.products  = res?.data;
        this.links     = res?.links;
        this.meta      = res?.meta;
      });
    }
  }


  handleSearch(event:any){
    console.log(event.target.value);
    let data = {
      search : event.target.value
    }
    this._ProduitService.search(data)
    .pipe(take(1))
    .subscribe((res:any) => {
      console.log(res);

      this.products  = res?.data;
      this.links     = res?.links;
      this.meta      = res?.meta;
    });
  }


  toggleTypeUser(type:any){

  }



  calcQuantity(quantiteTaille:any[]){
    // console.log({quantiteTaille});

    if(quantiteTaille.length > 0){
      let orders   = quantiteTaille.flatMap((q:any) =>  q?.commandes);
      // console.log({orders});


      let quantite = quantiteTaille.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.quantite, 0);
      let sold = orders.length > 0 ? orders.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.quantite, 0) : 0;
      let left = quantite - sold;
      return {
        quantite,
        sold,
        left
      };
    }
    return {
      quantite:0,
      sold:0,
      left:0
    };
  }


  getStyle(quantiteTaille:any[]){
    if(quantiteTaille.length > 0){
      let quantite = quantiteTaille.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.quantite, 0);
      if(quantite > 10){
        return 'text-green-500';
      }else{
        return 'text-red-500';
      }
    }
    return 'text-red-500';
  }

  closeQuTaille(){
    this.activeQuTailleArea   = false;
    this.quantiteTailleId     = null;
  }



  // update saison
  editProductSaison(id:any, saison:any,index:any){
    this.editProductSaisonId = id;
    this.productSaisonindex  = index;
    this.oldSaison           = saison;
    this.displaySaisonPopup  = true;
  }

  updatedSaison(event:any){
    // console.log('event', event);
    this.products.splice(this.productSaisonindex,1,event);
    this.hideSaisonPopup();

  }

  hideSaisonPopup(){
    this.displaySaisonPopup  = false;
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
      this.products  = [elearning, ...this.products];
      this.showForm    = false;
    }
  }

  editProduct(item:any,index:any){
    this.eventType       = EventTypes.Edit;
    this.editProduct_    = item;
    this.indexEditItem   = index;
    this.showForm        = true;

  }

  updatedProduct(elearning:any){
    if(typeof elearning === 'object' && elearning !== null){
      this.products.splice(this.indexEditItem,1,elearning);
      this.closeForm();
    }
  }

  duplicate(item:any,index:any){
    this.eventType       = EventTypes.Duplicate;
    this.editProduct_    = item;
    this.indexEditItem   = index;
    this.showForm        = true;

  }

  closeForm(){
    this.showForm         = false;
    this.editProduct_     = null;
    this.eventType        = EventTypes.Add;
    this.indexEditItem    = null;
  }


  deleteProduct(id:any){
    if(confirm('are you sure you want to delete this item ?')){
      this._ProduitService.delete(id)
      .pipe(take(1))
      .subscribe(
        data => {
          this.products = this.products.filter(el => el?.id !== id)
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


  handleChangeStatus(event:any, id:any){
    let data = {
      status : event?.target.checked
    }
    event.target.classList.add('pointer-events-none', 'animate-pulse');


    this._ProduitService.toggleSatus(id,data)
    .subscribe((res)=>{
      if(res?.success == true){
        event.target.classList.remove('pointer-events-none', 'animate-pulse');
      }else{
        console.log('something was worning');

      }
    })

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

  getSizes(item:any){
    // console.log({item});

    if(item.quantite_taille.length > 0){
      let taille = item.quantite_taille.map((el:any) => el?.taille?.name);
    let uniqueArr = [...new Set(taille)];
    return [...uniqueArr];
    }else  return [];
  }





}


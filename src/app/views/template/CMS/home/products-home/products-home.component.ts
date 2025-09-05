import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ProduitService } from 'src/app/core/services/produit/produit.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss']
})
export class ProductsHomeComponent {
  environment                       :any      = environment;

  products                          :any[]    = [];
  links                             :any      = [];
  meta                              :any      = [];

  loading                           :boolean  = true;
  // languages: string[];



    constructor(
      private _ProduitService         :ProduitService,
      private router                  :Router
    ) { }



    ngOnInit(): void {
      // this.languages = environment.supportedLanguages;

      this.getAll();
    }


      getAll(){
        this._ProduitService.getPublishedProducts()
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
      search : event.target.value,
      activeProduct : true
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

    getSizes(item:any){
    // console.log({item});

    if(item.quantite_taille.length > 0){
      let taille = item.quantite_taille.map((el:any) => el?.taille?.name);
    let uniqueArr = [...new Set(taille)];
    return [...uniqueArr];
    }else  return [];
  }

    calcQuantity(quantiteTaille:any[]){
    // console.log({quantiteTaille});

    if(quantiteTaille.length > 0){
      let orders   = quantiteTaille.flatMap((q:any) =>  q?.commandes);
      // console.log({orders});


      let quantite = quantiteTaille.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.quantite, 0);
      let sold = orders.length > 0 ? orders.reduce((accumulator:any, currentValue:any) => accumulator + currentValue?.quantite, 0) : 0;
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


   handleChangeStatus(event:any, id:any){
    let data = {
      display_on_home : event?.target.checked
    }
    event.target.classList.add('pointer-events-none', 'animate-pulse');


    this._ProduitService.toggleDisplayHome(id,data)
    .subscribe((res)=>{
      if(res?.success == true){
        console.log("res:::::",res);

        event.target.classList.remove('pointer-events-none', 'animate-pulse');
      }else{
        console.log('something was worning');

      }
    })

  }

}

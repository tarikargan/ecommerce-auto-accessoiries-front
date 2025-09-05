import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { ProduitService } from 'src/app/core/services/produit/produit.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  productId                 :any;
  product                   :any;
  loading                   :boolean  = false;
  constructor(
    private router                      :Router,
    private route                       :ActivatedRoute,
    private _ProduitService             :ProduitService,
    // private _toastrService               :ToastrService
  ) {
    this.route.queryParams.subscribe( (params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.productId               = this.router.getCurrentNavigation()?.extras.state?.['id'];
        console.log('this.productId ',this.productId);

        if(this.productId !== 0){
          this.getData(this.productId);
        }
      } else this.router.navigate(['/admin/products']);
    // }
    });
  }


  getData(id:any){
    this._ProduitService.get(id)
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data =>{
      // this.loading = false;
      console.log({data});

      this.product = data;

    },
    eroor => {
      // this.loading = false;
    }
    )
  }

}

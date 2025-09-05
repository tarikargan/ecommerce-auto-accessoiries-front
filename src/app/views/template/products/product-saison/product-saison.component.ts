import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { SaisonService } from 'src/app/core/services/production-module/saison/saison.service';
import { ProduitService } from 'src/app/core/services/produit/produit.service';

@Component({
  selector: 'app-product-saison',
  templateUrl: './product-saison.component.html',
  styleUrls: ['./product-saison.component.scss']
})
export class ProductSaisonComponent {
  @Input()    productId           :any;
  @Input()    saison              :any;

  //  output options
  @Output()   updatedSaison       :EventEmitter<any>       = new EventEmitter();
  @Output()   addedSaison         :EventEmitter<any>       = new EventEmitter();
  @Output()   closeForm           :EventEmitter<any>       = new EventEmitter();


  loading                         :boolean                 = false;
  // form options
  productSaisonForm!              :FormGroup;


  saisons                         :any[]  = [];
  eventype                        :any                     = EventTypes.Add;



  constructor(
    private _ProductService         :ProduitService,
    private _SaisonService          :SaisonService,
  ) {
  }

  ngOnInit(): void {
    if(this.saison == null) this.eventype = EventTypes.Add;
    else this.eventype = EventTypes.Edit;

    this.initForm();
    this.getSaisons();
  }

  initForm(): void {
    this.productSaisonForm = new FormGroup({
      productId                : new FormControl(this.productId,                   [Validators.required]),
      saisonId                 : new FormControl(this.saison?.id,      [Validators.required]),

    });
  }

  get form(){
    return this.productSaisonForm;
  }

  getSaisons(){
    this._SaisonService.getAll()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data =>{
      console.log('date:::::', data, this.productId, this.saison);
       this.saisons = data;
    })
  }


  closePopup(){
    this.closeForm.emit();
  }


  update(){
    if(this.productSaisonForm.valid){
      this._ProductService.updateSaison(this.productSaisonForm.value)
        .pipe(take(1), map((res:any) => res?.data))
        .subscribe(data => {
          this.updatedSaison.emit(data);
        })
    }
  }
}

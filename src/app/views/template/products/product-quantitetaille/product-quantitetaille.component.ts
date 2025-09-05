import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { ProduitService } from 'src/app/core/services/produit/produit.service';
import { QuntiteTailleService } from 'src/app/core/services/quantite-taille/quantiteTaille.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-quantitetaille',
  templateUrl: './product-quantitetaille.component.html',
  styleUrls: ['./product-quantitetaille.component.scss']
})
export class ProductQuantitetailleComponent {
   environment                     :any      = environment;
  @Output()   closeForm            :EventEmitter<any>    = new EventEmitter();
  @Input()    productID            :any;

  activeDropDown                   :any;
  eventType                        :any                  = EventTypes.Add;
  quTailles                        :any[]                = [];

  loading                          :boolean              = false;
  activeFormquTaille               :boolean              = false;
  editquTaille_                    :any;
  indexEditItem                    :any;

  size                             :any[]                = [];

  data                             :any;
  constructor(
    private route                  :ActivatedRoute,
    private _ProductService        :ProduitService,
    private _quTailleService       :QuntiteTailleService
  ) {

    this.route.params.subscribe(params => {
      this.productID = params['id'];
      this.getQuTaille();
    });
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.getQuTaille();
  }


  getQuTaille(){
    this._ProductService.get(this.productID)
    .pipe(take(1),map(res => res?.data))
    .subscribe(data => {
      console.log({data});
      this.data = data;
      this.getSize();

      this.quTailles = [...data?.quantite_taille];
    })
  }


  ToogleQuantite(){
    this.eventType           = EventTypes.Add;
    this.activeFormquTaille  = !this.activeFormquTaille;
  }

  closeQuTaille(){
    this.closeForm.emit();
  }

  getSize(){
    console.log('this.data?.quantite_taille:',this.data?.quantite_taille);

    if(this.data?.quantite_taille.length > 0){
      let size =  [...this.data.quantite_taille.map((el:any) => el?.taille?.name)];
      console.log({size});

      const uniqueArr = [...new Set(size)];
      // console.log({uniqueArr});
      this.size = uniqueArr;
    }
  }




  //

  editProduct(item:any,index:any){
    this.eventType           = EventTypes.Edit;
    this.editquTaille_       = item;
    this.indexEditItem       = index;
    this.activeFormquTaille  = true;
  }

  /**
   *
   * @param item
   */
  duplicate(item:any){
    this.eventType           = EventTypes.Duplicate;
    this.editquTaille_       = item;
    this.activeFormquTaille  = true;
  }

  addedquTaille(quTaille:any){

    if(typeof quTaille === 'object' && quTaille !== null){
      this.quTailles             = [quTaille, ...this.quTailles];
      this.data.quantite_taille = [quTaille, ...this.data.quantite_taille];
      this.activeFormquTaille    = false;
      this.getSize();
    }
  }

  async updatedquTaille(variant:any){
    if(typeof variant === 'object' && variant !== null){
      this.quTailles.splice(this.indexEditItem,1,variant);
       this.data = await this.data.quantite_taille.map((el:any) =>{
        if(el.id === variant.id){
         return {
          ...variant
         }
        }else return el;
      });

      this.ToogleQuantite();
      this.getSize();
    }
  }

  deleteProduct(id:any){
    if(confirm('are you sure you want to delete this item ?')){
      this._quTailleService.delete(id)
      .pipe(take(1))
      .subscribe(
        async data => {
          this.quTailles = this.quTailles.filter(el => el?.id !== id);
          this.data = await this.data.quantite_taille.filter((el:any) =>{
            if(el.id == id){
            }else return el;
          });
          this.getSize();
        },
        error => console.error(error)
      )
    }
  }

  toggeDropDown(id:any){
    this.activeDropDown = this.activeDropDown == id ? '': id;
  }



}

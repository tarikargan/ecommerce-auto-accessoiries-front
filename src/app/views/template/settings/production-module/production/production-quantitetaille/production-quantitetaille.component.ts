import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { ProductionService } from 'src/app/core/services/production-module/productions/productions.service';
import { ProduitService } from 'src/app/core/services/produit/produit.service';
import { QuntiteTailleService } from 'src/app/core/services/quantite-taille/quantiteTaille.service';

@Component({
  selector: 'app-production-quantitetaille',
  templateUrl: './production-quantitetaille.component.html',
  styleUrls: ['./production-quantitetaille.component.scss']
})
export class ProductionQuantitetailleComponent {
  @Output()   closeForm            :EventEmitter<any>    = new EventEmitter();
  @Input()    productionID            :any;

  activeDropDown                   :any;
  eventType                        :any                  = EventTypes.Add;
  quTailles                        :any[]                = [];

  loading                          :boolean              = false;
  activeFormquTaille               :boolean              = false;
  editquTaille_                    :any;
  indexEditItem                    :any;
  constructor(
    private route                  :ActivatedRoute,
    private _ProductionService     :ProductionService,
    private _quTailleService       :QuntiteTailleService
  ) {

    this.route.params.subscribe(params => {
      this.productionID = params['id'];
      this.getQuTaille();
    });
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getQuTaille();
  }


  getQuTaille(){
    this._ProductionService.get(this.productionID)
    .pipe(take(1),map(res => res?.data))
    .subscribe(data => {
      console.log({data});

      this.quTailles = data?.quantite_taille;
    })
  }


  ToogleQuantite(){
    this.eventType           = EventTypes.Add;
    this.activeFormquTaille  = !this.activeFormquTaille;
  }

  closeQuTaille(){
    this.closeForm.emit();
  }




  //

  editProduct(item:any,index:any){
    this.eventType           = EventTypes.Edit;
    this.editquTaille_       = item;
    this.indexEditItem       = index;
    this.activeFormquTaille  = true;
  }

  addedquTaille(quTaille:any){

    if(typeof quTaille === 'object' && quTaille !== null){
      this.quTailles             = [quTaille, ...this.quTailles];
      this.activeFormquTaille    = false;
    }
  }

  updatedquTaille(elearning:any){
    if(typeof elearning === 'object' && elearning !== null){
      this.quTailles.splice(this.indexEditItem,1,elearning);
      this.ToogleQuantite();
    }
  }

  deleteProduct(id:any){
    if(confirm('are you sure you want to delete this item ?')){
      this._quTailleService.delete(id)
      .pipe(take(1))
      .subscribe(
        data => {
          this.quTailles = this.quTailles.filter(el => el?.id !== id)
        },
        error => console.error(error)
      )
    }
  }

  toggeDropDown(id:any){
    this.activeDropDown = this.activeDropDown == id ? '': id;
  }



}


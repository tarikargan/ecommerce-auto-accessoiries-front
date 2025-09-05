import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { Observable } from 'rxjs';
import { ProduitService } from 'src/app/core/services/produit/produit.service';
import { QuntiteTailleService } from 'src/app/core/services/quantite-taille/quantiteTaille.service';

@Component({
  selector: 'app-productionqutaille-form',
  templateUrl: './productionqutaille-form.component.html',
  styleUrls: ['./productionqutaille-form.component.scss']
})
export class ProductionqutailleFormComponent {
  @Input()    qutaille           :any;
  @Input()    productionId       :any;
  @Input()    eventype           :any                     = EventTypes.Add;

  @Output()   addedqutaille      :EventEmitter<any>       = new EventEmitter();
  @Output()   closeForm          :EventEmitter<any>       = new EventEmitter();
  @Output()   updatedqutaille    :EventEmitter<any>       = new EventEmitter();


  languages                         :string[]             = [];
  editId                            :any;
  lang                              :any                  = 'fr';
  productionForm!                   :FormGroup;
  messge                            :any;

  tailles                           :any[]                = [];
  stocks                            :any[]                = [];

  qutailles                         :any                  = [];
  productions                       :any                  = [];

  url                               :any;
  file                              :any[]                = [];
  existingFiles                     :any;


  loading                           :boolean   = false;
  enterColor                        :boolean   = false;

  constructor( private _QuntiteTailleService   :QuntiteTailleService ) {}

  ngOnInit(): void {
    this.initForm();
    this.handleEvent();
    this.getData();
  }

  initForm(): void {
    this.productionForm = new FormGroup({
      quantite                : new FormControl('',      [Validators.required]),
      color                   : new FormControl('',      [Validators.required]),
      color_type              : new FormControl('exist', [Validators.required]),
      quantite_livre          : new FormControl('',      [Validators.required]),
      taille_id               : new FormControl('',      [Validators.required]),
      stock_id                : new FormControl('',      [Validators.required]),
      detailsOn               : new FormControl('production'),
      detailsID               : new FormControl(this.productionId),
    });
  }


  getData(){
    this._QuntiteTailleService.create()
    .pipe(take(1))
    .subscribe(data =>{
      this.tailles = data?.tailles;
      this.stocks = data?.stocks;
    })
  }


  handleEvent(){
      if(this.eventype == EventTypes.Edit){
        this.editId    =  this.qutaille?.id;
        this.productionForm?.get('quantite')?.setValue(this.qutaille?.quantite);
        this.productionForm?.get('quantite_livre')?.setValue(this.qutaille?.quantite_livre);
        this.productionForm?.get('color')?.setValue(this.qutaille?.color);
        this.productionForm?.get('color_type')?.setValue(this.qutaille?.color_type);
        this.productionForm?.get('stock_id')?.setValue(this.qutaille?.stock?.id);
        this.productionForm?.get('taille_id')?.setValue(this.qutaille?.taille?.id);
      }
  }

  getEditqutaille(id:any){
  }

  get form(){
    return this.productionForm;
  }

  async save(){
    if(this.productionForm.valid){
      this.loading = true;
      let data     = this.productionForm.value;
      this._QuntiteTailleService.add(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any) => {
        this.loading = false;
        this.addedqutaille.emit(res);
      },
      error => {
        this.loading = false;
      })
    }else{
      this.productionForm.markAllAsTouched();
    }
  }

  async update(){
    if(this.productionForm.valid){
      let data = this.productionForm.value;
      this.loading = true;
      this._QuntiteTailleService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
          this.loading = false;
          this.updatedqutaille.emit(res);
      },
      error =>{
        this.loading = false;
      })
    }
  }



  resetForm(){
    this.productionForm.reset();
  }

  closePopup(){
    this.closeForm.emit();
    this.productionForm.reset();
  }



  handleChangeOther(event:any){
      if(event.target.checked){
        this.enterColor     = true;
        this.productionForm?.get('color_type')?.setValue('other')
      }else{
        this.enterColor     = false;
        this.productionForm?.get('color_type')?.setValue('exist')
      }

  }



}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { Observable } from 'rxjs';
import { ProduitService } from 'src/app/core/services/produit/produit.service';
import { QuntiteTailleService } from 'src/app/core/services/quantite-taille/quantiteTaille.service';
import { PaymentService } from 'src/app/core/services/payement/paiement.service';

@Component({
  selector: 'app-productionpaiement-form',
  templateUrl: './productionpaiement-form.component.html',
  styleUrls: ['./productionpaiement-form.component.scss']
})
export class ProductionpaiementFormComponent {
  @Input()    payment           :any;
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

  constructor(
    private _ProductService         :ProduitService,
    private _QuntiteTailleService   :QuntiteTailleService,
    private _PaymentService         :PaymentService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.handleEvent();
  }

  initForm(): void {
    this.productionForm = new FormGroup({
      montant                    : new FormControl('', [Validators.required]),
      payment_deadline           : new FormControl('', [Validators.required]),
      payment_method             : new FormControl('', [Validators.required]),
      paid                       : new FormControl(false),
      payOn                      : new FormControl('production'),
      payID                      : new FormControl(this.productionId),
    });
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string, lang: string): boolean {
    let fromGroup   = this.productionForm?.get(lang);
    let control = fromGroup?.get(controlName);

    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }




  handleEvent(){


      if(this.eventype == EventTypes.Edit){

        this.editId   = this.payment?.id;
        this.productionForm?.get('montant')?.setValue(this.payment?.montant);
        this.productionForm?.get('payment_deadline')?.setValue(this.payment?.payment_deadline);
        this.productionForm?.get('payment_method')?.setValue(this.payment?.payment_method);
        this.productionForm?.get('payOn')?.setValue(this.payment?.payOn);
        this.productionForm?.get('payID')?.setValue(this.payment?.payID);

      }
  }



  get form(){
    return this.productionForm;
  }

  async save(){

    if(this.productionForm.valid){
      this.loading = true;
      let data = this.productionForm.value;
      this._PaymentService.add(data)
      .pipe(take(1),
      map(res => res?.data)
      )
      .subscribe((data:any)=>{
        this.loading = false;
        console.log('datasss:::::', data);

        this.addedqutaille.emit(data?.payment);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }else{
      this.productionForm.markAllAsTouched();
    }
  }

  async update(){
    console.log('this.productionForm.',this.productionForm.value);

    if(this.productionForm.valid){
      let data = this.productionForm.value;
      this.loading = true;
      this._PaymentService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
          this.loading = false;
          console.log('resres',res);
          this.updatedqutaille.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }
  }



  resetForm(){
    this.productionForm.reset();
  }

  closePopup(){
    // this._popupService.hidePopop();
    this.closeForm.emit();
    this.productionForm.reset();
  }



}

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
  selector: 'app-payment-matiereform',
  templateUrl: './payment-matiereform.component.html',
  styleUrls: ['./payment-matiereform.component.scss']
})
export class PaymentMatiereformComponent {
  @Input()    payment            :any;
  @Input()    matiereId          :any;
  @Input()    eventype           :any                     = EventTypes.Add;

  @Output()   addedqutaille      :EventEmitter<any>       = new EventEmitter();
  @Output()   closeForm          :EventEmitter<any>       = new EventEmitter();
  @Output()   updatedqutaille    :EventEmitter<any>       = new EventEmitter();


  languages                         :string[]             = [];
  editId                            :any;
  lang                              :any                  = 'fr';
  matiereForm!                   :FormGroup;
  messge                            :any;

  tailles                           :any[]                = [];
  stocks                            :any[]                = [];

  qutailles                         :any                  = [];
  matieres                       :any                  = [];

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
    this.matiereForm = new FormGroup({
      montant                    : new FormControl('', [Validators.required]),
      payment_deadline           : new FormControl('', [Validators.required]),
      payment_method             : new FormControl('', [Validators.required]),
      paid                       : new FormControl(false),
      payOn                      : new FormControl('matiere'),
      payID                      : new FormControl(this.matiereId),
    });
  }

  handleEvent(){


      if(this.eventype == EventTypes.Edit){

        this.editId   = this.payment?.id;
        this.matiereForm?.get('montant')?.setValue(this.payment?.montant);
        this.matiereForm?.get('payment_deadline')?.setValue(this.payment?.payment_deadline);
        this.matiereForm?.get('payment_method')?.setValue(this.payment?.payment_method);
        this.matiereForm?.get('payOn')?.setValue(this.payment?.payOn);
        this.matiereForm?.get('payID')?.setValue(this.payment?.payID);
      }
  }

  getEditqutaille(id:any){
  }

  get form(){
    return this.matiereForm;
  }

  async save(){

    console.log('this.matiereForm.value', this.matiereForm.value);
    if(this.matiereForm.valid){
      this.loading = true;
      let data = this.matiereForm.value;


      this._PaymentService.add(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading = false;
        this.addedqutaille.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }else{
      this.matiereForm.markAllAsTouched();
    }
  }

  async update(){

    if(this.matiereForm.valid){
      let data = this.matiereForm.value;
      this.loading = true;
      this._PaymentService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
          this.loading = false;
          this.updatedqutaille.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }
  }



  resetForm(){
    this.matiereForm.reset();
  }

  closePopup(){
    this.closeForm.emit();
    this.matiereForm.reset();
  }



}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { ProduitService } from 'src/app/core/services/produit/produit.service';
import { QuntiteTailleService } from 'src/app/core/services/quantite-taille/quantiteTaille.service';
import { PaymentService } from 'src/app/core/services/payement/paiement.service';
import { PaymentAdvancedService } from 'src/app/core/services/payement/paiementAdvanced.service';

@Component({
  selector: 'app-paymentadvanced-matiereform',
  templateUrl: './paymentadvanced-matiereform.component.html',
  styleUrls: ['./paymentadvanced-matiereform.component.scss']
})
export class PaymentadvancedMatiereformComponent {
  @Input()    paymentAdvance           :any;
  @Input()    matiereId          :any;
  @Input()    paymentId          :any;
  @Input()    eventype           :any                     = EventTypes.Add;

  @Output()   addedpayAdvanced   :EventEmitter<any>       = new EventEmitter();
  @Output()   closeForm          :EventEmitter<any>       = new EventEmitter();
  @Output()   updatedpayAdvanced    :EventEmitter<any>       = new EventEmitter();


  languages                         :string[]             = [];
  editId                            :any;
  lang                              :any                  = 'fr';
  paymentAdvancedForm!                   :FormGroup;
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
    private _PaymentService         :PaymentService,
    private _PaymentAdvancedService :PaymentAdvancedService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.handleEvent();
  }

  initForm(): void {
    this.paymentAdvancedForm = new FormGroup({
      montant                 :new FormControl('', [Validators.required]),
      date                    :new FormControl('', [Validators.required]),
      description             :new FormControl('', [Validators.required]),
      payment_id              :new FormControl(this.paymentId),
    });
  }






  handleEvent(){
    console.log('this.paymentAdvance', this.paymentAdvance);
      if(this.eventype == EventTypes.Edit){

        this.editId   = this.paymentAdvance?.id;
        // this.existingFiles = this.elearning?.thumbnail;
        this.paymentAdvancedForm?.get('montant')?.setValue(this.paymentAdvance?.montant);
        this.paymentAdvancedForm?.get('date')?.setValue(this.paymentAdvance?.date);
        this.paymentAdvancedForm?.get('description')?.setValue(this.paymentAdvance?.description);

      }
  }

  getEditqutaille(id:any){
    //  this._ElearningService.get(id)
    //  .pipe(take(1),map(res => res?.data))
    // .subscribe((tem:any)=>{
    //     this.existingFiles = tem?.file;
    //     this.paymentAdvancedForm?.get('publish')?.setValue(tem?.publish);
    //     this.paymentAdvancedForm?.get('thumbnail')?.setValue(tem?.thumbnail);
    //     this.paymentAdvancedForm?.get('videoUrl')?.setValue(tem?.videoUrl);
    //     this.languages.forEach(lang =>{
    //       this.paymentAdvancedForm?.get(lang)?.patchValue({
    //         module      : tem[lang].module,
    //         title       : tem[lang].title
    //       })
    //     })
    // })
  }

  get form(){
    return this.paymentAdvancedForm;
  }

  async save(){
    console.log('this.paymentAdvancedForm',this.paymentAdvancedForm.value);

    if(this.paymentAdvancedForm.valid){

      this.loading = true;
      let data = this.paymentAdvancedForm.value;

      this._PaymentAdvancedService.add(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading = false;
        this.addedpayAdvanced.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }else{
      this.paymentAdvancedForm.markAllAsTouched();
    }
  }

  async update(){

    if(this.paymentAdvancedForm.valid){
      let data = this.paymentAdvancedForm.value;
      this.loading = true;
      this._PaymentAdvancedService.update(this.editId, data)
      .pipe(
        take(1),map(res => res?.data))
      .subscribe((res:any)=>{
          this.loading = false;
          console.log('resres',res);
          this.updatedpayAdvanced.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }
  }



  resetForm(){
    this.paymentAdvancedForm.reset();
  }

  closePopup(){
    // this._popupService.hidePopop();
    this.closeForm.emit();
    this.paymentAdvancedForm.reset();
  }



}

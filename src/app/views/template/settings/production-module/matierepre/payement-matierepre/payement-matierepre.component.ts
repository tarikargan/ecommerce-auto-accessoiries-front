import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { PaymentService } from 'src/app/core/services/payement/paiement.service';
import { PaymentAdvancedService } from 'src/app/core/services/payement/paiementAdvanced.service';
import { MatierePremiereService } from 'src/app/core/services/production-module/matiere-premiere/matierePremiere.service';
import { ProduitService } from 'src/app/core/services/produit/produit.service';
import { QuntiteTailleService } from 'src/app/core/services/quantite-taille/quantiteTaille.service';

@Component({
  selector: 'app-payement-matierepre',
  templateUrl: './payement-matierepre.component.html',
  styleUrls: ['./payement-matierepre.component.scss']
})
export class PayementMatierepreComponent {
  @Output()   closeForm              :EventEmitter<any>    = new EventEmitter();
  @Input()    matiereID              :any;
  paymentID                          :any;

  activeDropDown                     :any;
  eventType                          :any                  = EventTypes.Add;
  payment                            :any;

  loading                            :boolean              = true;
  activeFormpayment                  :boolean              = false;
  activeFormpaymentAdvanced          :boolean              = false;
  payment_                           :any;
  paymentAdvance_                    :any;
  indexAdvancePayItem                :any;
  constructor(
    private route                    :ActivatedRoute,
    private _MatierePremiereService  :MatierePremiereService,
    private _quTailleService         :QuntiteTailleService,
    private _PaymentAdvancedService  :PaymentAdvancedService,
    private __PaymentService         :PaymentService
  ) {

    this.route.params.subscribe(params => {
      this.matiereID = params['id'];
      this.getPayment();
    });
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.getPayment();
  }


  getPayment(){
    this._MatierePremiereService.get(this.matiereID)
    .pipe(take(1),map(res => res?.data))
    .subscribe(data => {
      this.payment   = data?.payment;
      this.paymentID = this.payment?.id;
      this.loading   = false;
      console.log('this.payment',this.payment);

    })
  }


  ToogleQuantite(){
    this.eventType           = EventTypes.Add;
    this.activeFormpayment   = !this.activeFormpayment;
  }

  // close taille
  TooglepayAdvanced(){
    this.eventType                  = EventTypes.Add;
    this.activeFormpaymentAdvanced  = !this.activeFormpaymentAdvanced;
  }

  closeQuTaille(){
    this.closeForm.emit();
  }



  addedpayment(payment:any){
    if(typeof payment === 'object' && payment !== null){
      this.activeFormpayment    = false;
      this.payment = payment?.payment
    }
  }

  editPayment(pay:any){
    this.eventType          = EventTypes.Edit;
    this.payment_           = pay;
    this.activeFormpayment  = true;
  }

  deletePayment(id:any){
     this.__PaymentService.delete(id)
     .pipe(take(1)).subscribe((data:any)=>{
      this.payment = null;
     })
  }

  updatedpayment(pay:any){
    if(typeof pay === 'object' && pay !== null){
      this.payment = pay;
      this.ToogleQuantite();
    }
  }


  // advanced payment
  // adeded
  addedpayAdvanced(pay:any){

    if(typeof pay === 'object' && pay !== null){
      this.activeFormpaymentAdvanced    = false;

      this.payment.payment_advanced   = [ ...pay?.payment_advanced];
      console.log('pay::',pay,this.payment.payment_advanced);
    }
  }
  //edit
  editadvancedPayment(item:any,index:any){
    this.eventType                  = EventTypes.Edit;
    this.paymentAdvance_            = item;
    this.indexAdvancePayItem        = index;
    this.activeFormpaymentAdvanced  = true;
  }
  // update
  updatedpayAdvanced(pay:any){
    if(typeof pay === 'object' && pay !== null){
      this.activeFormpaymentAdvanced    = false;

      this.payment.payment_advanced.splice( this.indexAdvancePayItem,1,pay);
      console.log('this.payment.payment_advanced',this.payment.payment_advanced, pay);

    }
  }

  // delete
  deleteAdvancedPayment(id:any){
    if(confirm('are you sure you want to delete this item ?')){
      this._PaymentAdvancedService.delete(id)
      .pipe(take(1))
      .subscribe(
        data => {
          this.payment.payment_advanced = this.payment?.payment_advanced.filter((el:any) => el?.id !== id)
        },
        error => console.error(error)
      )
    }
  }

  toggeDropDown(id:any){
    this.activeDropDown = this.activeDropDown == id ? '': id;
  }




  // get payments total
  getPaymentTotal(paymentsAdvanced:any[]){
    let total = paymentsAdvanced.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.montant, 0);

    return total;
  }
  // calc rest
  getReste(paymentsAdvanced:any[], montant:number){
    let total = paymentsAdvanced.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.montant, 0);

    return montant - total;
  }


}


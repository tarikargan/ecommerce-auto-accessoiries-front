import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs';
import { Product } from 'src/app/core/classes/product';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { CommandesService } from 'src/app/core/services/sales-module/commandes/commande.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss']
})
export class OrdersFormComponent {
  environment                      :       any                                = environment

  @Input()    order                :any;
  @Input()    commande             :any;
  @Input()    eventype             :any                  = EventTypes.Add;

  @Output()   addedOrder           :EventEmitter<any>    = new EventEmitter();
  @Output()   closeForm            :EventEmitter<any>    = new EventEmitter();
  @Output()   updatedOrder         :EventEmitter<any>    = new EventEmitter();

  // loading:boolean = true;


  changeSelectedProduct            :boolean = false;
  quantityMax                      :number  = 1;


  selectedProduct                  :any;
  selectedTaille                   :any;
  selectedColor                    :any;

  groupedTaille                    :any    = {};
  tailles                          :any[]  = [];
  defaultQuantity                  :number = 0;
  restQuantity                     :number = 0;
  restQuantityDefault              :number = 0;



  products                         :any = [];
  etapes                           :any = [];
  etapesClone                      :any = [];
  sources                          :any = [];
  clients                          :any = [];
  modeLivraisons                   :any = [];
  offres                           :any = [];

  editId                           :any;
  myToolbar                        :any;

  orderForm!                       :FormGroup;


  loading                          :boolean              = false;

  selectedProducts :any = {

  }
  groupedTailles :any = {

  }
  selectedTailles :any = {

  }
  productsTailles :any = {

  }
  selectedColors :any = {

  }
  restQuantities :any = {

  }

  constructor(
    private  _CommandeService      :CommandesService,
    private fb                            : FormBuilder
  ) {
    this.myToolbar = [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', { direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote'],
      ['link'],
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this.handleEvent();
    this.getData();
  }


  getselectProduct(index: number){
      let products = this.FormArr as FormArray;
      let selectProductId = products.at(index).get('product_id')?.value;
      return this.products.find((el:any) => el.id == selectProductId);
  }


  getData(){
    this._CommandeService.create()
    .pipe(take(1))
    .subscribe(async data =>{
      console.log({data});

      this.products       = data?.products;
      this.sources        = data?.sources;
      this.modeLivraisons = data?.modeLivraisons;
      // this.offres         = data?.offres;
      this.clients        = data?.clients;

       let etapes = await  data?.etapes.map((e:any)=>({
          id        : e?.id,
          title     : e?.title,
          color     : e?.color,
          EtapeDate : null
       }));

      if(this.eventype == EventTypes.Add){
        this.etapes      = etapes;
        this.etapesClone = etapes;
      }else{
        this.etapesClone = etapes;
      }
      console.log('etape',this.etapes);

    })
  }

  // initForm(): void {

  //   this.orderForm = new FormGroup({
  //     commentaire                  : new FormControl('',    []),
  //     date_reception               : new FormControl(new Date(),    []),
  //     // product_id                   : new FormControl('',    []),
  //     // quantite                     : new FormControl(1,     [Validators.required]),
  //     // montant                      : new FormControl('',    []),
  //     // tracking_number              : new FormControl(2,     [Validators.required]),
  //     etape_id                     : new FormControl('',    [Validators.required]),
  //     client_id                    : new FormControl('',    [Validators.required]),
  //     // source_id                    : new FormControl('',    [Validators.required]),
  //     mode_livraison_id            : new FormControl('',    [Validators.required]),
  //     matiere_premieres            : this.fb.array([this.matierepre()])
  //     // offre_id                     : new FormControl('',    [Validators.required]),
  //     // quantite_taille_id           : new FormControl('',    [Validators.required]),

  //   });

  // }

  initForm(): void {
    this.orderForm = this.fb.group({
      commentaire                :['',      [Validators.required]],
      date_reception             :[new Date()],
      etape_id                   :['',      [Validators.required]],
      client_id                  :['',      [Validators.required]],
      mode_livraison_id          :['',      [Validators.required]],
      quantite                   :[1,       [Validators.required]],
      montant                    :[120,      [Validators.required]],
      // fournisseur_id             :['',      [Validators.required]],
      products                   :this.fb.array([this.product()]),
    });
  }

  product(){
    return this.fb.group({
         product_id             : ["",      [Validators.required]],
         quantite               : ["",      [Validators.required]],
         montant                : ["",      [Validators.required]],
         quantite_taille_id     : ["",      [Validators.required]],
    })
  }

  get FormArr(){
    return this.orderForm.get('products') as FormArray;
  }

  addNewRow(){
    let product = this.orderForm.get('products') as FormArray;
    product.push(this.product());
  }

  removeRow(index:any){
    let product = this.orderForm.get('products') as FormArray;
    product.removeAt(index);
  }

  handleEvent(){
      if(this.eventype == EventTypes.Edit || this.eventype == EventTypes.Duplicate){

          var command = this.commande;
          // console.log({command});
          this.order     = command;
          this.editId    = command?.id;
          // this.orderForm?.get('ref')?.setValue(command?.ref);
          this.orderForm?.get('commentaire')?.setValue(command?.commentaire);
          this.orderForm?.get('date_reception')?.setValue(command?.date_reception);
          // this.orderForm?.get('product_id')?.setValue(command?.product_id);
          this.orderForm?.get('quantite')?.setValue(command?.quantite);
          this.orderForm?.get('montant')?.setValue(command?.montant);
          // this.orderForm?.get('tranking_number')?.setValue(command?.tranking_number);
          // this.orderForm?.get('product_id')?.setValue(command?.product?.id);

          this.orderForm?.get('client_id')?.setValue(command?.client?.id);
          this.orderForm?.get('etape_id')?.setValue(command?.etape_id);
          // this.orderForm?.get('source_id')?.setValue(command?.source?.id);
          this.orderForm?.get('mode_livraison_id')?.setValue(command?.modeLivraison?.id);
          // this.orderForm?.get('offre_id')?.setValue(command?.offre?.id);
          // this.orderForm?.get('quantite_taille_id')?.setValue(command?.quantite_taille?.id);
          this.etapes = command?.etapes;
          // this.getActiveEtape();
          // this.orderForm?.get('etapes')?.setValue(this.etapes);

          // this.selectedProduct = command?.product;

          var products :any  = [];
          command?.products.forEach((pr:any, i:any, array:any) => {
            products.push(this.fb.group({
              id                    : pr?.order_details?.id,
              product_id            : pr?.id,
              quantite              : pr?.order_details?.quantite,
              montant               : pr?.order_details?.montant,
              quantite_taille_id    : pr?.order_details?.quantite_taille?.id,
            }));
            this.selectedProducts[i] =  pr;
            this.groupedProductByTaille(i);

            if(i == (array.length - 1)){
              // this.groupedProductByTaille(i);
              this.loading = false;
            }
          });

          this.orderForm.setControl('products',this.fb.array(products || []));
      }
  }

  get form(){
    return this.orderForm;
  }

  /**
   * save order
   */
  async save(){
    if(this.orderForm.valid){
      this.loading = true;


      let data = this.orderForm.value;
      data = {...data, etapes: this.etapes};

      console.log({data});

      this._CommandeService.add(data)
      .pipe(take(1),map(el => el?.data))
      .subscribe((res:any)=>{
        this.loading = false;
        console.log(res);
          this.addedOrder.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }else{
      this.orderForm.markAllAsTouched();
    }
  }

  /**
   * update order
   */
  async update(){
    if(this.orderForm.valid){
      this.loading = true;
      let data = this.orderForm.value;
      data = {...data, etapes: this.etapes};
      console.log({data});
      // return;


      // return ;
      this._CommandeService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
        console.log({res});

          // this.loading = false;
          // this.updatedOrder.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }
  }



  resetForm(){
    this.orderForm.reset();
  }

  closePopup(){
    this.closeForm.emit();
    this.orderForm.reset();
    this.orderForm.reset();
    this.eventype = EventTypes.Add;
  }



  /**
   * select product
   * @param product
   */
  selectProduct(product:any){

    this.selectedProduct       = product;
    this.changeSelectedProduct = true;

    this.etapes = this.etapesClone;
    this.orderForm.get('quantite')?.setValue(1);
    this.orderForm.get('montant')?.setValue(product?.price);
    this.orderForm.get('etape_id')?.setValue(null);


  }

  handleSelectedProduct(ev:any, index:any){
     this.orderForm.get('quantite')?.setValue(1);
     this.selectedProducts[index] = ev;

     let products = this.FormArr as FormArray;

     products.at(index).get('quantite')?.setValue(1);
     products.at(index).get('montant')?.setValue(ev.price);
     this.groupedProductByTaille(index);

  }


  /**
   * grouped product colors by taille
   */


  async groupedProductByTaille(index:any){
         console.log('this.selectedProducts:::>',this.selectedProducts);

         let product       = await this.selectedProducts[index];
        if(product?.quantite_taille.length > 0){

          const groupedData = await product?.quantite_taille?.reduce((acc:any, obj:any) => {
           const key = obj.taille?.name;

           if (!acc[key]) {
             acc[key] = [];
           }

           acc[key].push(obj);

           return acc;
         }, {});


         let taille = ['xs', 's', 'm', 'l','xl', 'xxl', 'xxxl','Standard'];

         let orderTaille :any = {};

         taille.forEach((el, i, array) =>{
           if(groupedData.hasOwnProperty(el) == true){
             orderTaille[el] = groupedData[el];
           }

           if((array.length - 1) == i){

             // this.groupedTaille = orderTaille;
             this.groupedTailles[index] = orderTaille;

             console.log('this.groupedTailles', this.groupedTailles);


             const keys =  Object.keys(this.groupedTailles[index]);

             this.productsTailles[index] = keys;

            //  console.log('this.productsTailles', this.productsTailles);
             // this.tailles  = keys;
             if(this.eventype == EventTypes.Edit){
              console.log('this.selected>>>>>',this.selectedProducts[index]);

              // this.selectedTailles[index] = this.productsTailles[index][0];
              this.selectedTailles[index] = this.selectedProducts[index]?.order_details?.quantite_taille?.taille?.name
              // this.selectedTailles[index] = this.selectedProducts[index]?.order_details?.quantite_taille?.color_name


              //  console.log('this.selectedTailles::::>', this.selectedTailles);
              //  this.selectedColors[i]      = item?.color_name;
               this.selectedColors[index]  = this.selectedProducts[index]?.order_details?.quantite_taille?.color_name;
               this.restQuantities[index]  = this.selectedProducts[index]?.order_details?.quantite_taille?.quantite;

               // this.selectedTaille = this.order?.quantite_taille?.taille?.name;

               // this.selectedColor = this.order?.quantite_taille?.color;
             }else{
              //  this.selectedTaille = this.tailles[0];
              //  this.
               this.selectedTailles[index] = this.productsTailles[index][0];
               console.log('this.selectedTailles::::>', this.selectedTailles);

               this.selectedColors[index]  = this.groupedTailles[index][this.selectedTailles[index]][0].color_name;
               this.restQuantities[index]  = this.groupedTailles[index][this.selectedTailles[index]][0].quantite;
             }

             // console.log('this.selectedTaille',this.selectedTaille);
             // console.log('this.groupedTaille',this.groupedTaille);

             this.orderForm.get('quantite_taille_id')?.setValue(this.groupedTailles[index][this.selectedTailles[index]][0]?.id);
             // console.log(this.groupedTaille, this.tailles);
           }
         })
        }else{
          this.groupedTailles[index] = [];
          this.productsTailles[index] = [];
        }
  }
  /**
   * qualculate rest quantity
   */
  async calcRestQuantity(){
    let tailles          = this.selectedProduct.quantite_taille;
    let selectedTailleId = this.orderForm.get('quantite_taille_id')?.value;

    let SelectedTaille    = tailles.find((el:any) => el?.id == selectedTailleId);
    console.log({SelectedTaille});


    let defaultQuantity  = SelectedTaille?.quantite;
    this.defaultQuantity = await defaultQuantity;

    const totalOrderAmount =  SelectedTaille?.commandes.length > 0
    ? SelectedTaille?.commandes.reduce((orderAcc:any, order:any) => {
          return orderAcc + order.quantite;
      }, 0)
    : 0;

   let restQuantite = (this.defaultQuantity - totalOrderAmount);
   this.restQuantityDefault   = restQuantite;
   this.quantityMax = restQuantite;
   if((restQuantite - 1) > 0){
     this.orderForm.get('quantite')?.setValue(1);
     this.restQuantity          = restQuantite - 1;
    }else{
      this.orderForm.get('quantite')?.setValue(0);
      this.restQuantity         = restQuantite;

   }
  }


  handleChangeTaille(taille:string, i :any){
    // console.log({taille}, i);

    let selectedTaille = this.groupedTailles[i][taille];
    this.selectedTailles[i] = taille;

    this.selectedColors[i] = selectedTaille[0].color_name;

    let products = this.FormArr as FormArray;
    products.at(i).get('quantite_taille_id')?.setValue(selectedTaille[0]?.id);
    products.at(i).get('quantite')?.setValue(1);

    this.restQuantities[i] = selectedTaille[0].quantite;

    // this.calcRestQuantity();
  }


  /**
   * color item
   * @param item
   */
  handleChangeColor(item:any, i :any){
    let price    = this.selectedProducts[i]?.price;

    this.FormArr?.at(i)?.get('quantite_taille_id')?.setValue(item?.id);

    // this.orderForm.get('quantite_taille_id')?.setValue(item?.id);
    this.FormArr?.at(i)?.get('quantite')?.setValue(1);
    this.FormArr?.at(i)?.get('montant')?.setValue(price);

    this.selectedColors[i] = item?.color_name;
    this.restQuantities[i] = item?.quantite;
    // this.calcRestQuantity();
    console.log({item}, i, this.orderForm.value, item);
  }


  /**
   * increment - decrement quantity && calculate total montant
   * @param operation
   */
  rangePrice(operation:any, i:any){

    let price    = this.selectedProducts[i]?.price;

    let quantite = this.FormArr?.at(i)?.get('quantite')?.value;


    // console.log(operation,i, quantite, this.restQuantity, this.selectedProducts, this.productsTailles, this.restQuantities[i]);
    console.log(this.restQuantities);


    if(operation == 'increment'){
      if(this.restQuantities[i] > 0){
        this.FormArr?.at(i)?.get('quantite')?.setValue(quantite + 1);
        this.FormArr?.at(i)?.get('montant')?.setValue(price * (quantite+1));
        this.restQuantity = this.restQuantity - 1;
      }
    }else{
      if(quantite > 1 ) {
        this.FormArr?.at(i)?.get('quantite')?.setValue(quantite - 1);
        this.FormArr?.at(i)?.get('montant')?.setValue(price * (quantite - 1));
        this.restQuantity = this.restQuantity + 1;
      }
    }
  }


  /**
   * calculate total montant
   * @param e
   */
  handleChangeQuantity(e:any, i:any){
    let price    = this.selectedProducts[i]?.price;
    if(e.target.value == ''){
      this.orderForm.get('quantite')?.setValue(1);
      this.orderForm.get('montant')?.setValue(price);

    }else{
      if(e.target.value > this.quantityMax){
        this.restQuantity = 0;
        this.orderForm.get('quantite')?.setValue(this.quantityMax);
      }
      this.orderForm.get('montant')?.setValue(price * e.target.value);
      this.restQuantity = this.restQuantityDefault - e.target.value;
    }
  }


  handleChangeEtape(etap:any){
    console.log('check etapes',this.etapes);

    this.etapes = this.etapes.map((e:any) =>{
      if(e.id == etap?.id || e?.id < etap?.id && e?.EtapeDate == null) {
        console.log(e);

        return {
          id: e?.id,
          title: e?.title,
          color: e?.color,
          EtapeDate: new Date(),
        }
      }else{
        return e;
      }
    });
  }


  // getActiveEtape(){
  //   const activeEtape = this.etapes.reverse().find((etap:any) => etap.EtapeDate !== null);

  //   if(activeEtape !== undefined && activeEtape !== null){
  //     this.orderForm.get('etape_id')?.setValue(activeEtape?.id);
  //     console.log({activeEtape});
  //   }

  // }


  getColor(color:any){
    switch(color){
      case 'white':
        return 'bg-white';
        break;
      case 'red':
        return 'bg-red-500';
        break;
      case 'orange':
        return 'bg-orange-500';
        break;
      case 'yellow':
        return 'bg-yellow-500';
        break;
      case 'green':
        return 'bg-green-500';
        break;
      case 'blue':
        return 'bg-blue-500';
        break;
      case 'black':
        return 'bg-black';
        break;
      default:
        return '';
    }

  }


  capitalizeFirstLetter(text:any) {

    return text != null ? text?.charAt(0)?.toUpperCase() + text?.slice(1) : '';
  }




}

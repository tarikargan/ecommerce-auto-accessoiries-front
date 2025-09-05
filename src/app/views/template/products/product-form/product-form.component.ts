import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { Observable } from 'rxjs';
import { ProduitService } from 'src/app/core/services/produit/produit.service';
import { CategoriesService } from 'src/app/core/services/production-module/categories/categories.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  @Input()    product           :any;
  @Input()    eventype          :any                  = EventTypes.Add;

  @Output()   addedproduct      :EventEmitter<any>    = new EventEmitter();
  @Output()   closeForm         :EventEmitter<any>    = new EventEmitter();
  @Output()   updatedproduct    :EventEmitter<any>    = new EventEmitter();


  languages                         : string[]             = [];
  editId                            : any;
  lang                              : any                  = 'fr';
  productForm!                      : FormGroup;
  messge                            : any;

  fournisseurs                      : any = [];
  productions                       : any = [];
  categories                        : any = [];
  subCategories                     : any = [];

  // url                               :any;
  // file                              :any[]                = [];
  // existingFiles                     :any;


  loudingButton                     : boolean   = false;
  loading                           : boolean   = false;
  myToolbar                         : any;


    // files
  files                             : File[]  = [];
  existingFiles                     : any;
  url                               : any;

  constructor(
    private _ProductService         : ProduitService,
    private _CategoriesService      : CategoriesService,
    private uploadService           : FileUploadService,
    private _toastService           : ToastrService
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

  initForm(): void {
    this.productForm      = new FormGroup({
      title               : new FormControl('',      [Validators.required]),
      price               : new FormControl('',      [Validators.required]),
      sale_price          : new FormControl('',      []),
      category_id         : new FormControl('',      [Validators.required]),
      sub_category_id     : new FormControl('',      []),
      ref                 : new FormControl('',      []),
      fournisseur_id      : new FormControl('',      []),
      production_id       : new FormControl('',      []),
      saison_id           : new FormControl('',      []),
      status              : new FormControl('',      []),
      photos              : new FormControl('',      []),
      description         : new FormControl('',      []),
    });
  }



  getData(){
        this._ProductService.create()
        .pipe(take(1))
        .subscribe(data =>{
          console.log('data',data);

          this.fournisseurs = data?.fournisseurs;
          this.productions  = data?.productions;
          this.categories   = data?.categories;
        })
  }


  handleEvent(){
      if(this.eventype == EventTypes.Edit || this.eventype == EventTypes.Duplicate){
        this.editId   = this.product?.id;
        this.productForm?.get('title')?.setValue(this.product?.title);
        this.productForm?.get('description')?.setValue(this.product?.description);
        this.productForm?.get('category_id')?.setValue(this.product?.category?.id);
        this.productForm?.get('sub_category_id')?.setValue(this.product?.subCategory?.id);
        this.productForm?.get('ref')?.setValue(this.product?.ref);
        this.productForm?.get('fournisseur_id')?.setValue(this.product?.fournisseur?.id);
        this.productForm?.get('production_id')?.setValue(this.product?.production?.id);
        this.productForm?.get('saison_id')?.setValue(this.product?.saison?.id);
        this.productForm?.get('status')?.setValue(this.product?.status);
        // this.productForm?.get('photos')?.setValue(this.product?.photos?.src);
        this.productForm?.get('price')?.setValue(this.product?.price);
        this.productForm?.get('sale_price')?.setValue(this.product?.sale_price);
        this.existingFiles      = this.product['photos'];

      this.existingFiles      = this.product['photos'].length > 0 ? this.product['photos'].map((el:any) => {
        return {
             ...el?.file
        }
      }) : [];


      // console.log('this.existingFiles>>>>>>', this.existingFiles);





        this.getSubCategories(this.product?.category?.id);
      }
  }



  generateProductRef(): string {
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, ''); // e.g. 20250801
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g. A1F4
    return `PROD-${datePart}-${randomPart}`;
  }



  get form(){
    return this.productForm;
  }

  async save(){

    if(this.productForm.valid){
      var files = this.existingFiles ? [...this.existingFiles] : [];
      var entreprise:any =  localStorage.getItem('ent_User') != null ? localStorage.getItem('ent_User') : 'global' ;
      if(this.files.length > 0){
        for (let file of this.files) {
          const response = await this.uploadService.uploadFile(file, entreprise).toPromise();
          console.log({response});

          if (response.body.status === true) {
            const fileName = response.body.generatedName;
            files.push({
              name: fileName,
              url: this.uploadService.getFileUrl(fileName, entreprise),
              originName: file.name,
              type: file.type,
            });
          } else {
            this.loudingButton = true;
            // this._toastService.toastrError(response.body.msg);
            return;
          }
        }
      }


      this.loading = true;
      let data = this.productForm.value;

      data.ref        = await this.generateProductRef();
      data.sale_price = data.sale_price ? data.sale_price : data.price;
      data.photos     = files;
    //  console.log({data});

      this._ProductService.add(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading = false;
          this.addedproduct.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }else{
      this.productForm.markAllAsTouched();
    }
  }

  async update(){
    if(this.productForm.valid){
      var files = [...this.existingFiles];
      var entreprise:any =  localStorage.getItem('ent_User') != '' ? localStorage.getItem('ent_User') : 'global' ;
        for (let file of this.files) {
          console.log({entreprise});

          const response = await this.uploadService.uploadFile(file, entreprise).toPromise();
          console.log({response});
          // return;

          if (response.body.status === true) {
            const fileName = response.body.generatedName;
            files.push({
              name: fileName,
              url: this.uploadService.getFileUrl(fileName, entreprise),
              originName: file.name,
              type: file.type,
            });
          } else {
            this.loudingButton = true;
            // this._toastService.toastrError(response.body.msg);
            return;
          }
        }
      this.loading    = true;
      let data        = this.productForm.value;
      data.ref        = await this.generateProductRef();
      data.sale_price = data.sale_price ? data.sale_price : data.price;
      data.photos     = files;
      // console.log({data});

      // return;

      this._ProductService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
        console.log({res},this.productForm.value);

          this.loading = false;
          this.updatedproduct.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }
  }



  resetForm(){
    this.productForm.reset();
  }

  closePopup(){
    // this._popupService.hidePopop();
    this.closeForm.emit();
    this.productForm.reset();
  }

  switchLang(lang:any){
    this.lang = lang;
  }


  handleChangeCategory(event:any){
    console.log('event', event);
    this.getSubCategories(event?.id);
    this.productForm.get('sub_category_id')?.setValue('');

  }


  getSubCategories(catId:any){
    this._CategoriesService.get(catId)
    .pipe(take(1), map(res => res?.data))
    .subscribe(data => {
      console.log("subcategories", data );
      this.subCategories = [ ...data?.subCategories ];

    })
  }



  // files
  async readFileCover(evt: any) {
    if (evt.length != 0) {
      await this.readFile(evt[0]).toPromise();
    } else {
      this.url = '';
    }
  }


  private readFile(file: File): Observable<void> {
    return new Observable((obs) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.url = event.target!.result!.toString();

        obs.next();
        obs.complete();
      };
      reader.readAsDataURL(file);
    });
  }

}

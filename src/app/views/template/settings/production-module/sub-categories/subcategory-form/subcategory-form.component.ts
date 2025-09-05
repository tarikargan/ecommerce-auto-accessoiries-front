import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { CategoriesService } from 'src/app/core/services/production-module/categories/categories.service';
import { SubCategoriesService } from 'src/app/core/services/production-module/subCategory/subCategory.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-subcategory-form',
  templateUrl: './subcategory-form.component.html',
  styleUrls: ['./subcategory-form.component.scss']
})
export class SubcategoryFormComponent {
  environment                       : any                 = environment
  Categories                        : any                 = [];
  @Input() subCategory              : any;
  @Input() eventype                 : any                 = EventTypes.Add;

  @Output() hideForm                : EventEmitter<any>   = new EventEmitter();
  @Output() addedCat                : EventEmitter<any>   = new EventEmitter();
  @Output() updatedCat              : EventEmitter<any>   = new EventEmitter();


  myForm!: FormGroup;
  loading                           : boolean             = false;

  selectedCat                       : any;

  constructor(
    private _SubCategoriesService   :SubCategoriesService,
    private _CategoriesService      :CategoriesService
  ){}

  ngOnInit(): void {

    this.initForm();

    this.getData();
    this.handleEvent();

  }

  initForm(): void {
    this.myForm = new FormGroup({
      name         : new FormControl('',      [Validators.required]),
      category_id  : new FormControl('',      [Validators.required]),
    });
  }


  handleEvent(){
    if(this.eventype == EventTypes.Edit || this.eventype == EventTypes.Duplicate)
    {
      this.myForm.get('name')?.setValue(this.subCategory?.name);
      this.myForm.get('category_id')?.setValue(this.subCategory?.category?.id);
      this.selectedCat = this.subCategory?.category
    }
  }


  get form(){
    return this.myForm;
  }

  async save(){

    if(this.myForm.valid){
      this.loading = true;
      let data     = this.myForm.value;
      this._SubCategoriesService.add(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading = false;
        this.addedCat.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }else{
      this.myForm.markAllAsTouched();
    }
  }

  async update(){
    if(this.myForm.valid){
      this.loading = true;
      let data     = this.myForm.value;
      this._SubCategoriesService.update(this.subCategory?.id, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
        console.log('res', res);

          this.loading    =  false;
          this.updatedCat.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }
  }


  hideForm_(){
    this.hideForm.emit();
  }


  getData(){
    // get categories
    this._CategoriesService.getAll()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data =>{
      this.Categories = data;
      console.log('data cat',data);
    })
  }

  handleChange(ev:any){
    // console.log({ev});
    this.selectedCat = ev;

  }

}

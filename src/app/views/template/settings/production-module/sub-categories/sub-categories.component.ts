import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { CategoriesService } from 'src/app/core/services/production-module/categories/categories.service';
import { SubCategoriesService } from 'src/app/core/services/production-module/subCategory/subCategory.service';


@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent {
  eventype                          :any                 = EventTypes.Add;

  SubCategories                     :any                 = [];
  subCategory                       :any;
  editId                            :any;
  editIndex                         :any;
  myForm!                           :FormGroup;

  loading                           :boolean             = false;
  displayForm                       :boolean             = false;

  constructor(
    private _SubCategoriesService   :SubCategoriesService,
    private _CategoriesService      :CategoriesService
  ){}

  ngOnInit(): void {

    this.initForm();

    this.getData();

  }

  initForm(): void {
    this.myForm = new FormGroup({
      name         : new FormControl('',      [Validators.required]),
      category_id  : new FormControl('',      [Validators.required]),
    });
  }

  getData(){
    // get subcategories
    this._SubCategoriesService.getAll()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data =>{
      this.SubCategories = data;
      console.log('data sub cat',data);
    });
  }






  handleSearch(ev:any){
    let search = ev.target.value;
  }

  toggleForm(){
    this.displayForm = !this.displayForm;
  }



  handleEdit(el:any,index:any){
    this.eventype    = EventTypes.Edit;
    this.editId      = el?.id;
    this.editIndex   = index;
    this.subCategory = el;
    this.displayForm = true;
  }

  handleDelete(id:any,index:any){
     this._SubCategoriesService.delete(id)
     .pipe(take(1))
     .subscribe(data => {
        this.SubCategories.splice(index, 1);
     })
  }

  hideForm(){
    this.toggleForm();
    this.eventype    = EventTypes.Add;
  }

  addedCat(cat:any){
    this.displayForm = false;
    this.eventype    = EventTypes.Add;
    this.SubCategories= [
      cat,
      ...this.SubCategories,
    ]
  }

  updatedCat(cat:any){
    this.displayForm                = false;
    this.eventype    = EventTypes.Add;
    this.SubCategories[this.editIndex] = cat;
  }







}

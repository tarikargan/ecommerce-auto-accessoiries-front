import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { CategoriesService } from 'src/app/core/services/production-module/categories/categories.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  environment                       :any                 = environment;
  eventype                          :any                 = EventTypes.Add;

  categories                        :any                 = [];
  category                          :any;
  editIndex                         :any;


  displayForm                       :boolean = false;



  loading                           :boolean   = false;

  constructor(
    private _CategoriesService        : CategoriesService
  ) {
  }

  ngOnInit(): void {

    // this.initForm();

    this.getData();

  }



  getData(){
    this._CategoriesService.getAll()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data =>{
      this.categories = data;
      console.log('data',data);
    })
  }






  handleEdit(el:any,index:any){
    this.eventype      = EventTypes.Edit;
    this.category      = el;
    this.editIndex     = index;
    this.displayForm   = true;
  }

  handleDelete(id:any,index:any){
     this._CategoriesService.delete(id)
     .pipe(take(1))
     .subscribe(data => {
        this.categories.splice(index, 1);
     })
  }





  handleSearch(ev:any){
    let search = ev.target.value;
  }

  toggleForm(){
    this.eventype   = EventTypes.Add;
    this.displayForm = true;
  }

  hideForm(){
    this.displayForm = false;
  }

  addedCat(cat:any){
    this.displayForm = false;
    this.categories = [
      cat,
      ...this.categories,
    ]
  }

  updatedCat(cat:any){
    this.displayForm                = false;
    this.categories[this.editIndex] = cat;
  }



  handleChangeStatus(event:any, id:any){
    let data = {
      status : event?.target.checked
    }
    event.target.classList.add('pointer-events-none', 'animate-pulse');


    this._CategoriesService.toggleSatus(id,data)
    .subscribe((res)=>{
      console.log({res});

      if(res?.success == true){
        event.target.classList.remove('pointer-events-none', 'animate-pulse');
      }else{
        console.log('something was worning');

      }
    })

  }





}

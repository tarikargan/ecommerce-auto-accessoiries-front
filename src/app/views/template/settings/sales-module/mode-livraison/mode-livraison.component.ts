import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { CategoriesService } from 'src/app/core/services/production-module/categories/categories.service';
import { ModeLivraisonsService } from 'src/app/core/services/sales-module/mode-livraison/modeLivraison.service';


@Component({
  selector: 'app-mode-livraison',
  templateUrl: './mode-livraison.component.html',
  styleUrls: ['./mode-livraison.component.scss']
})
export class ModeLivraisonComponent {
  eventype                          :any                 = EventTypes.Add;

  categories                        :any                 = [];
  editId                            :any;
  editIndex                         :any;
  myForm!                           :FormGroup;


  loading                           :boolean   = false;

  constructor(
    private _ModeLivraisonsService       : ModeLivraisonsService
  ) {
  }

  ngOnInit(): void {

    this.initForm();

    this.getData();

  }

  initForm(): void {
    this.myForm = new FormGroup({
      title  : new FormControl('',      [Validators.required]),
    });
  }

  getData(){
    this._ModeLivraisonsService.getAll()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data =>{
      this.categories = data;
      console.log('data',data);
    })
  }



  get form(){
    return this.myForm;
  }

  async save(){

    if(this.myForm.valid){
      this.loading = true;
      let data = this.myForm.value;

      this._ModeLivraisonsService.add(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading = false;
        this.categories = [res, ...this.categories];
        this.handleResetform();
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
      let data = this.myForm.value;
      console.log({data});
      this._ModeLivraisonsService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
          this.loading    =  false;
          this.categories.splice(this.editIndex, 1, res);
          this.handleResetform();
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }
  }



  resetForm(){
    this.myForm.reset();
  }

  closePopup(){
    this.myForm.reset();
  }



  handleEdit(el:any,index:any){
    this.eventype  = EventTypes.Edit;
    this.editId    = el?.id;
    this.editIndex = index;
    this.form.get('title')?.setValue(el.title);
  }

  handleDelete(id:any,index:any){
     this._ModeLivraisonsService.delete(id)
     .pipe(take(1))
     .subscribe(data => {
        this.categories.splice(index, 1);
     })
  }

  handleResetform(){
    this.eventype = EventTypes.Add;
    this.form.reset();
  }




}

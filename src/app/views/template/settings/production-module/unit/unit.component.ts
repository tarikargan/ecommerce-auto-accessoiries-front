import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { UnitService } from 'src/app/core/services/production-module/unit/unit.service';


@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent {
  eventype                          :any                 = EventTypes.Add;

  unites                        :any                 = [];
  editId                            :any;
  editIndex                         :any;
  myForm!                           :FormGroup;


  loading                           :boolean   = false;

  constructor(
    private _unitService      :UnitService
  ) {
  }

  ngOnInit(): void {

    this.initForm();

    this.getData();

  }

  initForm(): void {
    this.myForm = new FormGroup({
      name       : new FormControl('',      [Validators.required]),
      shortName  : new FormControl('',      [Validators.required]),
    });
  }

  getData(){
    this._unitService.getAll()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data =>{
      this.unites = data;
      console.log('data',data);
    })
  }



  get form(){
    return this.myForm;
  }

  async save(){

    if(this.myForm.valid){
      this.loading = true;
      let data     = this.myForm.value;

      this._unitService.add(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading    = false;
        this.unites = [res, ...this.unites];
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
      let data     = this.myForm.value;
      console.log({data});
      this._unitService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
          this.loading    =  false;
          this.unites.splice(this.editIndex, 1, res);
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
    this.form.get('name')?.setValue(el.name);
    this.form.get('shortName')?.setValue(el.shortName);
  }

  handleDelete(id:any,index:any){
     this._unitService.delete(id)
     .pipe(take(1))
     .subscribe(data => {
        this.unites.splice(index, 1);
     })
  }

  handleResetform(){
    this.eventype = EventTypes.Add;
    this.form.reset();
  }




}

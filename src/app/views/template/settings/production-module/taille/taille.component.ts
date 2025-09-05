import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { tailleService } from 'src/app/core/services/production-module/tailles/taille.service';


@Component({
  selector: 'app-taille',
  templateUrl: './taille.component.html',
  styleUrls: ['./taille.component.scss']
})
export class TailleComponent {
  eventype                          :any                 = EventTypes.Add;

  tailles                           :any                 = [];
  editId                            :any;
  editIndex                         :any;
  myForm!                           :FormGroup;

  attribute                         :any;


  loading                           :boolean   = false;
  displayForm                       :boolean   = false;

  groupedByVariant                  :any;

  variants                          :any;
  openTable                         :any = null;

  constructor(
    private _tailleService      :tailleService
  ) {
  }

  ngOnInit(): void {

    this.initForm();

    this.getData();

  }

  initForm(): void {
    this.myForm = new FormGroup({
      name       : new FormControl('',      [Validators.required]),
    });
  }

  getData(){
    this._tailleService.getAll()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data =>{
      this.tailles = data;
      console.log('data',data);


      this.mapData();
    })
  }


  mapData(){
    const groupedByVariant = this.tailles.reduce((acc:any, size:any) => {
      if (!acc[size.variant]) {
        acc[size.variant] = [];
      }
      acc[size.variant].push(size);
      return acc;
    }, {});

    // Get array of variant keys
    const variantKeys = Object.keys(groupedByVariant);

    this.variants         = variantKeys;
    this.groupedByVariant = groupedByVariant;

    console.log(groupedByVariant, variantKeys);
  }

  displayTable(i:any){
    this.openTable = this.openTable == i ? null : i;
  }



  get form(){
    return this.myForm;
  }

  async save(){

    if(this.myForm.valid){
      this.loading = true;
      let data     = this.myForm.value;

      this._tailleService.add(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading    = false;
        this.tailles = [res, ...this.tailles];
        this.handleResetform();

        this.mapData();
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
      this._tailleService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
          this.loading    =  false;
          this.tailles.splice(this.editIndex, 1, res);
          this.handleResetform();
          this.mapData();
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

  addAttribute(){
    this.eventype    = EventTypes.Add;
    this.displayForm = true;
  }

  handleResetform(){
    this.eventype = EventTypes.Add;
    this.form.reset();
  }


  editStock(item:any, i:any){
    this.attribute   = item;
    this.editIndex   = item.id;
    this.eventype    = EventTypes.Edit;
    this.displayForm = true;
  }

  deleteStock(id:any){
    this._tailleService.delete(id)
     .pipe(take(1))
     .subscribe(data => {
        this.tailles = this.tailles.filter((el:any) => el?.id != id);
        this.mapData();
     }, err => {
        console.log(err);
     })
  }



  hideForm(){
    this.displayForm = false;
  }


  addedAtt(data:any){
    this.tailles = [data, ...this.tailles];
    this.mapData();
    this.hideForm();
  }


  updatedAtt(data:any){
    this.tailles[this.editIndex] = data;
    this.tailles = this.tailles.map((el:any) => {
      if(this.editIndex == el.id){
        return data;
      }else return el
    })
    this.eventype = EventTypes.Add;
    this.mapData();
    this.hideForm();

  }





}


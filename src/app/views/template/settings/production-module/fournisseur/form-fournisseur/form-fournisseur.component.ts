import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { Observable } from 'rxjs';
import { FournisseurService } from 'src/app/core/services/production-module/fournisseur/fournisseur.service';
@Component({
  selector: 'app-form-fournisseur',
  templateUrl: './form-fournisseur.component.html',
  styleUrls: ['./form-fournisseur.component.scss']
})
export class FormFournisseurComponent {
  @Input()    fournisseur            :any;
  @Input()    eventype             :any                  = EventTypes.Add;

  @Output()   addedFournisseur       :EventEmitter<any>    = new EventEmitter();
  @Output()   closeForm            :EventEmitter<any>    = new EventEmitter();
  @Output()   updatedFournisseur     :EventEmitter<any>    = new EventEmitter();


  languages                         :string[]             = [];
  editId                            :any;
  lang                              :any                  = 'fr';
  fournisseurForm!                    :FormGroup;
  messge                            :any;

  url                               :any;
  file                              :any[]                = [];
  existingFiles                     :any;


  loading                          :boolean   = false;

  constructor(
    private _FournisseurService        :FournisseurService
  ) {
  }

  ngOnInit(): void {

    this.initForm();

    this.handleEvent();

  }

  initForm(): void {
    this.fournisseurForm = new FormGroup({
      title       : new FormControl('',      [Validators.required]),
      locale      : new FormControl('',      [Validators.required]),
      contact     : new FormControl('',      [Validators.required]),
      category    : new FormControl('',      [Validators.required])
    });
  }


  handleEvent(){
      if(this.eventype == EventTypes.Edit){
        this.editId   = this.fournisseur?.id;
        this.fournisseurForm?.get('title')?.setValue(this.fournisseur?.title);
        this.fournisseurForm?.get('locale')?.setValue(this.fournisseur?.locale);
        this.fournisseurForm?.get('contact')?.setValue(this.fournisseur?.contact);
        this.fournisseurForm?.get('category')?.setValue(this.fournisseur?.category);

      }
  }

  get form(){
    return this.fournisseurForm;
  }

  async save(){

    if(this.fournisseurForm.valid){
      this.loading = true;
      let data = this.fournisseurForm.value;

      this._FournisseurService.create(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading = false;
          this.addedFournisseur.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }else{
      this.fournisseurForm.markAllAsTouched();
    }
  }

  async update(){
    if(this.fournisseurForm.valid){
      this.loading = true;
      let data = this.fournisseurForm.value;
      this._FournisseurService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
          this.loading = false;
          this.updatedFournisseur.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }
  }



  resetForm(){
    this.fournisseurForm.reset();
  }

  closePopup(){
    this.closeForm.emit();
    this.fournisseurForm.reset();
  }




}

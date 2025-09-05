import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { Observable } from 'rxjs';
import { SaisonService } from 'src/app/core/services/production-module/saison/saison.service';
@Component({
  selector: 'app-saison-form',
  templateUrl: './saison-form.component.html',
  styleUrls: ['./saison-form.component.scss']
})
export class SaisonFormComponent {
  @Input()    saison                :any;
  @Input()    eventype              :any                  = EventTypes.Add;

  @Output()   addedSaison           :EventEmitter<any>    = new EventEmitter();
  @Output()   closeForm             :EventEmitter<any>    = new EventEmitter();
  @Output()   updatedSaison         :EventEmitter<any>    = new EventEmitter();


  languages                         :string[]             = [];
  editId                            :any;
  lang                              :any                  = 'fr';
  SaisonForm!                       :FormGroup;
  messge                            :any;

  url                               :any;
  file                              :any[]                = [];
  existingFiles                     :any;
  SVGArCircleIcon!                  :HTMLElement | any;
  SVGFrCircleIcon!                  :HTMLElement | any;
  SVGEnCircleIcon!                  :HTMLElement | any;


  loading                           :boolean   = false;

  constructor(
    private _SaisonService        :SaisonService
  ) {
  }

  ngOnInit(): void {
    this.initForm();

    this.handleEvent();

  }

  initForm(): void {
    this.SaisonForm = new FormGroup({
      title       : new FormControl('',      [Validators.required]),
      start_date  : new FormControl('',      [Validators.required]),
      end_date    : new FormControl('',      [Validators.required])
    });
  }



  handleEvent(){
      if(this.eventype == EventTypes.Edit){
        this.editId   = this.saison?.id;
        this.SaisonForm?.get('title')?.setValue(this.saison?.title);
        this.SaisonForm?.get('start_date')?.setValue(this.saison?.start_date);
        this.SaisonForm?.get('end_date')?.setValue(this.saison?.end_date);
      }
  }

  get form(){
    return this.SaisonForm;
  }

  async save(){

    if(this.SaisonForm.valid){
      this.loading = true;
      let data = this.SaisonForm.value;

      this._SaisonService.create(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading = false;
          this.addedSaison.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }else{
      this.SaisonForm.markAllAsTouched();
    }
  }

  async update(){
    if(this.SaisonForm.valid){
      this.loading = true;
      let data = this.SaisonForm.value;
      this._SaisonService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
          this.loading = false;
          this.updatedSaison.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }
  }



  resetForm(){
    this.SaisonForm.reset();
  }

  closePopup(){
    this.closeForm.emit();
    this.SaisonForm.reset();
  }

}

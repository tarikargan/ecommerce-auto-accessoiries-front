import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { Observable } from 'rxjs';
import { MatierePremiereService } from 'src/app/core/services/production-module/matiere-premiere/matierePremiere.service';


@Component({
  selector: 'app-form-matierepremiere',
  templateUrl: './form-matierepremiere.component.html',
  styleUrls: ['./form-matierepremiere.component.scss']
})
export class FormMatierepremiereComponent {
  @Input()    matierePremiere       :any;
  @Input()    eventype              :any                  = EventTypes.Add;

  @Output()   addedFournisseur      :EventEmitter<any>    = new EventEmitter();
  @Output()   closeForm             :EventEmitter<any>    = new EventEmitter();
  @Output()   updatedFournisseur    :EventEmitter<any>    = new EventEmitter();



  fournisseurs                      :any                  = [];
  unites                            :any                  = [];

  editId                            :any;

  matierePremiereForm!              :FormGroup;
  messge                            :any;

  url                               :any;
  file                              :any[]                = [];
  existingFiles                     :any;


  loading                           :boolean              = false;

  constructor(
    private _MatierePremiereService        :MatierePremiereService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.handleEvent();
    this.getData();
  }

  initForm(): void {
    this.matierePremiereForm = new FormGroup({
      title              : new FormControl('',      [Validators.required]),
      description        : new FormControl('',      []),
      quantity           : new FormControl('',      [Validators.required]),
      used_quantity      : new FormControl('',      []),
      price              : new FormControl('',      [Validators.required]),
      fournisseur_id     : new FormControl('',      [Validators.required]),
      unit_id            : new FormControl('',      [Validators.required])
    });
  }


  getData(){
    this._MatierePremiereService.create()
    .pipe(take(1))
    .subscribe(data =>{
      console.log('data',data);

      this.fournisseurs = data?.fournisseurs;
      this.unites       = data?.unites;
    })
  }


  handleEvent(){
      if(this.eventype == EventTypes.Edit){
        this.editId   = this.matierePremiere?.id;
        this.matierePremiereForm?.get('title')?.setValue(this.matierePremiere?.title);
        this.matierePremiereForm?.get('description')?.setValue(this.matierePremiere?.description);
        this.matierePremiereForm?.get('quantity')?.setValue(this.matierePremiere?.quantity);
        this.matierePremiereForm?.get('used_quantity')?.setValue(this.matierePremiere?.used_quantity);
        this.matierePremiereForm?.get('price')?.setValue(this.matierePremiere?.price);
        this.matierePremiereForm?.get('fournisseur_id')?.setValue(this.matierePremiere?.fournisseur?.id);
        this.matierePremiereForm?.get('unit_id')?.setValue(this.matierePremiere?.unit?.id);
      }
  }

  get form(){
    return this.matierePremiereForm;
  }

  async save(){
    if(this.matierePremiereForm.valid){
      this.loading = true;
      let data = this.matierePremiereForm.value;
      console.log('saving data ::::> ',data);

      this._MatierePremiereService.add(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading = false;
        console.log(res);
          this.addedFournisseur.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }else{
      this.matierePremiereForm.markAllAsTouched();
    }
  }

  async update(){
    if(this.matierePremiereForm.valid){
      this.loading = true;
      let data = this.matierePremiereForm.value;
      this._MatierePremiereService.update(this.editId, data)
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
    this.matierePremiereForm.reset();
  }

  closePopup(){
    this.closeForm.emit();
    this.matierePremiereForm.reset();
  }





}

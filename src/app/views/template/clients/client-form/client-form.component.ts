import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { ClientsService } from 'src/app/core/services/sales-module/clients/clients.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {

  @Input()    client                :any;
  @Input()    eventype              :any                  = EventTypes.Add;

  @Output()   addedClient           :EventEmitter<any>    = new EventEmitter();
  @Output()   closeForm             :EventEmitter<any>    = new EventEmitter();
  @Output()   updatedClient         :EventEmitter<any>    = new EventEmitter();




  editId                            :any;

  clientForm!                       :FormGroup;
  messge                            :any;

  url                               :any;
  file                              :any[]                = [];
  existingFiles                     :any;


  loading                           :boolean              = false;

  constructor(
    private _ClientsService         :ClientsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.handleEvent();
    // this.getData();
  }

  initForm(): void {

    this.clientForm = new FormGroup({
      nom                     : new FormControl('',    [Validators.required]),
      prenom                  : new FormControl('',    [Validators.required]),
      address                 : new FormControl('',    []),
      ville                   : new FormControl('',    []),
      tele                    : new FormControl('',    [Validators.required]),
      whatsapp                : new FormControl('',    []),
      note                    : new FormControl('',    [Validators.required]),
      taille                  : new FormControl('',    [Validators.required]),
      liste_rouge             : new FormControl(false, [Validators.required])
    });

  }

  handleEvent(){
      if(this.eventype == EventTypes.Edit){
        this.editId    = this.client?.id;
        this.clientForm?.get('nom')?.setValue(this.client?.nom);
        this.clientForm?.get('prenom')?.setValue(this.client?.prenom);
        this.clientForm?.get('address')?.setValue(this.client?.address);
        this.clientForm?.get('ville')?.setValue(this.client?.ville);
        this.clientForm?.get('tele')?.setValue(this.client?.tele);
        this.clientForm?.get('whatsapp')?.setValue(this.client?.whatsapp);
        this.clientForm?.get('note')?.setValue(this.client?.note);
        this.clientForm?.get('taille')?.setValue(this.client?.taille);
        this.clientForm?.get('liste_rouge')?.setValue(this.client?.liste_rouge);
      }
  }

  get form(){
    return this.clientForm;
  }

  async save(){
    if(this.clientForm.valid){
      this.loading = true;
      let data = this.clientForm.value;
      console.log('saving data ::::> ',data);

      this._ClientsService.create(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading = false;
        console.log(res);
          this.addedClient.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }else{
      this.clientForm.markAllAsTouched();
    }
  }

  async update(){
    if(this.clientForm.valid){
      this.loading = true;
      let data = this.clientForm.value;
      this._ClientsService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
          this.loading = false;
          this.updatedClient.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }
  }



  resetForm(){
    this.clientForm.reset();
  }

  closePopup(){
    this.closeForm.emit();
    this.clientForm.reset();
  }




}

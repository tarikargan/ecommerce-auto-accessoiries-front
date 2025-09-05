import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, take } from 'rxjs';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { tailleService } from 'src/app/core/services/production-module/tailles/taille.service';
import { variants } from 'src/app/core/services/variantes';

@Component({
  selector: 'app-variant-form',
  templateUrl: './variant-form.component.html',
  styleUrls: ['./variant-form.component.scss']
})
export class VariantFormComponent {
  @Input() attribute                : any;
  @Input() eventype                 : any                = EventTypes.Add;
  myForm!                           : FormGroup;

  loading                           : boolean            = false;

  @Output() hideForm                : EventEmitter<any>  = new EventEmitter();
  @Output() addedAtt                : EventEmitter<any>  = new EventEmitter();
  @Output() updatedAtt              : EventEmitter<any>  = new EventEmitter();


  variants                          : any                = [];

  constructor(
    private _tailleService      :tailleService
  ) {

  }

    ngOnInit(): void {
      this.variants = variants;

      // console.log('this.var', this.variants);


      this.initForm();
      this.handleEvent();

    }

    initForm(): void {
      this.myForm = new FormGroup({
        name     : new FormControl('',      [Validators.required]),
        variant  : new FormControl('',      [Validators.required]),
      });
    }


    handleEvent(){
      console.log('this.attribute::>', this.attribute);

      if(this.eventype == EventTypes.Edit || this.eventype == EventTypes.Duplicate){
        this.myForm.get('name')?.setValue(this.attribute?.name);
        this.myForm.get('variant')?.setValue(this.attribute?.variant);
      }
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
          this.addedAtt.emit(res);
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
        // console.log({data});
        this._tailleService.update(this.attribute?.id, data)
        .pipe(take(1),map(res => res?.data))
        .subscribe((res:any)=>{
            this.loading    =  false;
            this.updatedAtt.emit(res);
        },
        error =>{
          this.loading = false;
          console.error(error);
        })
      }
    }


    cancel(){
      this.hideForm.emit();
    }


}

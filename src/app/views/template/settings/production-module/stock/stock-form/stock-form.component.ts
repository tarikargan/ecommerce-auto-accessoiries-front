import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { StockService } from 'src/app/core/services/production-module/stock/stock.service';
@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent {
  @Input()    stock            :any;
  @Input()    eventype             :any                  = EventTypes.Add;

  @Output()   addedStock       :EventEmitter<any>    = new EventEmitter();
  @Output()   closeForm        :EventEmitter<any>    = new EventEmitter();
  @Output()   updatedStock     :EventEmitter<any>    = new EventEmitter();


  languages                         :string[]             = [];
  editId                            :any;
  lang                              :any                  = 'fr';
  StockForm!                        :FormGroup;
  messge                            :any;

  url                               :any;
  file                              :any[]                = [];
  existingFiles                     :any;
  SVGArCircleIcon!                  :HTMLElement | any;
  SVGFrCircleIcon!                  :HTMLElement | any;
  SVGEnCircleIcon!                  :HTMLElement | any;


  loading                          :boolean   = false;

  constructor(
    private _StockService        :StockService
  ) {
  }

  ngOnInit(): void {

    this.initForm();

    this.handleEvent();

  }

  initForm(): void {
    this.StockForm = new FormGroup({
      name     : new FormControl('',      [Validators.required]),
      address  : new FormControl('',      [Validators.required]),
    });
  }



  handleEvent(){
      if(this.eventype == EventTypes.Edit){
        this.editId   = this.stock?.id;
        this.StockForm?.get('name')?.setValue(this.stock?.name);
        this.StockForm?.get('address')?.setValue(this.stock?.address);
      }
  }

  get form(){
    return this.StockForm;
  }

  async save(){

    if(this.StockForm.valid){
      this.loading = true;
      let data = this.StockForm.value;

      this._StockService.create(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading = false;
          this.addedStock.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }else{
      this.StockForm.markAllAsTouched();
    }
  }

  async update(){
    if(this.StockForm.valid){
      this.loading = true;
      let data = this.StockForm.value;
      this._StockService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
          this.loading = false;
          this.updatedStock.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }
  }



  resetForm(){
    this.StockForm.reset();
  }

  closePopup(){
    this.closeForm.emit();
    this.StockForm.reset();
  }

}
